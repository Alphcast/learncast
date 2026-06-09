import { useState, useRef, useCallback, useEffect } from 'react'
import type { Screen, ExamType, Subject, Question, UserAnswers } from '../types'
import { getQuestions } from '../data/questions'
import { getSmartQuestions, playSound, spawnConfetti, getGrade } from '../utils/helpers'

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
    screen: 'home',
    selectedExam: null,
    selectedSubject: null,
    selectedUniversity: null,
    questions: [],
    userAnswers: {},
    currentQ: 0,
    timeLeft: OBJ_TIME,
    dark: localStorage.getItem('lch_dark') === 'true',
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
    setState(prev => {
      if (!prev.selectedExam || !prev.selectedSubject) return prev
      const isTheory = prev.selectedExam === 'THEORY'
      const allQuestions = getQuestions(prev.selectedSubject)
      const questions = getSmartQuestions(prev.selectedSubject, prev.selectedExam, allQuestions)
      return {
        ...prev,
        screen: 'cbt',
        questions,
        userAnswers: {},
        currentQ: 0,
        timeLeft: isTheory ? THEORY_TIME : OBJ_TIME,
        result: null,
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

  const submitExam = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setState(prev => {
      const isTheory = prev.selectedExam === 'THEORY'
      let correct = 0
      let wrong = 0
      let skipped = 0
      prev.questions.forEach((q, i) => {
        const ua = prev.userAnswers[i]
        if (!ua) skipped++
        else if (!isTheory && ua === q.answer) correct++
        else if (!isTheory) wrong++
        else correct++
      })
      const pct = isTheory ? Math.round((correct / prev.questions.length) * 100) : Math.round((correct / prev.questions.length) * 100)
      const { grade, emoji } = getGrade(pct)
      const key = `lch_last_score_${prev.selectedExam}_${prev.selectedSubject}`
      localStorage.setItem(key, JSON.stringify({ score: correct, total: prev.questions.length, pct, grade, date: new Date().toISOString() }))
      if (pct === 100) setTimeout(spawnConfetti, 300)
      return {
        ...prev,
        screen: 'result',
        result: { correct, wrong, skipped, pct, grade, emoji },
      }
    })
  }, [])

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

  const toggleDark = useCallback(() => {
    setState(prev => {
      const newDark = !prev.dark
      localStorage.setItem('lch_dark', String(newDark))
      return { ...prev, dark: newDark }
    })
  }, [])

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
    goHome,
    toggleDark,
  }
}
