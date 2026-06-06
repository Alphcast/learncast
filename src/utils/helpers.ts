import type { Subject, Question } from '../types'

export function shuffleFisherYates<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function getSmartQuestions(subject: Subject, exam: string, allQuestions: Question[]): Question[] {
  const key = `lch_attempted_${exam}_${subject}`
  let attempted: string[] = JSON.parse(localStorage.getItem(key) || '[]')
  let remaining = allQuestions.filter(q => !attempted.includes(q.id))
  if (remaining.length < 25) {
    attempted = []
    remaining = allQuestions
    localStorage.removeItem(key)
  }
  const shuffled = shuffleFisherYates(remaining)
  const selected = shuffled.slice(0, 25)
  const newAttempted = [...attempted, ...selected.map(q => q.id)]
  localStorage.setItem(key, JSON.stringify(newAttempted))
  return selected
}

export function playSound(type: 'select' | 'submit') {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = type === 'select' ? 880 : 440
    gain.gain.value = 0.05
    osc.start()
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1)
    osc.stop(ctx.currentTime + 0.12)
  } catch {
    // audio not supported
  }
}

export function spawnConfetti() {
  const colors = ['#1976D2', '#66BB6A', '#F9A825', '#E91E63', '#9C27B0']
  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      const dot = document.createElement('div')
      dot.className = 'confetti-dot'
      dot.style.cssText = `left:${Math.random() * 100}vw;background:${colors[Math.floor(Math.random() * colors.length)]};animation-duration:${1.5 + Math.random() * 2}s;animation-delay:${Math.random() * 0.5}s`
      document.body.appendChild(dot)
      setTimeout(() => dot.remove(), 4000)
    }, i * 30)
  }
}

export function showToast(msg: string) {
  const old = document.querySelector('.toast')
  if (old) old.remove()
  const t = document.createElement('div')
  t.className = 'toast'
  t.textContent = msg
  document.body.appendChild(t)
  setTimeout(() => t.remove(), 3000)
}

export function downloadResult(exam: string, subject: string, questions: Question[], userAnswers: Record<number, string>) {
  const lines: string[] = [
    'LearnCast Hub – Exam Result',
    `Exam: ${exam}`,
    `Subject: ${subject}`,
    `Date: ${new Date().toLocaleString()}`,
    '',
    '--- DETAILED REVIEW ---',
    '',
  ]
  let correct = 0
  questions.forEach((q, i) => {
    const ua = userAnswers[i]
    const status = !ua ? 'SKIPPED' : ua === q.answer ? 'CORRECT' : 'WRONG'
    if (status === 'CORRECT') correct++
    lines.push(`Q${i + 1} [${status}]: ${q.question}`)
    lines.push(`Your answer: ${ua || 'Not answered'}`)
    lines.push(`Correct: ${q.answer}`)
    lines.push(`Explanation: ${q.explanation}`)
    lines.push('')
  })
  const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `LearnCastHub_${exam}_${subject}_Result.txt`
  a.click()
  showToast('📄 Result saved!')
}

export function getGrade(pct: number): { grade: string; emoji: string } {
  if (pct >= 80) return { grade: 'Excellent', emoji: '🏆' }
  if (pct >= 60) return { grade: 'Good', emoji: '👍' }
  if (pct >= 40) return { grade: 'Average', emoji: '📚' }
  return { grade: 'Needs Improvement', emoji: '💪' }
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export function getTimerStatus(seconds: number): 'normal' | 'warning' | 'danger' {
  if (seconds <= 60) return 'danger'
  if (seconds <= 300) return 'warning'
  return 'normal'
}
