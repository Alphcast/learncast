import { useState, useRef, useCallback, useEffect } from 'react'
import type { Screen, ExamType, Subject, Question, UserAnswers, TheoryEvaluations, SubscriptionPlan } from '../types'
import { getQuestions } from '../data/questions'
import { getTheoryQuestions } from '../data/theoryQuestions'
import { getSmartQuestions, playSound, spawnConfetti, getGrade } from '../utils/helpers'
import { evaluateTheoryAnswers } from '../services/aiService'

const FREE_TRIALS = 3
const MONTHLY_PRICE = 2000
const YEARLY_PRICE = 20000

function getMonthKey(): string {
  const d = new Date()
  return `lch_attempts_${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

function getAttempts(): number {
  try {
    return Number(localStorage.getItem(getMonthKey())) || 0
  } catch {
    return 0
  }
}

function incrementAttempts(): void {
  const key = getMonthKey()
  const current = getAttempts()
  localStorage.setItem(key, String(current + 1))
}

function getSubscriptionState(): { plan: SubscriptionPlan; expiry: string | null } {
  try {
    const plan = localStorage.getItem('lch_sub_plan') as SubscriptionPlan
    const expiry = localStorage.getItem('lch_sub_expiry')
    if (plan && expiry && new Date(expiry) > new Date()) {
      return { plan, expiry }
    }
    if (plan) {
      localStorage.removeItem('lch_sub_plan')
      localStorage.removeItem('lch_sub_expiry')
    }
  } catch {
    // ignore
  }
  return { plan: null, expiry: null }
}

function canStartExam(): boolean {
  const { plan, expiry } = getSubscriptionState()
  if (plan && expiry && new Date(expiry) > new Date()) return true
  return getAttempts() < FREE_TRIALS
}

function attemptsRemaining(): number {
  return Math.max(0, FREE_TRIALS - getAttempts())
}

const OBJ_TIME = 7 * 60
const THEORY_TIME = 30 * 60

interface ExamState {
  screen: Screen
  selectedExam: ExamType | null
  selectedSubject: Subject | null
  selectedUniversity: Subject | null
  questions: Question[]
  userAnswers: UserAnswers
  currentQ: number
  timeLeft: number
  dark: boolean
  submitting: boolean
  evaluations: TheoryEvaluations | null
  result: {
    correct: number
    wrong: number
    skipped: number
    pct: number
    grade: string
    emoji: string
  } | null
}

export function useExam() {
  const [state, setState] = useState<ExamState>({
    screen: localStorage.getItem('lch_auth') === 'true' ? 'home' : 'auth',
    selectedExam: null,
    selectedSubject: null,
    selectedUniversity: null,
    questions: [],
    userAnswers: {},
    currentQ: 0,
    timeLeft: OBJ_TIME,
    dark: localStorage.getItem('lch_dark') === 'true',
    submitting: false,
    evaluations: null,
    result: null,
  })

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (state.dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [state.dark])

  const goHome = useCallback(() => {
    setState(prev => ({ ...prev, screen: 'home', selectedExam: null, selectedSubject: null }))
  }, [])

  const selectExam = useCallback((exam: ExamType) => {
    setState(prev => ({ ...prev, selectedExam: exam, selectedSubject: null, selectedUniversity: null, screen: 'home' }))
  }, [])

  const selectUniversity = useCallback((university: Subject | null) => {
    setState(prev => ({ ...prev, selectedUniversity: university, selectedSubject: null }))
  }, [])

  const selectSubject = useCallback((subject: Subject) => {
    setState(prev => ({ ...prev, selectedSubject: subject }))
  }, [])

  const startExam = useCallback(() => {
    if (!canStartExam()) {
      setState(prev => ({ ...prev, screen: 'subscription' }))
      return
    }
    setState(prev => {
      if (!prev.selectedExam || !prev.selectedSubject) return prev
      const isTheory = prev.selectedExam === 'THEORY'
      const allQuestions = isTheory ? getTheoryQuestions(prev.selectedSubject) : getQuestions(prev.selectedSubject)
      const questions = getSmartQuestions(prev.selectedSubject, prev.selectedExam, allQuestions)
      const { plan, expiry } = getSubscriptionState()
      if (!(plan && expiry && new Date(expiry) > new Date())) {
        incrementAttempts()
      }
      return {
        ...prev,
        screen: 'cbt',
        questions,
        userAnswers: {},
        currentQ: 0,
        timeLeft: isTheory ? THEORY_TIME : OBJ_TIME,
        result: null,
        evaluations: null,
        submitting: false,
      }
    })
  }, [])

  useEffect(() => {
    if (state.screen === 'cbt') {
      timerRef.current = setInterval(() => {
        setState(prev => {
          if (prev.timeLeft <= 0) {
            if (timerRef.current) clearInterval(timerRef.current)
            return prev
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 }
        })
      }, 1000)
      return () => {
        if (timerRef.current) clearInterval(timerRef.current)
      }
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [state.screen])

  useEffect(() => {
    if (state.timeLeft <= 0 && state.screen === 'cbt') {
      submitExam()
    }
  }, [state.timeLeft, state.screen])

  const selectOption = useCallback((opt: string) => {
    playSound('select')
    setState(prev => ({
      ...prev,
      userAnswers: { ...prev.userAnswers, [prev.currentQ]: opt },
    }))
  }, [])

  const typeAnswer = useCallback((text: string) => {
    setState(prev => ({
      ...prev,
      userAnswers: { ...prev.userAnswers, [prev.currentQ]: text },
    }))
  }, [])

  const goToQuestion = useCallback((index: number) => {
    setState(prev => ({ ...prev, currentQ: index }))
  }, [])

  const nextQuestion = useCallback(() => {
    setState(prev => {
      if (prev.currentQ < prev.questions.length - 1) {
        return { ...prev, currentQ: prev.currentQ + 1 }
      }
      return prev
    })
  }, [])

  const prevQuestion = useCallback(() => {
    setState(prev => {
      if (prev.currentQ > 0) {
        return { ...prev, currentQ: prev.currentQ - 1 }
      }
      return prev
    })
  }, [])

  const submitExam = useCallback(async () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    const prev = { ...state }
    const isTheory = prev.selectedExam === 'THEORY'
    let correct = 0
    let wrong = 0
    let skipped = 0

    if (isTheory) {
      setState(p => ({ ...p, submitting: true }))

      const answeredQuestions = prev.questions
        .map((q, i) => ({ q, i, ua: prev.userAnswers[i] }))
        .filter(({ ua }) => ua && ua.trim() !== '')

      skipped = prev.questions.length - answeredQuestions.length

      try {
        const evaluations = await evaluateTheoryAnswers(
          answeredQuestions.map(({ q, i, ua }) => ({
            index: i,
            question: q.question,
            modelAnswer: q.answer,
            userAnswer: ua || '',
          }))
        )

        for (const { i } of answeredQuestions) {
          const ev = evaluations[i]
          if (ev?.isCorrect) correct++
          else wrong++
        }

        const pct = Math.round((correct / prev.questions.length) * 100)
        const { grade, emoji } = getGrade(pct)
        const key = `lch_last_score_${prev.selectedExam}_${prev.selectedSubject}`
        localStorage.setItem(key, JSON.stringify({ score: correct, total: prev.questions.length, pct, grade, date: new Date().toISOString() }))
        if (pct === 100) setTimeout(spawnConfetti, 300)

        setState(p => ({
          ...p,
          screen: 'result',
          submitting: false,
          evaluations,
          result: { correct, wrong, skipped, pct, grade, emoji },
        }))
        return
      } catch {
        const pct = 0
        const { grade, emoji } = getGrade(pct)
        const key = `lch_last_score_${prev.selectedExam}_${prev.selectedSubject}`
        localStorage.setItem(key, JSON.stringify({ score: 0, total: prev.questions.length, pct, grade, date: new Date().toISOString() }))
        setState(p => ({
          ...p,
          screen: 'result',
          submitting: false,
          result: { correct: 0, wrong: prev.questions.length - skipped, skipped, pct, grade, emoji },
        }))
        return
      }
    }

    prev.questions.forEach((q, i) => {
      const ua = prev.userAnswers[i]
      if (!ua) skipped++
      else if (ua === q.answer) correct++
      else wrong++
    })
    const pct = Math.round((correct / prev.questions.length) * 100)
    const { grade, emoji } = getGrade(pct)
    const key = `lch_last_score_${prev.selectedExam}_${prev.selectedSubject}`
    localStorage.setItem(key, JSON.stringify({ score: correct, total: prev.questions.length, pct, grade, date: new Date().toISOString() }))
    if (pct === 100) setTimeout(spawnConfetti, 300)
    setState(p => ({
      ...p,
      screen: 'result',
      result: { correct, wrong, skipped, pct, grade, emoji },
    }))
  }, [state])

  const confirmSubmit = useCallback(() => {
    const answered = Object.keys(state.userAnswers).length
    const unanswered = state.questions.length - answered
    if (unanswered > 0) {
      if (window.confirm(`You have ${unanswered} unanswered question(s). Submit anyway?`)) {
        submitExam()
      }
    } else {
      submitExam()
    }
  }, [state.userAnswers, state.questions.length, submitExam])

  const retryExam = useCallback(() => {
    setState(prev => ({
      ...prev,
      screen: 'home',
      result: null,
      evaluations: null,
      submitting: false,
    }))
  }, [])

  const toggleDark = useCallback(() => {
    setState(prev => {
      const newDark = !prev.dark
      localStorage.setItem('lch_dark', String(newDark))
      return { ...prev, dark: newDark }
    })
  }, [])

  const authSuccess = useCallback(() => {
    setState(prev => ({ ...prev, screen: 'home' }))
  }, [])

  const subscribe = useCallback((plan: 'monthly' | 'yearly') => {
    const expiry = new Date()
    expiry.setDate(expiry.getDate() + (plan === 'yearly' ? 365 : 30))
    localStorage.setItem('lch_sub_plan', plan)
    localStorage.setItem('lch_sub_expiry', expiry.toISOString())
    setState(prev => ({ ...prev, screen: 'home' }))
  }, [])

  const dismissSubscription = useCallback(() => {
    const { plan, expiry } = getSubscriptionState()
    if (plan && expiry && new Date(expiry) > new Date()) {
      setState(prev => ({ ...prev, screen: 'home' }))
    } else if (getAttempts() < FREE_TRIALS) {
      setState(prev => ({ ...prev, screen: 'home' }))
    }
  }, [])

  const showSubscription = useCallback(() => {
    setState(prev => ({ ...prev, screen: 'subscription' }))
  }, [])

  const logoutFromSub = useCallback(() => {
    localStorage.removeItem('lch_auth')
    localStorage.removeItem('lch_user')
    setState(prev => ({ ...prev, screen: 'auth' }))
  }, [])

  const { plan: subPlan, expiry: subExpiry } = getSubscriptionState()
  const isSubscribed = !!(subPlan && subExpiry && new Date(subExpiry) > new Date())

  return {
    state,
    selectExam,
    selectSubject,
    selectUniversity,
    startExam,
    selectOption,
    typeAnswer,
    goToQuestion,
    nextQuestion,
    prevQuestion,
    submitExam,
    confirmSubmit,
    retryExam,
    goHome,
    toggleDark,
    authSuccess,
    subscribe,
    dismissSubscription,
    showSubscription,
    logoutFromSub,
    attemptsRemaining: attemptsRemaining(),
    isSubscribed,
    subPlan,
    subExpiry,
    MONTHLY_PRICE,
    YEARLY_PRICE,
    FREE_TRIALS,
  }
}
