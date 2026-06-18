import { useState } from 'react'
import { api } from '../services/api'

interface AuthScreenProps {
  onAuthSuccess: () => void
}

export function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [form, setForm] = useState({ email: '', password: '', name: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      let result
      if (isLogin) {
        result = await api.login(form.email, form.password)
      } else {
        result = await api.register(form.email, form.name, form.password)
      }
      localStorage.setItem('lch_token', result.token)
      localStorage.setItem('lch_auth', 'true')
      localStorage.setItem('lch_user', result.user.name)
      onAuthSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F8FF] dark:bg-[#0F172A] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[420px] animate-fadeIn">
        {/* Logo + Branding */}
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

        {/* Tabs */}
        <div className="flex bg-[#DDE4F0] dark:bg-[#334155] rounded-[10px] p-1 mb-5">
          <button
            onClick={() => { setIsLogin(true); setError('') }}
            className={`flex-1 py-[9px] rounded-[8px] font-nunito text-[.9rem] font-700 cursor-pointer transition-all duration-200 ${isLogin ? 'bg-white dark:bg-[#1E293B] text-[#1565C0] dark:text-[#42A5F5] shadow-sm' : 'text-[#475569] dark:text-[#94A3B8] hover:text-[#1565C0]'}`}
          >
            Login
          </button>
          <button
            onClick={() => { setIsLogin(false); setError('') }}
            className={`flex-1 py-[9px] rounded-[8px] font-nunito text-[.9rem] font-700 cursor-pointer transition-all duration-200 ${!isLogin ? 'bg-white dark:bg-[#1E293B] text-[#1565C0] dark:text-[#42A5F5] shadow-sm' : 'text-[#475569] dark:text-[#94A3B8] hover:text-[#1565C0]'}`}
          >
            Sign Up
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-[#FFEBEE] dark:bg-[#3E1A1A] border-[1.5px] border-[#EF5350] text-[#C62828] dark:text-[#EF9A9A] rounded-[10px] px-4 py-[10px] text-[.82rem] mb-5 text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-[#1E293B] rounded-[14px] p-6 shadow-[0_2px_12px_rgba(21,101,192,0.10)]">
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-[.82rem] font-600 text-[#475569] dark:text-[#94A3B8] mb-1.5">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                placeholder="Enter your name"
                className="w-full rounded-[8px] px-3.5 py-2.5 text-[.88rem] border-2 border-[#DDE4F0] dark:border-[#334155] bg-[#F0F4FA] dark:bg-[#263148] text-[#1E293B] dark:text-[#F1F5F9] focus:border-[#1565C0] dark:focus:border-[#42A5F5] focus:outline-none transition-colors"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-[.82rem] font-600 text-[#475569] dark:text-[#94A3B8] mb-1.5">Email Address</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              placeholder="you@example.com"
              className="w-full rounded-[8px] px-3.5 py-2.5 text-[.88rem] border-2 border-[#DDE4F0] dark:border-[#334155] bg-[#F0F4FA] dark:bg-[#263148] text-[#1E293B] dark:text-[#F1F5F9] focus:border-[#1565C0] dark:focus:border-[#42A5F5] focus:outline-none transition-colors"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-[.82rem] font-600 text-[#475569] dark:text-[#94A3B8] mb-1.5">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              placeholder="••••••••"
              className="w-full rounded-[8px] px-3.5 py-2.5 text-[.88rem] border-2 border-[#DDE4F0] dark:border-[#334155] bg-[#F0F4FA] dark:bg-[#263148] text-[#1E293B] dark:text-[#F1F5F9] focus:border-[#1565C0] dark:focus:border-[#42A5F5] focus:outline-none transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#1565C0] to-[#1976D2] hover:from-[#1976D2] hover:to-[#1565C0] text-white rounded-[10px] py-3 font-nunito text-[.95rem] font-800 cursor-pointer transition-all duration-200 shadow-[0_4px_15px_rgba(21,101,192,0.3)] hover:shadow-[0_6px_20px_rgba(21,101,192,0.4)] disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                {isLogin ? 'Logging in...' : 'Creating account...'}
              </>
            ) : (
              isLogin ? 'Login' : 'Create Account'
            )}
          </button>

          <p className="text-center text-[.78rem] text-[#94A3B8] mt-4">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => { setIsLogin(!isLogin); setError('') }}
              className="text-[#1565C0] dark:text-[#42A5F5] font-700 bg-transparent border-none cursor-pointer hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}
