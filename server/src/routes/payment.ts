import { Router } from 'express'
import crypto from 'crypto'
import Paystack from 'paystack'
import { body, validationResult } from 'express-validator'
import { dbRun, dbGet } from '../db'
import { authMiddleware, type AuthRequest } from '../middleware/auth'

const router = Router()

const MONTHLY_PRICE = 2000
const YEARLY_PRICE = 20000
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || ''
const paystack = PAYSTACK_SECRET_KEY ? Paystack(PAYSTACK_SECRET_KEY) : null

function getMonthKey(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

function getActiveSubscription(userId: number): { plan: string; end_date: string } | null {
  const sub = dbGet<{ plan: string; end_date: string }>(
    "SELECT plan, end_date FROM subscriptions WHERE user_id = ? AND status = 'active' AND end_date > datetime('now') ORDER BY end_date DESC LIMIT 1",
    [userId]
  )
  return sub || null
}

function getAttempts(userId: number): number {
  const row = dbGet<{ count: number }>(
    'SELECT count FROM exam_attempts WHERE user_id = ? AND month_key = ?',
    [userId, getMonthKey()]
  )
  return row?.count || 0
}

function activateSubscription(userId: number, plan: 'monthly' | 'yearly', reference: string) {
  const expiry = new Date()
  expiry.setDate(expiry.getDate() + (plan === 'yearly' ? 365 : 30))

  dbRun("UPDATE transactions SET status = 'success' WHERE reference = ?", [reference])
  dbRun(
    'INSERT INTO subscriptions (user_id, plan, status, start_date, end_date) VALUES (?, ?, ?, datetime("now"), ?)',
    [userId, plan, 'active', expiry.toISOString()]
  )

  return getActiveSubscription(userId)
}

const validate = (req: any, res: any, next: any) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ error: errors.array().map(e => e.msg).join('. ') })
    return
  }
  next()
}

router.get('/status', authMiddleware, (req: AuthRequest, res) => {
  const sub = getActiveSubscription(req.userId!)
  const attempts = getAttempts(req.userId!)
  const FREE_TRIALS = 3

  res.json({
    subscribed: !!sub,
    plan: sub?.plan || null,
    expiry: sub?.end_date || null,
    attemptsRemaining: Math.max(0, FREE_TRIALS - attempts),
    monthKey: getMonthKey(),
  })
})

router.post('/initialize',
  authMiddleware,
  body('plan').isIn(['monthly', 'yearly']).withMessage('Plan must be monthly or yearly'),
  validate,
  async (req: AuthRequest, res) => {
    const { plan } = req.body as { plan: 'monthly' | 'yearly' }

    const amount = plan === 'monthly' ? MONTHLY_PRICE : YEARLY_PRICE
    const reference = `LCH-${Date.now()}-${crypto.randomBytes(8).toString('hex')}`
    const publicKey = process.env.VITE_PAYSTACK_PUBLIC_KEY || ''

    const user = dbGet<{ email: string }>('SELECT email FROM users WHERE id = ?', [req.userId!])

    dbRun(
      'INSERT INTO transactions (user_id, reference, amount, plan, payment_method, status) VALUES (?, ?, ?, ?, ?, ?)',
      [req.userId!, reference, amount, plan, 'card', 'pending']
    )

    if (!paystack) {
      res.json({
        accessCode: null,
        reference,
        publicKey,
        amount,
        currency: 'NGN',
        simulated: true,
      })
      return
    }

    try {
      const response = await paystack.transaction.initialize({
        email: user?.email || 'user@learncast.com',
        amount: amount * 100,
        currency: 'NGN',
        reference,
        metadata: { userId: req.userId, plan },
      })

      if (!response.status) {
        dbRun("UPDATE transactions SET status = 'failed' WHERE reference = ?", [reference])
        res.status(500).json({ error: (response as any).message || 'Failed to initialize payment with Paystack' })
        return
      }

      const data = response.data as { access_code: string; reference: string }
      dbRun('UPDATE transactions SET access_code = ? WHERE reference = ?', [data.access_code, data.reference])

      res.json({
        accessCode: data.access_code,
        reference: data.reference,
        publicKey,
        amount,
        currency: 'NGN',
        simulated: false,
      })
    } catch (err) {
      console.error('Paystack init error:', err)
      dbRun("UPDATE transactions SET status = 'failed' WHERE reference = ?", [reference])
      res.status(500).json({ error: 'Payment initialization failed' })
    }
  }
)

