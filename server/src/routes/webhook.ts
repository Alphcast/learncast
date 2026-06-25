import { Router } from 'express'
import crypto from 'crypto'
import Paystack from 'paystack'
import { dbRun, dbGet } from '../db'

const router = Router()

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || ''
const paystack = PAYSTACK_SECRET_KEY ? Paystack(PAYSTACK_SECRET_KEY) : null

interface PaystackEvent {
  event: string
  data: {
    reference: string
    status: string
    amount: number
    metadata?: { userId?: number; plan?: string }
  }
}

router.post('/paystack', (req, res) => {
  const signature = req.headers['x-paystack-signature'] as string
  const rawBody = req.body as Buffer

  if (!signature) {
    res.status(401).json({ error: 'Missing signature' })
    return
  }

  if (!paystack) {
    res.status(200).json({ status: 'ignored' })
    return
  }

  const hash = crypto
    .createHmac('sha512', PAYSTACK_SECRET_KEY)
    .update(rawBody)
    .digest('hex')

  const sigBuffer = Buffer.from(signature)
  const hashBuffer = Buffer.from(hash)
  if (sigBuffer.length !== hashBuffer.length || !crypto.timingSafeEqual(sigBuffer, hashBuffer)) {
    console.error('Paystack webhook: invalid signature')
    res.status(401).json({ error: 'Invalid signature' })
    return
  }

  let event: PaystackEvent
  try {
    event = JSON.parse(rawBody.toString('utf8')) as PaystackEvent
  } catch {
    res.status(400).json({ error: 'Invalid JSON' })
    return
  }

  if (event.event !== 'charge.success') {
    res.sendStatus(200)
    return
  }

  const { reference, status, amount, metadata } = event.data

  if (status !== 'success') {
    res.sendStatus(200)
    return
  }

  const tx = dbGet<{ id: number; plan: string; status: string; amount: number }>(
    'SELECT id, plan, status, amount FROM transactions WHERE reference = ?',
    [reference]
  )

  if (!tx) {
    console.error(`Webhook: transaction ${reference} not found`)
    res.sendStatus(200)
    return
  }

  if (tx.status === 'success') {
    res.sendStatus(200)
    return
  }

  const expectedAmount = tx.amount * 100
  if (amount !== expectedAmount) {
    console.error(`Webhook amount mismatch: expected ${expectedAmount}, got ${amount}`)
    dbRun("UPDATE transactions SET status = 'failed' WHERE id = ?", [tx.id])
    res.sendStatus(200)
    return
  }

  const plan = (metadata?.plan || tx.plan) as 'monthly' | 'yearly'
  const userId = metadata?.userId

  if (!userId) {
    console.error('Webhook: missing userId in metadata')
    dbRun("UPDATE transactions SET status = 'failed' WHERE id = ?", [tx.id])
    res.sendStatus(200)
    return
  }

  const expiry = new Date()
  expiry.setDate(expiry.getDate() + (plan === 'yearly' ? 365 : 30))

  dbRun("UPDATE transactions SET status = 'success' WHERE reference = ?", [reference])
  dbRun(
    'INSERT INTO subscriptions (user_id, plan, status, start_date, end_date) VALUES (?, ?, ?, datetime("now"), ?)',
    [userId, plan, 'active', expiry.toISOString()]
  )

  console.log(`Webhook: subscription activated for user ${userId}, plan ${plan}`)
  res.sendStatus(200)
})

export default router
