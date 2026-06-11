import type { ExamType, Subject } from '../types'
import { EXAM_DATA, EXAM_TYPES } from '../data/examData'

const POSTUTME_SUBJECTS: Subject[] = ['English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Government', 'Economics', 'Literature in English']

interface HomeScreenProps {
  selectedExam: ExamType | null
  selectedSubject: Subject | null
  selectedUniversity: Subject | null
  onSelectExam: (exam: ExamType) => void
  onSelectSubject: (subject: Subject) => void
  onSelectUniversity: (university: Subject | null) => void
  onStart: () => void
  attemptsRemaining: number
  isSubscribed: boolean
  subPlan: string | null
  subExpiry: string | null
  onShowSubscription: () => void
}

export function HomeScreen({ selectedExam, selectedSubject, selectedUniversity, onSelectExam, onSelectSubject, onSelectUniversity, onStart, attemptsRemaining, isSubscribed, subPlan, subExpiry, onShowSubscription }: HomeScreenProps) {
  const isPostUtme = selectedExam === 'POSTUTME'
  const isTheory = selectedExam === 'THEORY'
  const theoryExam = isTheory ? selectedUniversity : null
  const subjects: Subject[] = selectedExam
    ? (isTheory && theoryExam ? EXAM_DATA[theoryExam as ExamType].subjects : EXAM_DATA[selectedExam].subjects)
    : []

  const canStart = (isPostUtme || isTheory)
    ? selectedUniversity && selectedSubject
    : selectedSubject

  return (
    <div id="home-screen" className="max-w-[700px] mx-auto px-4 py-6 pb-12 animate-fadeIn">
      {/* Hero */}
      <div className="text-center pt-9 pb-7">
        <div className="inline-block bg-[#E8F5E9] dark:bg-[#1B3A2A] text-[#2E7D32] dark:text-[#66BB6A] border-[1.5px] border-[#66BB6A] rounded-[20px] px-4 py-1 text-[.8rem] font-700 mb-4 tracking-[.03em]">
          🎯 Your Ultimate Exam Prep Platform
        </div>
        <h1 className="font-nunito text-[2.1rem] max-sm:text-[1.6rem] font-900 text-[#1565C0] dark:text-[#42A5F5] leading-[1.2] mb-2">
          Practice <em className="text-[#2E7D32] dark:text-[#66BB6A] not-italic">Smart</em>, Excel with{' '}
          <em className="text-[#2E7D32] dark:text-[#66BB6A] not-italic">Confidence</em>
        </h1>
        <p className="text-[#475569] dark:text-[#94A3B8] text-[.98rem] leading-[1.7] max-w-[480px] mx-auto mb-6">
          Master JAMB, WAEC, NECO, GCE, NABTEB, TOEFL, POSTUTME &amp; THEORY with randomised past questions, smart revision tracking, and a realistic CBT exam experience.
        </p>
        <div className="flex justify-center gap-5 flex-wrap">
          {[
            { num: String(EXAM_TYPES.length), label: 'Exam Types' },
            { num: '18', label: 'Subjects' },
            { num: '3000+', label: 'Questions' },
          ].map(s => (
            <div key={s.label} className="bg-white dark:bg-[#1E293B] border-[1.5px] border-[#E3F2FD] dark:border-[#1E3A5F] rounded-[10px] px-5 py-[10px] text-center shadow-[0_2px_8px_rgba(21,101,192,0.10)]">
              <strong className="block font-nunito text-[1.3rem] font-900 text-[#1565C0] dark:text-[#42A5F5]">{s.num}</strong>
              <span className="text-[.75rem] text-[#94A3B8]">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription Banner */}
      <div className={`mb-6 rounded-[12px] px-4 py-3 flex items-center justify-between gap-3 border-2 ${isSubscribed ? 'bg-[#E8F5E9] dark:bg-[#1B3A2A] border-[#66BB6A]' : attemptsRemaining > 0 ? 'bg-[#FFF8E1] dark:bg-[#3E3520] border-[#F9A825]' : 'bg-[#FFEBEE] dark:bg-[#3E1A1A] border-[#EF5350]'}`}>
        <div className="flex items-center gap-3">
          <span className="text-[1.3rem]">{isSubscribed ? '⭐' : attemptsRemaining > 0 ? '📋' : '🔒'}</span>
          <div>
            <p className={`font-nunito font-700 text-[.85rem] ${isSubscribed ? 'text-[#2E7D32] dark:text-[#66BB6A]' : attemptsRemaining > 0 ? 'text-[#E65100] dark:text-[#FFB74D]' : 'text-[#C62828] dark:text-[#EF9A9A]'}`}>
              {isSubscribed
                ? `Subscribed (${subPlan === 'yearly' ? 'Yearly' : 'Monthly'})`
                : attemptsRemaining > 0
                  ? `${attemptsRemaining} free ${attemptsRemaining === 1 ? 'trial' : 'trials'} remaining`
                  : 'Free trials used up'}
            </p>
            <p className={`text-[.72rem] ${isSubscribed ? 'text-[#388E3C] dark:text-[#A5D6A7]' : 'text-[#78909C] dark:text-[#94A3B8]'}`}>
              {isSubscribed
                ? subExpiry ? `Expires ${new Date(subExpiry).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}` : ''
                : attemptsRemaining > 0
                  ? 'Subscribe for unlimited access'
                  : 'Subscribe to continue practising'}
            </p>
          </div>
        </div>
        <button
          onClick={onShowSubscription}
          className={`rounded-[8px] px-4 py-2 font-nunito font-800 text-[.8rem] cursor-pointer border-none transition-all duration-200 whitespace-nowrap ${isSubscribed ? 'bg-[#2E7D32] text-white hover:bg-[#1B5E20]' : 'bg-gradient-to-r from-[#1565C0] to-[#1976D2] text-white hover:from-[#1976D2] hover:to-[#1565C0] shadow-[0_2px_8px_rgba(21,101,192,0.3)]'}`}
        >
          {isSubscribed ? 'Manage' : 'Subscribe'}
        </button>
      </div>

      {/* Exam Grid */}
      <div className="font-nunito text-[1.15rem] font-800 text-[#1E293B] dark:text-[#F1F5F9] mb-3.5 flex items-center gap-2 before:content-[''] before:inline-block before:w-1 before:h-[18px] before:bg-[#2E7D32] before:rounded-[2px]">
        Select Exam Type
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-3 mb-8">
        {EXAM_TYPES.map(name => {
          const data = EXAM_DATA[name]
          const isSelected = selectedExam === name
          return (
            <div
              key={name}
              onClick={() => onSelectExam(name)}
              className={`exam-card rounded-[14px] px-3 py-4 text-center cursor-pointer transition-all duration-200 relative overflow-hidden border-2
                ${isSelected
                  ? 'border-[#1565C0] bg-[#E3F2FD] dark:bg-[#1E3A5F] dark:border-[#42A5F5] shadow-[0_4px_20px_rgba(21,101,192,0.14)]'
                  : 'border-[#DDE4F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] hover:border-[#42A5F5] hover:shadow-[0_4px_20px_rgba(21,101,192,0.14)] hover:-translate-y-0.5'
                }`}
            >
              <div className="text-[1.8rem] mb-1.5">{data.icon}</div>
              <div className={`font-nunito font-800 text-[.95rem] ${isSelected ? 'text-[#1565C0] dark:text-[#42A5F5]' : 'text-[#1E293B] dark:text-[#F1F5F9]'}`}>
                {name}
              </div>
              <div className="text-[.72rem] text-[#94A3B8] mt-0.5">{data.subjects.length} {name === 'POSTUTME' ? 'universities' : name === 'THEORY' ? 'exams' : 'subjects'}</div>
            </div>
          )
        })}
      </div>

      {/* University Grid (POSTUTME only) */}
      {selectedExam && isPostUtme && !selectedUniversity && (
        <div className="animate-fadeIn">
          <div className="font-nunito text-[1.15rem] font-800 text-[#1E293B] dark:text-[#F1F5F9] mb-3.5 flex items-center gap-2 before:content-[''] before:inline-block before:w-1 before:h-[18px] before:bg-[#2E7D32] before:rounded-[2px]">
            Choose University
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] max-sm:grid-cols-2 gap-[10px] mb-7">
            {subjects.map(uni => {
              const isSelected = selectedUniversity === uni
              return (
                <button
                  key={uni}
                  onClick={() => onSelectUniversity(uni)}
                  className={`subject-btn rounded-[8px] px-3.5 py-[10px] text-left cursor-pointer transition-all duration-200 font-sora text-[.82rem] flex items-center gap-2 border-[1.5px]
                    ${isSelected
                      ? 'border-[#2E7D32] bg-[#E8F5E9] dark:bg-[#1B3A2A] text-[#2E7D32] dark:text-[#66BB6A] font-600'
                      : 'border-[#DDE4F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] text-[#475569] dark:text-[#94A3B8] hover:border-[#66BB6A] hover:bg-[#E8F5E9] dark:hover:bg-[#1B3A2A] hover:text-[#2E7D32] dark:hover:text-[#66BB6A]'
                    }`}
                >
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 transition-all duration-200 ${isSelected ? 'bg-[#2E7D32] dark:bg-[#66BB6A]' : 'bg-[#DDE4F0] dark:bg-[#334155]'}`} />
                  {uni}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* THEORY Exam Grid — choose WAEC or NECO */}
      {selectedExam && isTheory && !theoryExam && (
        <div className="animate-fadeIn">
          <div className="font-nunito text-[1.15rem] font-800 text-[#1E293B] dark:text-[#F1F5F9] mb-3.5 flex items-center gap-2 before:content-[''] before:inline-block before:w-1 before:h-[18px] before:bg-[#2E7D32] before:rounded-[2px]">
            Choose Exam
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] max-sm:grid-cols-2 gap-[10px] mb-7">
            {subjects.map(exam => {
              const isSelected = theoryExam === exam
              return (
                <button
                  key={exam}
                  onClick={() => onSelectUniversity(exam)}
                  className={`subject-btn rounded-[8px] px-3.5 py-[10px] text-left cursor-pointer transition-all duration-200 font-sora text-[.82rem] flex items-center gap-2 border-[1.5px]
                    ${isSelected
                      ? 'border-[#2E7D32] bg-[#E8F5E9] dark:bg-[#1B3A2A] text-[#2E7D32] dark:text-[#66BB6A] font-600'
                      : 'border-[#DDE4F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] text-[#475569] dark:text-[#94A3B8] hover:border-[#66BB6A] hover:bg-[#E8F5E9] dark:hover:bg-[#1B3A2A] hover:text-[#2E7D32] dark:hover:text-[#66BB6A]'
                    }`}
                >
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 transition-all duration-200 ${isSelected ? 'bg-[#2E7D32] dark:bg-[#66BB6A]' : 'bg-[#DDE4F0] dark:bg-[#334155]'}`} />
                  {exam}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Subject Grid — POSTUTME: after university selected, THEORY: after exam selected, others: after exam selected */}
      {selectedExam && !isPostUtme && !(isTheory && !theoryExam) && (
        <div className="animate-fadeIn">
          <div className="font-nunito text-[1.15rem] font-800 text-[#1E293B] dark:text-[#F1F5F9] mb-3.5 flex items-center gap-2 before:content-[''] before:inline-block before:w-1 before:h-[18px] before:bg-[#2E7D32] before:rounded-[2px]">
            Choose Subject
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] max-sm:grid-cols-2 gap-[10px] mb-7">
            {subjects.map(sub => {
              const isSelected = selectedSubject === sub
              return (
                <button
                  key={sub}
                  onClick={() => onSelectSubject(sub)}
                  className={`subject-btn rounded-[8px] px-3.5 py-[10px] text-left cursor-pointer transition-all duration-200 font-sora text-[.84rem] flex items-center gap-2 border-[1.5px]
                    ${isSelected
                      ? 'border-[#2E7D32] bg-[#E8F5E9] dark:bg-[#1B3A2A] text-[#2E7D32] dark:text-[#66BB6A] font-600'
                      : 'border-[#DDE4F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] text-[#475569] dark:text-[#94A3B8] hover:border-[#66BB6A] hover:bg-[#E8F5E9] dark:hover:bg-[#1B3A2A] hover:text-[#2E7D32] dark:hover:text-[#66BB6A]'
                    }`}
                >
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 transition-all duration-200 ${isSelected ? 'bg-[#2E7D32] dark:bg-[#66BB6A]' : 'bg-[#DDE4F0] dark:bg-[#334155]'}`} />
                  {sub}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* POSTUTME Subject Grid (after university selected) */}
      {isPostUtme && selectedUniversity && (
        <div className="animate-fadeIn">
          <button
            onClick={() => onSelectUniversity(null)}
            className="text-[.82rem] text-[#1565C0] dark:text-[#42A5F5] font-600 mb-3 cursor-pointer hover:underline bg-transparent border-none"
          >
            ← Back to universities
          </button>
          <div className="font-nunito text-[1.15rem] font-800 text-[#1E293B] dark:text-[#F1F5F9] mb-3.5 flex items-center gap-2 before:content-[''] before:inline-block before:w-1 before:h-[18px] before:bg-[#2E7D32] before:rounded-[2px]">
            Choose Subject for {selectedUniversity}
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] max-sm:grid-cols-2 gap-[10px] mb-7">
            {POSTUTME_SUBJECTS.map(sub => {
              const isSelected = selectedSubject === sub
              return (
                <button
                  key={sub}
                  onClick={() => onSelectSubject(sub)}
                  className={`subject-btn rounded-[8px] px-3.5 py-[10px] text-left cursor-pointer transition-all duration-200 font-sora text-[.84rem] flex items-center gap-2 border-[1.5px]
                    ${isSelected
                      ? 'border-[#2E7D32] bg-[#E8F5E9] dark:bg-[#1B3A2A] text-[#2E7D32] dark:text-[#66BB6A] font-600'
                      : 'border-[#DDE4F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] text-[#475569] dark:text-[#94A3B8] hover:border-[#66BB6A] hover:bg-[#E8F5E9] dark:hover:bg-[#1B3A2A] hover:text-[#2E7D32] dark:hover:text-[#66BB6A]'
                    }`}
                >
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 transition-all duration-200 ${isSelected ? 'bg-[#2E7D32] dark:bg-[#66BB6A]' : 'bg-[#DDE4F0] dark:bg-[#334155]'}`} />
                  {sub === 'Literature in English' ? 'Literature' : sub}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* THEORY Subject Grid (after exam selected) */}
      {isTheory && theoryExam && (
        <div className="animate-fadeIn">
          <button
            onClick={() => onSelectUniversity(null)}
            className="text-[.82rem] text-[#1565C0] dark:text-[#42A5F5] font-600 mb-3 cursor-pointer hover:underline bg-transparent border-none"
          >
            ← Back to exams
          </button>
          <div className="font-nunito text-[1.15rem] font-800 text-[#1E293B] dark:text-[#F1F5F9] mb-3.5 flex items-center gap-2 before:content-[''] before:inline-block before:w-1 before:h-[18px] before:bg-[#2E7D32] before:rounded-[2px]">
            Choose Subject for {theoryExam}
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] max-sm:grid-cols-2 gap-[10px] mb-7">
            {subjects.map(sub => {
              const isSelected = selectedSubject === sub
              return (
                <button
                  key={sub}
                  onClick={() => onSelectSubject(sub)}
                  className={`subject-btn rounded-[8px] px-3.5 py-[10px] text-left cursor-pointer transition-all duration-200 font-sora text-[.84rem] flex items-center gap-2 border-[1.5px]
                    ${isSelected
                      ? 'border-[#2E7D32] bg-[#E8F5E9] dark:bg-[#1B3A2A] text-[#2E7D32] dark:text-[#66BB6A] font-600'
                      : 'border-[#DDE4F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] text-[#475569] dark:text-[#94A3B8] hover:border-[#66BB6A] hover:bg-[#E8F5E9] dark:hover:bg-[#1B3A2A] hover:text-[#2E7D32] dark:hover:text-[#66BB6A]'
                    }`}
                >
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 transition-all duration-200 ${isSelected ? 'bg-[#2E7D32] dark:bg-[#66BB6A]' : 'bg-[#DDE4F0] dark:bg-[#334155]'}`} />
                  {sub === 'Literature in English' ? 'Literature' : sub}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Start Section */}
      {selectedExam && canStart && (
        <div className="animate-fadeIn bg-gradient-to-r from-[#1565C0] via-[#1976D2] to-[#2E7D32] rounded-[14px] p-6 text-white text-center shadow-[0_8px_40px_rgba(21,101,192,0.18)]">
          <h3 className="font-nunito text-[1.1rem] font-800 mb-1.5">Ready to Test Yourself?</h3>
          <p className="text-[.85rem] opacity-85 mb-4.5">
            {isPostUtme
              ? `${selectedUniversity} · ${selectedSubject}`
              : isTheory
                ? `${theoryExam} Theory · ${selectedSubject}`
                : `${selectedExam} · ${selectedSubject}`}
          </p>
          <div className="flex justify-center gap-4 mb-5 flex-wrap">
            {selectedExam === 'THEORY' ? (
              <>
                <div className="bg-white/15 rounded-[8px] px-4 py-2 text-[.82rem] font-600">📝 10 Questions</div>
                <div className="bg-white/15 rounded-[8px] px-4 py-2 text-[.82rem] font-600">⏱️ 30 Minutes</div>
              </>
            ) : (
              <>
                <div className="bg-white/15 rounded-[8px] px-4 py-2 text-[.82rem] font-600">📝 25 Questions</div>
                <div className="bg-white/15 rounded-[8px] px-4 py-2 text-[.82rem] font-600">⏱️ 7 Minutes</div>
                <div className="bg-white/15 rounded-[8px] px-4 py-2 text-[.82rem] font-600">🔄 Smart Rotation</div>
              </>
            )}
          </div>
          <button
            onClick={onStart}
            className="bg-[#F9A825] hover:bg-[#FFD54F] text-[#1E293B] border-none rounded-[10px] px-9 py-3.5 font-nunito text-[1.05rem] font-900 cursor-pointer transition-all duration-200 tracking-[.02em] shadow-[0_4px_15px_rgba(249,168,37,0.4)] hover:scale-[1.03] hover:shadow-[0_6px_20px_rgba(249,168,37,0.5)]"
          >
            🚀 Start Exam
          </button>
        </div>
      )}
    </div>
  )
}