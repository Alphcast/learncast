import { Header } from './components/Header'
import { HomeScreen } from './components/HomeScreen'
import { CbtScreen } from './components/CbtScreen'
import { ResultScreen } from './components/ResultScreen'
import { useExam } from './hooks/useExam'

export default function App() {
  const {
    state,
    selectExam,
    selectSubject,
    selectUniversity,
    startExam,
    selectOption,
    goToQuestion,
    nextQuestion,
    prevQuestion,
    confirmSubmit,
    goHome,
    toggleDark,
  } = useExam()

  return (
    <div className="min-h-screen bg-[#F5F8FF] dark:bg-[#0F172A] font-sora">
      <Header dark={state.dark} onToggleDark={toggleDark} />

      {state.screen === 'home' && (
        <HomeScreen
          selectedExam={state.selectedExam}
          selectedSubject={state.selectedSubject}
          selectedUniversity={state.selectedUniversity}
          onSelectExam={selectExam}
          onSelectSubject={selectSubject}
          onSelectUniversity={selectUniversity}
          onStart={startExam}
        />
      )}

      {state.screen === 'cbt' && state.selectedExam && state.selectedSubject && (
        <CbtScreen
          examType={state.selectedExam}
          subject={state.selectedSubject}
          questions={state.questions}
          userAnswers={state.userAnswers}
          currentQ={state.currentQ}
          timeLeft={state.timeLeft}
          onSelectOption={selectOption}
          onGoToQuestion={goToQuestion}
          onNext={nextQuestion}
          onPrev={prevQuestion}
          onSubmit={confirmSubmit}
        />
      )}

      {state.screen === 'result' && state.result && state.selectedExam && state.selectedSubject && (
        <ResultScreen
          examType={state.selectedExam}
          subject={state.selectedSubject}
          questions={state.questions}
          userAnswers={state.userAnswers}
          correct={state.result.correct}
          wrong={state.result.wrong}
          skipped={state.result.skipped}
          pct={state.result.pct}
          grade={state.result.grade}
          emoji={state.result.emoji}
          onRetry={startExam}
          onHome={goHome}
        />
      )}
    </div>
  )
}
