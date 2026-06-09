import type { Question, UserAnswers, ExamType, Subject } from '../types'
import { downloadResult } from '../utils/helpers'

interface ResultScreenProps {
  examType: ExamType
  subject: Subject
  questions: Question[]
  userAnswers: UserAnswers
  correct: number
  wrong: number
  skipped: number
  pct: number
  grade: string
  emoji: string
  onRetry: () => void
  onHome: () => void
}

export function ResultScreen({
  examType,
  subject,
  questions,
  userAnswers,
  correct,
  wrong,
  skipped,
  pct,
  grade,
  emoji,
  onRetry,
  onHome,
}: ResultScreenProps) {
  const isTheory = examType === 'THEORY'
  return (
    <div id="result-screen" className="max-w-[720px] mx-auto px-4 py-6 pb-12 animate-fadeIn">
      {/* Result Hero */}
      <div className="bg-gradient-to-r from-[#1565C0] via-[#1976D2] to-[#2E7D32] rounded-[14px] px-6 py-7 text-white text-center mb-5 shadow-[0_8px_40px_rgba(21,101,192,0.18)] relative overflow-hidden before:absolute before:-top-[30px] before:-right-[30px] before:w-[120px] before:h-[120px] before:rounded-full before:bg-white/8 after:absolute after:-bottom-5 after:-left-5 after:w-20 after:h-20 after:rounded-full after:bg-white/6">
        <div className="w-[110px] h-[110px] rounded-full border-[5px] border-white/40 bg-white/15 mx-auto mb-4 flex flex-col items-center justify-center">
          <span className="font-nunito text-[2rem] font-900 leading-[1]">{correct}</span>
          <span className="text-[.78rem] opacity-80">/ {questions.length}</span>
        </div>
        <div className="font-nunito text-[1.5rem] font-900 mb-1">
          {grade}! {emoji}
        </div>
        <div className="text-[.95rem] opacity-85 mb-1">{pct}% Score</div>
        <div className="text-[.82rem] opacity-70">
          {examType} · {subject}
        </div>
      </div>

      {/* Stats */}
      {isTheory ? (
        <div className="grid grid-cols-1 gap-3 mb-5">
          <div className="bg-white dark:bg-[#1E293B] rounded-[8px] p-4 text-center shadow-[0_2px_8px_rgba(21,101,192,0.10)]">
            <strong className="block font-nunito text-[1.5rem] font-900 text-[#1565C0]">{questions.length - skipped}</strong>
            <span className="text-[.76rem] text-[#94A3B8] block mt-0.5">Answered</span>
          </div>
          <div className="bg-white dark:bg-[#1E293B] rounded-[8px] p-4 text-center shadow-[0_2px_8px_rgba(21,101,192,0.10)]">
            <strong className="block font-nunito text-[1.5rem] font-900 text-[#F9A825]">{skipped}</strong>
            <span className="text-[.76rem] text-[#94A3B8] block mt-0.5">Skipped</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 max-sm:grid-cols-2 gap-3 mb-5">
          <div className="bg-white dark:bg-[#1E293B] rounded-[8px] p-4 text-center shadow-[0_2px_8px_rgba(21,101,192,0.10)]">
            <strong className="block font-nunito text-[1.5rem] font-900 text-[#2E7D32]">{correct}</strong>
            <span className="text-[.76rem] text-[#94A3B8] block mt-0.5">Correct</span>
          </div>
          <div className="bg-white dark:bg-[#1E293B] rounded-[8px] p-4 text-center shadow-[0_2px_8px_rgba(21,101,192,0.10)]">
            <strong className="block font-nunito text-[1.5rem] font-900 text-[#C62828]">{wrong}</strong>
            <span className="text-[.76rem] text-[#94A3B8] block mt-0.5">Wrong</span>
          </div>
          <div className="bg-white dark:bg-[#1E293B] rounded-[8px] p-4 text-center shadow-[0_2px_8px_rgba(21,101,192,0.10)] max-sm:col-span-2">
            <strong className="block font-nunito text-[1.5rem] font-900 text-[#F9A825]">{skipped}</strong>
            <span className="text-[.76rem] text-[#94A3B8] block mt-0.5">Skipped</span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 justify-center flex-wrap mb-6">
        <button
          onClick={onRetry}
          className="bg-[#1565C0] hover:bg-[#1976D2] text-white rounded-[10px] px-6 py-3 font-nunito text-[.95rem] font-800 cursor-pointer transition-all duration-200 border-2 border-[#1565C0]"
        >
          🔄 Retry Exam
        </button>
        <button
          onClick={() => downloadResult(examType, subject, questions, userAnswers)}
          className="bg-white dark:bg-[#1E293B] text-[#2E7D32] dark:text-[#66BB6A] rounded-[10px] px-6 py-3 font-nunito text-[.95rem] font-800 cursor-pointer transition-all duration-200 border-2 border-[#2E7D32] dark:border-[#66BB6A] hover:bg-[#E8F5E9] dark:hover:bg-[#1B3A2A]"
        >
          📄 Download Result
        </button>
        <button
          onClick={onHome}
          className="bg-[#F0F4FA] dark:bg-[#263148] text-[#475569] dark:text-[#94A3B8] rounded-[10px] px-6 py-3 font-nunito text-[.95rem] font-800 cursor-pointer transition-all duration-200 border-2 border-[#DDE4F0] dark:border-[#334155] hover:bg-[#DDE4F0] dark:hover:bg-[#334155]"
        >
          🏠 Go Home
        </button>
      </div>

      {/* Review */}
      <div className="review-section">
        <h3 className="font-nunito text-[1.05rem] font-800 text-[#1E293B] dark:text-[#F1F5F9] mb-3.5">
          📋 Detailed Review
        </h3>
        {questions.map((q, i) => {
          const ua = userAnswers[i]
          const answered = ua !== undefined && ua !== ''
          const icon = isTheory ? (answered ? '📝' : '⚪') : (!answered ? '⚪' : ua === q.answer ? '✅' : '❌')
          const borderColor = isTheory
            ? (answered ? 'border-l-[#1565C0]' : 'border-l-[#F9A825]')
            : (!answered ? 'border-l-[#F9A825]' : ua === q.answer ? 'border-l-[#2E7D32]' : 'border-l-[#C62828]')

          return (
            <div
              key={q.id}
              className={`bg-white dark:bg-[#1E293B] rounded-[8px] p-4 mb-3 border-l-4 ${borderColor} shadow-[0_2px_8px_rgba(21,101,192,0.10)]`}
            >
              <div className="font-600 text-[.9rem] text-[#1E293B] dark:text-[#F1F5F9] mb-[10px] leading-[1.5]">
                {icon} Q{i + 1}: {q.question}
              </div>
              <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-2 mb-[10px] text-[.82rem]">
                <div className="rounded-[6px] p-2 bg-[#E3F2FD] dark:bg-[#1E3A5F] border-[1px] border-[#42A5F5]">
                  <label className="block font-700 text-[.72rem] mb-0.5 text-[#94A3B8]">Your Answer</label>
                  <div className="whitespace-pre-wrap">{answered ? ua : 'Not answered'}</div>
                </div>
                <div className="bg-[#E8F5E9] dark:bg-[#1B3A2A] rounded-[6px] p-2 border-[1px] border-[#C8E6C9]">
                  <label className="block font-700 text-[.72rem] mb-0.5 text-[#94A3B8]">{isTheory ? 'Model Answer' : 'Correct Answer'}</label>
                  {q.answer}
                </div>
              </div>
              <div className="bg-[#F0F4FA] dark:bg-[#263148] rounded-[6px] px-3 py-[10px] text-[.82rem] text-[#475569] dark:text-[#CBD5E1] leading-[1.6] border-l-3 border-l-[#F9A825]">
                <span className="font-700 text-[#F9A825] text-[.75rem] block mb-[3px]">💡 Explanation</span>
                {q.explanation}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
