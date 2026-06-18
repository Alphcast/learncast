import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { body, validationResult } from 'express-validator'
import { dbRun, dbGet } from '../db'
import { generateToken } from '../middleware/auth'

const router = Router()

const validate = (req: any, res: any, next: any) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ error: errors.array().map(e => e.msg).join('. ') })
    return
  }
  next()
}

router.post('/register',
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  validate,
  (req, res) => {
    const { email, name, password } = req.body

    const existing = dbGet<{ id: number }>('SELECT id FROM users WHERE email = ?', [email])
    if (existing) {
      res.status(409).json({ error: 'Email already registered' })
      return
    }

    const hashed = bcrypt.hashSync(password, 10)
    const result = dbRun('INSERT INTO users (email, name, password) VALUES (?, ?, ?)', [email, name, hashed])
    const token = generateToken(result.lastInsertRowid)

    res.status(201).json({
      token,
      user: { id: result.lastInsertRowid, email, name },
    })
  }
)

router.post('/login',
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
  validate,
  (req, res) => {
    const { email, password } = req.body

    const user = dbGet<{ id: number; email: string; name: string; password: string }>(
      'SELECT id, email, name, password FROM users WHERE email = ?', [email]
    )
    if (!user) {
      res.status(401).json({ error: 'Invalid email or password' })
      return
    }

    const valid = bcrypt.compareSync(password, user.password)
    if (!valid) {
      res.status(401).json({ error: 'Invalid email or password' })
      return
    }

    const token = generateToken(user.id)
    res.json({ token, user: { id: user.id, email: user.email, name: user.name } })
  }
)

export default router
