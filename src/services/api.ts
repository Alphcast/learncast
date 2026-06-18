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

  const res = await fetch(`${API_URL}${path}`, { ...options, headers })

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: 'Request failed' }))
    throw new Error(body.error || `HTTP ${res.status}`)
  }

  return res.json()
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

export const api = {
  register(email: string, name: string, password: string) {
    return request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, name, password }),
    })
  },

  login(email: string, password: string) {
    return request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
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

  activateTransfer(plan: 'monthly' | 'yearly') {
    return request<PaymentVerifyResponse>('/payment/activate-transfer', {
      method: 'POST',
      body: JSON.stringify({ plan }),
    })
  },

  healthCheck() {
    return request<{ status: string }>('/health')
  },
}
