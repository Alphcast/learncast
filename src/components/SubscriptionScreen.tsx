import { useState, useCallback } from 'react'

const MONTHLY_PRICE = 2000
const YEARLY_PRICE = 20000
const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || ''

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

function generateRef(): string {
  return `LCH-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`
}

type PaymentStep = 'plans' | 'method' | 'transfer' | 'transfer-pending' | 'transfer-verified'

function VisaLogo() {
  return (
    <svg width="40" height="28" viewBox="0 0 40 28" fill="none">
      <rect width="40" height="28" rx="4" fill="#1A1F71"/>
      <text x="20" y="19" textAnchor="middle" fill="white" fontSize="14" fontWeight="800" fontFamily="Arial, sans-serif">VISA</text>
    </svg>
  )
}

function MastercardLogo() {
  return (
    <svg width="40" height="28" viewBox="0 0 40 28" fill="none">
      <rect width="40" height="28" rx="4" fill="#F3F3F3"/>
      <circle cx="15" cy="14" r="7" fill="#EB001B"/>
      <circle cx="25" cy="14" r="7" fill="#F79E1B" fillOpacity="0.85"/>
      <text x="20" y="26" textAnchor="middle" fill="#333" fontSize="6" fontWeight="700" fontFamily="Arial, sans-serif">mastercard</text>
    </svg>
  )
}

function VerveLogo() {
  return (
    <svg width="40" height="28" viewBox="0 0 40 28" fill="none">
      <rect width="40" height="28" rx="4" fill="#E31E24"/>
      <text x="20" y="17" textAnchor="middle" fill="white" fontSize="11" fontWeight="800" fontFamily="Arial, sans-serif">Verve</text>
      <text x="20" y="24" textAnchor="middle" fill="white" fontSize="5" fontWeight="600" fontFamily="Arial, sans-serif">INTERNATIONAL</text>
    </svg>
  )
}

