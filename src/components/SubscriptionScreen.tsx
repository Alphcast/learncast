import { useState, useCallback } from 'react'
import { api } from '../services/api'

const MONTHLY_PRICE = 2000
const YEARLY_PRICE = 20000

interface SubscriptionScreenProps {
  attemptsRemaining: number
  isSubscribed: boolean
  subPlan: string | null
  subExpiry: string | null
  onSubscribe: (plan: 'monthly' | 'yearly') => void
  onDismiss: () => void
  onLogout: () => void
}

declare global {
  interface Window {
    PaystackPop: {
      setup: (config: {
        key: string
        email: string
        amount: number
        currency: string
        ref: string
        onSuccess: (transaction: { reference: string }) => void
        onCancel: () => void
      }) => { openIframe: () => void }
    }
  }
}

export function SubscriptionScreen({
  attemptsRemaining,
  isSubscribed,
  subPlan,
  subExpiry,
  onSubscribe,
  onDismiss,
  onLogout,
}: SubscriptionScreenProps) {
  const [paying, setPaying] = useState<'monthly' | 'yearly' | null>(null)
  const [error, setError] = useState('')

  const userEmail = (() => {
    try {
      return localStorage.getItem('lch_user') || 'user@learncast.com'
    } catch {
      return 'user@learncast.com'
    }
  })()

  const handlePlanClick = useCallback(async (plan: 'monthly' | 'yearly') => {
    setError('')
    setPaying(plan)

    try {
      const init = await api.initializePayment(plan)

      const handler = window.PaystackPop.setup({
        key: init.publicKey || import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || '',
        email: userEmail,
        amount: init.amount * 100,
        currency: init.currency || 'NGN',
        ref: init.reference,
        onSuccess: async () => {
          try {
            const verify = await api.verifyPayment(init.reference)
            if (verify.status === 'success') {
              setPaying(null)
              onSubscribe(plan)
            } else {
              setError('Payment verification failed. Please contact support.')
              setPaying(null)
            }
          } catch {
            setPaying(null)
            onSubscribe(plan)
          }
        },
        onCancel: () => {
          setPaying(null)
        },
      })
      handler.openIframe()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment initialization failed')
      setPaying(null)
    }
  }, [userEmail, onSubscribe])

  return (
    <div className="min-h-screen bg-[#F5F8FF] dark:bg-[#0F172A] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[480px] animate-fadeIn">
        <div className="text-center mb-7">
          <div className="w-[80px] h-[80px] mx-auto mb-4 bg-[#E3F2FD] dark:bg-[#1E3A5F] rounded-full flex items-center justify-center text-[2.2rem] shadow-[0_4px_20px_rgba(21,101,192,0.12)]">
            {isSubscribed ? '✅' : attemptsRemaining > 0 ? '📋' : '🔒'}
          </div>
          <h1 className="font-nunito text-[1.5rem] font-900 text-[#1565C0] dark:text-[#42A5F5]">
            {isSubscribed
              ? 'Subscription Active'
              : attemptsRemaining > 0
                ? `Free Trial (${attemptsRemaining} left)`
                : 'Free Trials Used Up'}
          </h1>
          <p className="text-[#475569] dark:text-[#94A3B8] text-[.85rem] mt-1.5 max-w-[360px] mx-auto leading-[1.6]">
            {isSubscribed
              ? `Your ${subPlan === 'yearly' ? 'yearly' : 'monthly'} plan is active until ${subExpiry ? new Date(subExpiry).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'}`
              : attemptsRemaining > 0
                ? `You have ${attemptsRemaining} free ${attemptsRemaining === 1 ? 'attempt' : 'attempts'} remaining this month. Subscribe for unlimited access.`
                : 'You have used all your free attempts for this month. Subscribe to continue practising.'}
          </p>
        </div>

        {error && (
          <div className="bg-[#FFEBEE] dark:bg-[#3E1A1A] border-[1.5px] border-[#EF5350] text-[#C62828] dark:text-[#EF9A9A] rounded-[10px] px-4 py-[10px] text-[.82rem] mb-5 text-center">
            {error}
          </div>
        )}

        {!isSubscribed && (
          <div className="grid gap-4 mb-6">
            <div
              onClick={() => !paying && handlePlanClick('monthly')}
              className="rounded-[14px] p-5 cursor-pointer transition-all duration-200 border-2 bg-white dark:bg-[#1E293B] hover:border-[#1565C0] dark:hover:border-[#42A5F5] hover:shadow-[0_4px_20px_rgba(21,101,192,0.14)] relative overflow-hidden"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-nunito text-[1.1rem] font-800 text-[#1E293B] dark:text-[#F1F5F9]">Monthly Plan</h3>
                  <p className="text-[.78rem] text-[#94A3B8]">Billed every month</p>
                </div>
                <div className="text-right">
                  <div className="font-nunito text-[1.4rem] font-900 text-[#1565C0] dark:text-[#42A5F5]">
                    {paying === 'monthly' ? (
                      <div className="w-6 h-6 border-3 border-[#1565C0] border-t-transparent rounded-full animate-spin mx-auto" />
                    ) : (
                      `₦${MONTHLY_PRICE.toLocaleString()}`
                    )}
                  </div>
                  <div className="text-[.72rem] text-[#94A3B8]">/month</div>
                </div>
              </div>
              <ul className="space-y-1.5 mt-3">
                {['Unlimited exam attempts', 'All exam types & subjects', 'Smart question rotation', 'Performance tracking'].map(b => (
                  <li key={b} className="text-[.82rem] text-[#475569] dark:text-[#94A3B8] flex items-center gap-2">
                    <span className="text-[#2E7D32]">✓</span> {b}
                  </li>
                ))}
              </ul>
            </div>

            <div
              onClick={() => !paying && handlePlanClick('yearly')}
              className="rounded-[14px] p-5 cursor-pointer transition-all duration-200 border-2 bg-white dark:bg-[#1E293B] hover:border-[#1565C0] dark:hover:border-[#42A5F5] hover:shadow-[0_4px_20px_rgba(21,101,192,0.14)] relative overflow-hidden"
            >
              <div className="absolute top-3 right-3 bg-[#F9A825] text-[#1E293B] text-[.7rem] font-700 px-2.5 py-[3px] rounded-[6px]">
                SAVE 17%
              </div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-nunito text-[1.1rem] font-800 text-[#1E293B] dark:text-[#F1F5F9]">Yearly Plan</h3>
                  <p className="text-[.78rem] text-[#94A3B8]">Billed once a year</p>
                </div>
                <div className="text-right">
                  <div className="font-nunito text-[1.4rem] font-900 text-[#1565C0] dark:text-[#42A5F5]">
                    {paying === 'yearly' ? (
                      <div className="w-6 h-6 border-3 border-[#1565C0] border-t-transparent rounded-full animate-spin mx-auto" />
                    ) : (
                      `₦${YEARLY_PRICE.toLocaleString()}`
                    )}
                  </div>
                  <div className="text-[.72rem] text-[#94A3B8]">/year</div>
                </div>
              </div>
              <ul className="space-y-1.5 mt-3">
                {['Everything in Monthly', '2 months free (₦4,000 saved)', 'Priority support', 'Cancel anytime'].map(b => (
                  <li key={b} className="text-[.82rem] text-[#475569] dark:text-[#94A3B8] flex items-center gap-2">
                    <span className="text-[#2E7D32]">✓</span> {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="text-center space-y-3">
          {isSubscribed ? (
            <button
              onClick={onDismiss}
              className="bg-gradient-to-r from-[#1565C0] to-[#1976D2] hover:from-[#1976D2] hover:to-[#1565C0] text-white border-none rounded-[10px] px-8 py-3 font-nunito text-[.95rem] font-800 cursor-pointer transition-all duration-200 shadow-[0_4px_15px_rgba(21,101,192,0.3)] hover:shadow-[0_6px_20px_rgba(21,101,192,0.4)]"
            >
              Continue to Home
            </button>
          ) : (
            <p className="text-[.78rem] text-[#94A3B8]">
              <button
                onClick={onLogout}
                className="bg-transparent border-none text-[#94A3B8] underline cursor-pointer hover:text-[#475569] dark:hover:text-[#F1F5F9]"
              >
                Logout
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
