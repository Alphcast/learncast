import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') })

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import authRoutes from './routes/auth.js'
import paymentRoutes from './routes/payment.js'
import webhookRoutes from './routes/webhook.js'
import { initDb } from './db.js'

const REQUIRED_VARS = ['JWT_SECRET']
const MISSING = REQUIRED_VARS.filter(v => !process.env[v])
if (MISSING.length > 0) {
  console.error(`Missing required env vars: ${MISSING.join(', ')}`)
  process.exit(1)
}

if ((process.env.JWT_SECRET || '').length < 16) {
  console.error('JWT_SECRET must be at least 16 characters')
  process.exit(1)
}

const IS_PROD = process.env.NODE_ENV === 'production'
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || (IS_PROD ? 'https://learncasthub.com' : '*')

const app = express()
const PORT = Number(process.env.PORT) || 3001

app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: IS_PROD ? undefined : false,
}))

app.use(cors({
  origin: IS_PROD ? CLIENT_ORIGIN : '*',
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many attempts. Try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
})

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: { error: 'Too many requests. Slow down.' },
  standardHeaders: true,
  legacyHeaders: false,
})

app.use('/api/auth/login', authLimiter)
app.use('/api/auth/register', authLimiter)
app.use('/api/payment', apiLimiter)

app.use('/api/webhook', express.raw({ type: 'application/json' }), webhookRoutes)

app.use(express.json({ limit: '10kb' }))

app.use('/api/auth', authRoutes)
app.use('/api/payment', paymentRoutes)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' })
})

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ error: IS_PROD ? 'Internal server error' : err.message })
})

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`LearnCast server running on http://localhost:${PORT}`)
  })
})