router.post('/verify',
  authMiddleware,
  body('reference').isString().notEmpty().withMessage('Reference is required'),
  validate,
  async (req: AuthRequest, res) => {
    const { reference } = req.body as { reference: string }

    const tx = dbGet<{ id: number; plan: string; status: string; amount: number }>(
      'SELECT id, plan, status, amount FROM transactions WHERE reference = ? AND user_id = ?',
      [reference, req.userId!]
    )

    if (!tx) {
      res.status(404).json({ error: 'Transaction not found' })
      return
    }

    if (tx.status === 'success') {
      const sub = getActiveSubscription(req.userId!)
      res.json({ status: 'success', subscription: sub })
      return
    }

    if (!paystack) {
      const sub = activateSubscription(req.userId!, tx.plan as 'monthly' | 'yearly', reference)
      res.json({ status: 'success', subscription: sub, simulated: true })
      return
    }

    try {
      const response = await paystack.transaction.verify({ reference })

      if (!response.status) {
        dbRun("UPDATE transactions SET status = 'failed' WHERE id = ?", [tx.id])
        res.json({ status: 'failed', subscription: null })
        return
      }

      const data = response.data as { status: string; amount: number; metadata?: { plan?: string } }
      const paystackAmount = data.amount
      const expectedAmount = tx.amount * 100
      if (paystackAmount !== expectedAmount) {
        console.error(`Amount mismatch: expected ${expectedAmount}, got ${paystackAmount}`)
        dbRun("UPDATE transactions SET status = 'failed' WHERE id = ?", [tx.id])
        res.status(402).json({ error: 'Amount mismatch. Transaction rejected.' })
        return
      }

      if (data.status === 'success') {
        const plan = (data.metadata?.plan || tx.plan) as 'monthly' | 'yearly'
        const sub = activateSubscription(req.userId!, plan, reference)
        res.json({ status: 'success', subscription: sub })
      } else {
        dbRun("UPDATE transactions SET status = 'failed' WHERE id = ?", [tx.id])
        res.json({ status: 'failed', subscription: null })
      }
    } catch (err) {
      console.error('Paystack verify error:', err)
      res.status(500).json({ error: 'Payment verification failed' })
    }
  }
)

router.post('/attempt',
  authMiddleware,
  validate,
  (req: AuthRequest, res) => {
    const sub = getActiveSubscription(req.userId!)
    const FREE_TRIALS = 3

    if (sub) {
      res.json({ canStart: true, attemptsRemaining: FREE_TRIALS })
      return
    }

    const monthKey = getMonthKey()
    const existing = dbGet<{ id: number; count: number }>(
      'SELECT id, count FROM exam_attempts WHERE user_id = ? AND month_key = ?',
      [req.userId!, monthKey]
    )

    if (existing) {
      if (existing.count >= FREE_TRIALS) {
        res.json({ canStart: false, attemptsRemaining: 0 })
        return
      }
      dbRun('UPDATE exam_attempts SET count = count + 1 WHERE id = ?', [existing.id])
      res.json({ canStart: true, attemptsRemaining: FREE_TRIALS - existing.count - 1 })
    } else {
      dbRun('INSERT INTO exam_attempts (user_id, month_key, count) VALUES (?, ?, 1)', [req.userId!, monthKey])
      res.json({ canStart: true, attemptsRemaining: FREE_TRIALS - 1 })
    }
  }
)

router.post('/activate-transfer',
  authMiddleware,
  body('plan').isIn(['monthly', 'yearly']).withMessage('Plan must be monthly or yearly'),
  validate,
  (req: AuthRequest, res) => {
    const { plan } = req.body as { plan: 'monthly' | 'yearly' }

    const amount = plan === 'monthly' ? MONTHLY_PRICE : YEARLY_PRICE
    const reference = `LCH-BT-${Date.now()}-${crypto.randomBytes(8).toString('hex')}`

    dbRun(
      'INSERT INTO transactions (user_id, reference, amount, plan, payment_method, status) VALUES (?, ?, ?, ?, ?, ?)',
      [req.userId!, reference, amount, plan, 'bank_transfer', 'success']
    )

    const sub = activateSubscription(req.userId!, plan, reference)
    res.json({ status: 'success', subscription: sub })
  }
)

export default router
