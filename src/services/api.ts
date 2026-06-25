const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

function getToken(): string | null {
  return localStorage.getItem('lch_token')
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  }
  if (token) headers['Authorization'] = `Bearer ${token}`

  let res: Response
  try {
    res = await fetch(`${API_URL}${path}`, { ...options, headers })
  } catch {
    throw new Error('Failed to connect to server. Make sure the backend is running.')
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: 'Request failed' }))
    throw new Error(body.error || `HTTP ${res.status}`)
  }

  return res.json()
}

export function isBackendAvailable(): Promise<boolean> {
  return fetch(`${API_URL}/health`, { method: 'GET', signal: AbortSignal.timeout(3000) })
    .then(r => r.ok)
    .catch(() => false)
}

export interface AuthResponse {
  token: string
  user: { id: number; email: string; name: string }
}

export interface StatusResponse {
  subscribed: boolean
  plan: string | null
  expiry: string | null
  attemptsRemaining: number
  monthKey: string
}

export interface PaymentInitResponse {
  accessCode: string | null
  reference: string
  publicKey: string
  amount: number
  currency: string
  simulated: boolean
}

export interface PaymentVerifyResponse {
  status: 'success' | 'failed'
  subscription: { plan: string; end_date: string } | null
  simulated?: boolean
}

export interface AttemptResponse {
  canStart: boolean
  attemptsRemaining: number
}

const LOCAL_USERS_KEY = 'lch_local_users'

function getLocalUsers(): Record<string, { email: string; name: string; password: string }> {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || '{}')
  } catch {
    return {}
  }
}

function saveLocalUsers(users: Record<string, { email: string; name: string; password: string }>) {
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users))
}

let localUserIdCounter = 1

export const api = {
  async register(email: string, name: string, password: string): Promise<AuthResponse> {
    try {
      return await request<AuthResponse>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, name, password }),
      })
    } catch (err) {
      if ((err as Error).message.includes('Failed to connect')) {
        const users = getLocalUsers()
        if (users[email]) throw new Error('Email already registered')
        const id = localUserIdCounter++
        users[email] = { email, name, password }
        saveLocalUsers(users)
        const token = `local_${id}_${Date.now()}`
        localStorage.setItem('lch_token', token)
        return { token, user: { id, email, name } }
      }
      throw err
    }
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      return await request<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
    } catch (err) {
      if ((err as Error).message.includes('Failed to connect')) {
        const users = getLocalUsers()
        const user = users[email]
        if (!user) throw new Error('No account found. Please sign up first.')
        if (user.password !== password) throw new Error('Invalid email or password')
        const id = Number(Object.keys(users).indexOf(email) + 1)
        const token = `local_${id}_${Date.now()}`
        localStorage.setItem('lch_token', token)
        return { token, user: { id, email, name: user.name } }
      }
      throw err
    }
  },

  getStatus() {
    return request<StatusResponse>('/payment/status')
  },

  initializePayment(plan: 'monthly' | 'yearly') {
    return request<PaymentInitResponse>('/payment/initialize', {
      method: 'POST',
      body: JSON.stringify({ plan }),
    })
  },

  verifyPayment(reference: string) {
    return request<PaymentVerifyResponse>('/payment/verify', {
      method: 'POST',
      body: JSON.stringify({ reference }),
    })
  },

  recordAttempt() {
    return request<AttemptResponse>('/payment/attempt', {
      method: 'POST',
    })
  },

  healthCheck() {
    return request<{ status: string }>('/health')
  },
}
