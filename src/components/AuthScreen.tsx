import { useState } from 'react'
import { SignIn, SignUp } from '@clerk/clerk-react'

export function AuthScreen() {
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in')

  return (
    <div className="min-h-screen bg-[#F5F8FF] dark:bg-[#0F172A] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[420px] animate-fadeIn">
        <div className="text-center mb-8">
          <div className="w-[90px] h-[90px] mx-auto mb-4 rounded-full border-3 border-[#42A5F5] overflow-hidden shadow-[0_4px_20px_rgba(21,101,192,0.18)]">
            <img
              src="/learnl.png"
              alt="LEARNCAST-HUB"
              className="w-full h-full object-cover"
              onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          </div>
          <h1 className="font-nunito text-[1.6rem] font-900 text-[#1565C0] dark:text-[#42A5F5] tracking-[.02em]">
            LEARNCAST-HUB CBT
          </h1>
          <p className="text-[#475569] dark:text-[#94A3B8] text-[.82rem] mt-1">
            Practice Smart, Excel with Confidence
          </p>
        </div>

        <div className="flex bg-[#DDE4F0] dark:bg-[#334155] rounded-[10px] p-1 mb-5">
          <button
            onClick={() => setMode('sign-in')}
            className={`flex-1 py-[9px] rounded-[8px] font-nunito text-[.9rem] font-700 cursor-pointer transition-all duration-200 ${mode === 'sign-in' ? 'bg-white dark:bg-[#1E293B] text-[#1565C0] dark:text-[#42A5F5] shadow-sm' : 'text-[#475569] dark:text-[#94A3B8] hover:text-[#1565C0]'}`}
          >
            Login
          </button>
          <button
            onClick={() => setMode('sign-up')}
            className={`flex-1 py-[9px] rounded-[8px] font-nunito text-[.9rem] font-700 cursor-pointer transition-all duration-200 ${mode === 'sign-up' ? 'bg-white dark:bg-[#1E293B] text-[#1565C0] dark:text-[#42A5F5] shadow-sm' : 'text-[#475569] dark:text-[#94A3B8] hover:text-[#1565C0]'}`}
          >
            Sign Up
          </button>
        </div>

        <div className="bg-white dark:bg-[#1E293B] rounded-[14px] p-6 shadow-[0_2px_12px_rgba(21,101,192,0.10)]">
          {mode === 'sign-in' ? (
            <SignIn
              routing="virtual"
              signUpUrl="#"
              appearance={{
                elements: {
                  rootBox: 'w-full',
                  card: 'shadow-none p-0 bg-transparent',
                  headerTitle: 'hidden',
                  headerSubtitle: 'hidden',
                  socialButtonsBlockButton: 'bg-[#F0F4FA] dark:bg-[#263148] border-[1.5px] border-[#DDE4F0] dark:border-[#334155] text-[#1E293B] dark:text-[#F1F5F9] hover:bg-[#E3F2FD] dark:hover:bg-[#1E3A5F] rounded-[10px] py-[10px] text-[.88rem] font-600',
                  formButtonPrimary: 'bg-gradient-to-r from-[#1565C0] to-[#1976D2] text-white rounded-[10px] py-[10px] font-nunito text-[.95rem] font-800 shadow-[0_4px_15px_rgba(21,101,192,0.3)] hover:shadow-[0_6px_20px_rgba(21,101,192,0.4)]',
                  formFieldInput: 'rounded-[8px] px-3.5 py-2.5 text-[.88rem] border-2 border-[#DDE4F0] dark:border-[#334155] bg-[#F0F4FA] dark:bg-[#263148] text-[#1E293B] dark:text-[#F1F5F9] focus:border-[#1565C0] dark:focus:border-[#42A5F5]',
                  formFieldLabel: 'text-[.82rem] font-600 text-[#475569] dark:text-[#94A3B8] mb-1.5',
                  footerActionLink: 'text-[#1565C0] dark:text-[#42A5F5] font-700 hover:underline',
                  footerActionText: 'text-[.78rem] text-[#94A3B8]',
                  dividerLine: 'bg-[#DDE4F0] dark:bg-[#334155]',
                  dividerText: 'text-[.78rem] text-[#94A3B8]',
                  alternativeMethodsBlockButton: 'bg-[#F0F4FA] dark:bg-[#263148] border-[1.5px] border-[#DDE4F0] dark:border-[#334155] rounded-[10px] text-[.82rem] text-[#475569] dark:text-[#94A3B8]',
                  identityPreviewEditButton: 'text-[#1565C0] dark:text-[#42A5F5]',
                  formFieldError: 'text-[.72rem] text-[#EF5350]',
                  formHeaderTitle: 'hidden',
                },
              }}
            />
          ) : (
            <SignUp
              routing="virtual"
              signInUrl="#"
              appearance={{
                elements: {
                  rootBox: 'w-full',
                  card: 'shadow-none p-0 bg-transparent',
                  headerTitle: 'hidden',
                  headerSubtitle: 'hidden',
                  socialButtonsBlockButton: 'bg-[#F0F4FA] dark:bg-[#263148] border-[1.5px] border-[#DDE4F0] dark:border-[#334155] text-[#1E293B] dark:text-[#F1F5F9] hover:bg-[#E3F2FD] dark:hover:bg-[#1E3A5F] rounded-[10px] py-[10px] text-[.88rem] font-600',
                  formButtonPrimary: 'bg-gradient-to-r from-[#1565C0] to-[#1976D2] text-white rounded-[10px] py-[10px] font-nunito text-[.95rem] font-800 shadow-[0_4px_15px_rgba(21,101,192,0.3)] hover:shadow-[0_6px_20px_rgba(21,101,192,0.4)]',
                  formFieldInput: 'rounded-[8px] px-3.5 py-2.5 text-[.88rem] border-2 border-[#DDE4F0] dark:border-[#334155] bg-[#F0F4FA] dark:bg-[#263148] text-[#1E293B] dark:text-[#F1F5F9] focus:border-[#1565C0] dark:focus:border-[#42A5F5]',
                  formFieldLabel: 'text-[.82rem] font-600 text-[#475569] dark:text-[#94A3B8] mb-1.5',
                  footerActionLink: 'text-[#1565C0] dark:text-[#42A5F5] font-700 hover:underline',
                  footerActionText: 'text-[.78rem] text-[#94A3B8]',
                  dividerLine: 'bg-[#DDE4F0] dark:bg-[#334155]',
                  dividerText: 'text-[.78rem] text-[#94A3B8]',
                  alternativeMethodsBlockButton: 'bg-[#F0F4FA] dark:bg-[#263148] border-[1.5px] border-[#DDE4F0] dark:border-[#334155] rounded-[10px] text-[.82rem] text-[#475569] dark:text-[#94A3B8]',
                  identityPreviewEditButton: 'text-[#1565C0] dark:text-[#42A5F5]',
                  formFieldError: 'text-[.72rem] text-[#EF5350]',
                  formHeaderTitle: 'hidden',
                },
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
