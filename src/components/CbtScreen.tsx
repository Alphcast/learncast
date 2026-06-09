import type { Question, UserAnswers, ExamType, Subject } from '../types'
import { formatTime, getTimerStatus } from '../utils/helpers'

interface CbtScreenProps {
  examType: ExamType
  subject: Subject
  questions: Question[]
  userAnswers: UserAnswers
  currentQ: number
  timeLeft: number
  onSelectOption: (opt: string) => void
  onTypeAnswer: (text: string) => void
  onGoToQuestion: (index: number) => void
  onNext: () => void
  onPrev: () => void
  onSubmit: () => void
}

const LETTERS = ['A', 'B', 'C', 'D']

export function CbtScreen({
  examType,
  subject,
  questions,
  userAnswers,
  currentQ,
  timeLeft,
  onSelectOption,
  onTypeAnswer,
  onGoToQuestion,
  onNext,
  onPrev,
  onSubmit,
}: CbtScreenProps) {
  const isTheory = examType === 'THEORY'
  const q = questions[currentQ]
  const total = questions.length
  const timerStatus = getTimerStatus(timeLeft)
  const progressPct = ((currentQ + 1) / total) * 100

  const timerColor =
    timerStatus === 'danger'
      ? 'text-[#C62828]'
      : timerStatus === 'warning'
        ? 'text-[#E65100]'
        : 'text-[#1565C0] dark:text-[#42A5F5]'

  const timerPulse = timerStatus !== 'normal' ? 'animate-pulse' : ''

  return (
    <div id="cbt-screen" className="max-w-[900px] mx-auto px-3 py-4 pb-12 animate-fadeIn">
      {/* CBT Header */}
      <div className="bg-white dark:bg-[#1E293B] rounded-[14px] px-[18px] py-3.5 mb-3.5 flex items-center justify-between flex-wrap gap-3 shadow-[0_2px_8px_rgba(21,101,192,0.10)]">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="bg-[#1565C0] dark:bg-[#42A5F5] text-white rounded-[6px] px-3 py-1 text-[.78rem] font-700 font-nunito">
            {examType}
          </span>
          <span className="font-nunito font-800 text-[1rem] text-[#1E293B] dark:text-[#F1F5F9]">
            {subject}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[1.1rem]">⏱️</span>
          <span className={`font-nunito text-[1.4rem] font-900 tracking-[.04em] min-w-[64px] text-right ${timerColor} ${timerPulse}`}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-[#DDE4F0] dark:bg-[#334155] rounded-[20px] h-[7px] mb-3.5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#1565C0] to-[#66BB6A] rounded-[20px] transition-all duration-[400ms]"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-3.5 items-start">
        {/* Question Panel */}
        <div className="bg-white dark:bg-[#1E293B] rounded-[14px] p-5 shadow-[0_2px_8px_rgba(21,101,192,0.10)]">
          <div className="text-[.8rem] text-[#94A3B8] font-600 mb-2">
            Question {currentQ + 1} of {total}
          </div>
          {q.passage && (
            <div className="bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#DDE4F0] dark:border-[#334155] rounded-[10px] p-4 mb-5 text-[.88rem] text-[#334155] dark:text-[#CBD5E1] leading-[1.65] max-h-[260px] overflow-y-auto font-nunito">
              {q.passage.split('\n').map((para, i) => (
                <p key={i} className={i > 0 ? 'mt-3' : ''}>{para}</p>
              ))}
            </div>
          )}
          <div className="font-nunito text-[1.05rem] font-700 text-[#1E293B] dark:text-[#F1F5F9] leading-[1.55] mb-5">
            {q.question}
          </div>
          {isTheory ? (
            <textarea
              value={userAnswers[currentQ] || ''}
              onChange={e => onTypeAnswer(e.target.value)}
              placeholder="Type your answer here..."
              rows={8}
              className="w-full rounded-[10px] px-3.5 py-3 text-[.9rem] border-2 border-[#DDE4F0] dark:border-[#334155] bg-[#F0F4FA] dark:bg-[#263148] text-[#475569] dark:text-[#CBD5E1] focus:border-[#1565C0] dark:focus:border-[#42A5F5] focus:outline-none resize-y font-nunito leading-[1.6]"
            />
          ) : (
            <ul className="list-none flex flex-col gap-[10px]">
              {q.options.map((opt, i) => {
                const isSelected = userAnswers[currentQ] === opt
                return (
                  <li
                    key={i}
                    onClick={() => onSelectOption(opt)}
                    className={`flex items-start gap-3 rounded-[10px] px-3.5 py-3 cursor-pointer transition-all duration-[180ms] text-[.9rem] border-2
                      ${isSelected
                        ? 'border-[#1565C0] bg-[#E3F2FD] dark:bg-[#1E3A5F] text-[#1565C0] dark:text-[#42A5F5] font-600'
                        : 'border-[#DDE4F0] dark:border-[#334155] bg-[#F0F4FA] dark:bg-[#263148] text-[#475569] dark:text-[#CBD5E1] hover:border-[#42A5F5] hover:bg-[#E3F2FD] dark:hover:bg-[#1E3A5F]'
                      }`}
                  >
                    <span className={`w-[26px] h-[26px] rounded-full flex items-center justify-center font-800 text-[.8rem] flex-shrink-0 transition-all duration-[180ms] font-nunito
                      ${isSelected ? 'bg-[#1565C0] dark:bg-[#42A5F5] text-white' : 'bg-[#DDE4F0] dark:bg-[#334155] text-[#475569] dark:text-[#94A3B8]'}`}
                    >
                      {LETTERS[i]}
                    </span>
                    <span className="leading-[1.5] pt-0.5">{opt}</span>
                  </li>
                )
              })}
            </ul>
          )}
          <div className="flex justify-between items-center mt-5 gap-3 flex-wrap">
            <div className="flex gap-2">
              <button
                onClick={onPrev}
                disabled={currentQ === 0}
                className="bg-[#F0F4FA] dark:bg-[#263148] border-[1.5px] border-[#DDE4F0] dark:border-[#334155] rounded-[8px] px-5 py-[10px] font-sora text-[.88rem] font-600 cursor-pointer text-[#475569] dark:text-[#94A3B8] transition-all duration-[180ms] hover:border-[#42A5F5] hover:text-[#1565C0] dark:hover:text-[#42A5F5] hover:bg-[#E3F2FD] dark:hover:bg-[#1E3A5F] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ◀ Previous
              </button>
              <button
                onClick={onNext}
                disabled={currentQ >= total - 1}
                className="bg-[#F0F4FA] dark:bg-[#263148] border-[1.5px] border-[#DDE4F0] dark:border-[#334155] rounded-[8px] px-5 py-[10px] font-sora text-[.88rem] font-600 cursor-pointer text-[#475569] dark:text-[#94A3B8] transition-all duration-[180ms] hover:border-[#42A5F5] hover:text-[#1565C0] dark:hover:text-[#42A5F5] hover:bg-[#E3F2FD] dark:hover:bg-[#1E3A5F] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next ▶
              </button>
            </div>
            <button
              onClick={onSubmit}
              className="bg-[#2E7D32] hover:bg-[#388E3C] text-white border-none rounded-[8px] px-[22px] py-[10px] font-nunito text-[.9rem] font-800 cursor-pointer transition-all duration-[180ms] hover:scale-[1.02]"
            >
              📤 Submit
            </button>
          </div>
        </div>

        {/* Grid Panel */}
        <div className="bg-white dark:bg-[#1E293B] rounded-[14px] p-4 shadow-[0_2px_8px_rgba(21,101,192,0.10)]">
          <div className="font-nunito text-[.82rem] font-800 text-[#475569] dark:text-[#94A3B8] mb-3 uppercase tracking-[.05em]">
            Questions
          </div>
          <div className="grid grid-cols-5 gap-[6px]">
            {questions.map((_, i) => {
              const isCurrent = i === currentQ
              const isAnswered = userAnswers[i] !== undefined && userAnswers[i] !== ''
              let dotClass = 'bg-[#F0F4FA] dark:bg-[#263148] border-[#DDE4F0] dark:border-[#334155] text-[#475569] dark:text-[#94A3B8]'
              if (isCurrent) dotClass = 'bg-[#1565C0] dark:bg-[#42A5F5] border-[#1565C0] dark:border-[#42A5F5] text-white'
              else if (isAnswered) dotClass = 'bg-[#E8F5E9] dark:bg-[#1B3A2A] border-[#66BB6A] dark:border-[#66BB6A] text-[#2E7D32] dark:text-[#66BB6A]'
              return (
                <div
                  key={i}
                  onClick={() => onGoToQuestion(i)}
                  className={`w-full aspect-square rounded-[6px] border-[1.5px] flex items-center justify-center font-nunito text-[.75rem] font-700 cursor-pointer transition-all duration-[150ms] ${dotClass} hover:border-[#42A5F5] hover:bg-[#E3F2FD] dark:hover:bg-[#1E3A5F]`}
                >
                  {i + 1}
                </div>
              )
            })}
          </div>
          <div className="mt-3 flex flex-col gap-1.5 text-[.76rem] text-[#94A3B8]">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-[3px] border-[1.5px] border-[#1565C0] bg-[#1565C0]" />
              Current
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-[3px] border-[1.5px] border-[#66BB6A] bg-[#E8F5E9]" />
              Answered
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-[3px] border-[1.5px] border-[#DDE4F0] bg-[#F0F4FA]" />
              Unanswered
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