function BankBuildingIcon() {
  return (
    <svg width="40" height="28" viewBox="0 0 40 28" fill="none">
      <rect width="40" height="28" rx="4" fill="#1565C0"/>
      <rect x="8" y="17" width="24" height="4" rx="1" fill="white"/>
      <rect x="12" y="9" width="4" height="6" rx="1" fill="white"/>
      <rect x="18" y="9" width="4" height="6" rx="1" fill="white"/>
      <rect x="24" y="9" width="4" height="6" rx="1" fill="white"/>
      <rect x="7" y="14" width="26" height="2" rx="1" fill="white"/>
    </svg>
  )
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
  const [step, setStep] = useState<PaymentStep>('plans')
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly' | null>(null)

  const userEmail = (() => {
    try {
      return localStorage.getItem('lch_user') || 'user@learncast.com'
    } catch {
      return 'user@learncast.com'
    }
  })()

  const handlePayment = useCallback((plan: 'monthly' | 'yearly') => {
    setError('')
    setPaying(plan)

    const amount = plan === 'monthly' ? MONTHLY_PRICE : YEARLY_PRICE
    const ref = generateRef()

    if (PAYSTACK_PUBLIC_KEY) {
      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: userEmail,
        amount: amount * 100,
        currency: 'NGN',
        ref,
        onSuccess: () => {
          setPaying(null)
          setStep('plans')
          setSelectedPlan(null)
          onSubscribe(plan)
        },
        onCancel: () => {
          setPaying(null)
          setStep('method')
        },
      })
      handler.openIframe()
    } else {
      setTimeout(() => {
        setPaying(null)
        setStep('plans')
        setSelectedPlan(null)
        onSubscribe(plan)
      }, 1500)
    }
  }, [userEmail, onSubscribe])

  const handleBankTransfer = useCallback(() => {
    setStep('transfer-pending')
    setTimeout(() => {
      setStep('transfer-verified')
    }, 3000)
  }, [])

  const handleTransferVerified = useCallback(() => {
    if (selectedPlan) {
      onSubscribe(selectedPlan)
      setStep('plans')
      setSelectedPlan(null)
    }
  }, [selectedPlan, onSubscribe])

  const planAmount = selectedPlan === 'monthly' ? MONTHLY_PRICE : selectedPlan === 'yearly' ? YEARLY_PRICE : 0

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

        {!isSubscribed && step === 'plans' && (
          <>
            <div className="grid gap-4 mb-6">
              <div
                onClick={() => { setSelectedPlan('monthly'); setStep('method') }}
                className="rounded-[14px] p-5 cursor-pointer transition-all duration-200 border-2 bg-white dark:bg-[#1E293B] hover:border-[#1565C0] dark:hover:border-[#42A5F5] hover:shadow-[0_4px_20px_rgba(21,101,192,0.14)] relative overflow-hidden"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-nunito text-[1.1rem] font-800 text-[#1E293B] dark:text-[#F1F5F9]">Monthly Plan</h3>
                    <p className="text-[.78rem] text-[#94A3B8]">Billed every month</p>
                  </div>
                  <div className="text-right">
                    <div className="font-nunito text-[1.4rem] font-900 text-[#1565C0] dark:text-[#42A5F5]">₦{MONTHLY_PRICE.toLocaleString()}</div>
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
                onClick={() => { setSelectedPlan('yearly'); setStep('method') }}
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
                    <div className="font-nunito text-[1.4rem] font-900 text-[#1565C0] dark:text-[#42A5F5]">₦{YEARLY_PRICE.toLocaleString()}</div>
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

            {!PAYSTACK_PUBLIC_KEY && (
              <p className="text-center text-[.75rem] text-[#94A3B8] mb-4 italic">
                (Paystack key not configured — payment will be simulated)
              </p>
            )}
          </>
        )}

        {!isSubscribed && step === 'method' && selectedPlan && (
          <div className="animate-fadeIn mb-6">
            <div className="flex items-center gap-3 mb-5">
              <button
                onClick={() => { setStep('plans'); setSelectedPlan(null) }}
                className="bg-transparent border-none text-[#1565C0] dark:text-[#42A5F5] text-[.9rem] font-700 cursor-pointer hover:underline flex items-center gap-1"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back
              </button>
              <div className="h-[1px] flex-1 bg-[#DDE4F0] dark:bg-[#334155]" />
            </div>

            <div className="text-center mb-5">
              <h2 className="font-nunito text-[1.2rem] font-800 text-[#1E293B] dark:text-[#F1F5F9]">Choose Payment Method</h2>
              <p className="text-[.82rem] text-[#94A3B8] mt-1">
                Pay <span className="font-700 text-[#1565C0] dark:text-[#42A5F5]">₦{planAmount.toLocaleString()}</span> for the <span className="font-600 capitalize">{selectedPlan}</span> plan
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handlePayment(selectedPlan)}
                disabled={paying !== null}
                className="w-full rounded-[12px] p-4 cursor-pointer transition-all duration-200 border-2 border-[#DDE4F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] hover:border-[#1565C0] dark:hover:border-[#42A5F5] hover:shadow-[0_4px_20px_rgba(21,101,192,0.14)] disabled:opacity-60 disabled:cursor-not-allowed text-left"
              >
                {paying ? (
                  <div className="flex items-center justify-center py-2">
                    <div className="w-6 h-6 border-3 border-[#1565C0] border-t-transparent rounded-full animate-spin" />
                    <span className="ml-3 text-[.9rem] text-[#475569] dark:text-[#94A3B8] font-600">Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <VisaLogo />
                      <MastercardLogo />
                      <VerveLogo />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-nunito text-[.95rem] font-700 text-[#1E293B] dark:text-[#F1F5F9]">Pay with Card</div>
                      <div className="text-[.75rem] text-[#94A3B8]">Visa, Mastercard, Verve</div>
                    </div>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1565C0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </div>
                )}
              </button>

              <button
                onClick={() => setStep('transfer')}
                disabled={paying !== null}
                className="w-full rounded-[12px] p-4 cursor-pointer transition-all duration-200 border-2 border-[#DDE4F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] hover:border-[#1565C0] dark:hover:border-[#42A5F5] hover:shadow-[0_4px_20px_rgba(21,101,192,0.14)] disabled:opacity-60 disabled:cursor-not-allowed text-left"
              >
                <div className="flex items-center gap-4">
                  <BankBuildingIcon />
                  <div className="flex-1 min-w-0">
                    <div className="font-nunito text-[.95rem] font-700 text-[#1E293B] dark:text-[#F1F5F9]">Bank Transfer</div>
                    <div className="text-[.75rem] text-[#94A3B8]">Pay via bank deposit</div>
                  </div>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1565C0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        )}

        {!isSubscribed && step === 'transfer' && selectedPlan && (
          <div className="animate-fadeIn mb-6">
            <div className="flex items-center gap-3 mb-5">
              <button
                onClick={() => setStep('method')}
                className="bg-transparent border-none text-[#1565C0] dark:text-[#42A5F5] text-[.9rem] font-700 cursor-pointer hover:underline flex items-center gap-1"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back
              </button>
              <div className="h-[1px] flex-1 bg-[#DDE4F0] dark:bg-[#334155]" />
            </div>

            <div className="text-center mb-5">
              <h2 className="font-nunito text-[1.2rem] font-800 text-[#1E293B] dark:text-[#F1F5F9]">Bank Transfer</h2>
              <p className="text-[.82rem] text-[#94A3B8] mt-1">
                Transfer the exact amount to the account below
              </p>
            </div>

            <div className="rounded-[14px] p-5 bg-white dark:bg-[#1E293B] border-2 border-[#DDE4F0] dark:border-[#334155] mb-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-[#DDE4F0] dark:border-[#334155]">
                  <span className="text-[.82rem] text-[#94A3B8]">Amount</span>
                  <span className="font-nunito text-[1.3rem] font-900 text-[#1565C0] dark:text-[#42A5F5]">₦{planAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[.82rem] text-[#94A3B8]">Bank</span>
                  <span className="text-[.9rem] font-600 text-[#1E293B] dark:text-[#F1F5F9]">First Bank of Nigeria</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[.82rem] text-[#94A3B8]">Account Number</span>
                  <span className="font-nunito text-[1.1rem] font-800 text-[#1E293B] dark:text-[#F1F5F9] tracking-widest">1234567890</span>
                </div>
                <div className="flex justify-between items-center pb-0">
                  <span className="text-[.82rem] text-[#94A3B8]">Account Name</span>
                  <span className="text-[.9rem] font-600 text-[#1E293B] dark:text-[#F1F5F9]">LearnCast Hub Ltd</span>
                </div>
              </div>
            </div>

            <div className="rounded-[12px] p-4 bg-[#FFF8E1] dark:bg-[#3E3520] border-[1.5px] border-[#F9A825] mb-5">
              <div className="flex items-start gap-2.5">
                <span className="text-[1rem] flex-shrink-0 mt-0.5">📌</span>
                <div className="text-[.78rem] text-[#5D4E37] dark:text-[#FFE082] leading-[1.6]">
                  After payment, click the button below to complete your subscription. Your account will be activated once your payment is confirmed.
                </div>
              </div>
            </div>

            <button
              onClick={handleBankTransfer}
              className="w-full bg-gradient-to-r from-[#1565C0] to-[#1976D2] hover:from-[#1976D2] hover:to-[#1565C0] text-white border-none rounded-[10px] px-8 py-3.5 font-nunito text-[.95rem] font-800 cursor-pointer transition-all duration-200 shadow-[0_4px_15px_rgba(21,101,192,0.3)] hover:shadow-[0_6px_20px_rgba(21,101,192,0.4)]"
            >
              I've Made the Transfer
            </button>

            <p className="text-center mt-3">
              <button
                onClick={() => setStep('method')}
                className="bg-transparent border-none text-[.78rem] text-[#94A3B8] underline cursor-pointer hover:text-[#475569] dark:hover:text-[#F1F5F9]"
              >
                Choose a different payment method
              </button>
            </p>
          </div>
        )}

        {!isSubscribed && step === 'transfer-pending' && (
          <div className="animate-fadeIn mb-6">
            <div className="rounded-[14px] p-8 bg-white dark:bg-[#1E293B] border-2 border-[#DDE4F0] dark:border-[#334155] text-center">
              <div className="w-[60px] h-[60px] mx-auto mb-4 bg-[#E3F2FD] dark:bg-[#1E3A5F] rounded-full flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-[#1565C0] border-t-transparent rounded-full animate-spin" />
              </div>
              <h3 className="font-nunito text-[1.1rem] font-800 text-[#1E293B] dark:text-[#F1F5F9] mb-2">Verifying Payment</h3>
              <p className="text-[.82rem] text-[#94A3B8] leading-[1.6]">
                Please wait while we confirm your bank transfer. This should only take a moment.
              </p>
            </div>
          </div>
        )}

        {!isSubscribed && step === 'transfer-verified' && (
          <div className="animate-fadeIn mb-6">
            <div className="rounded-[14px] p-8 bg-white dark:bg-[#1E293B] border-2 border-[#2E7D32] text-center">
              <div className="w-[60px] h-[60px] mx-auto mb-4 bg-[#E8F5E9] dark:bg-[#1B3A1B] rounded-full flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="12" fill="#2E7D32"/>
                  <path d="M7 12.5L10 15.5L17 8.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-nunito text-[1.1rem] font-800 text-[#2E7D32] dark:text-[#66BB6A] mb-2">Payment Confirmed!</h3>
              <p className="text-[.82rem] text-[#94A3B8] leading-[1.6] mb-5">
                Your bank transfer of <span className="font-700 text-[#1E293B] dark:text-[#F1F5F9]">₦{planAmount.toLocaleString()}</span> has been verified. Your {selectedPlan} plan is now active.
              </p>
              <button
                onClick={handleTransferVerified}
                className="bg-gradient-to-r from-[#1565C0] to-[#1976D2] hover:from-[#1976D2] hover:to-[#1565C0] text-white border-none rounded-[10px] px-8 py-3 font-nunito text-[.95rem] font-800 cursor-pointer transition-all duration-200 shadow-[0_4px_15px_rgba(21,101,192,0.3)] hover:shadow-[0_6px_20px_rgba(21,101,192,0.4)]"
              >
                Continue to Home
              </button>
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
          ) : step !== 'transfer-pending' && step !== 'transfer-verified' && (
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
