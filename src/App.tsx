import { Header } from './components/Header'
import { AuthScreen } from './components/AuthScreen'
import { HomeScreen } from './components/HomeScreen'
import { CbtScreen } from './components/CbtScreen'
import { ResultScreen } from './components/ResultScreen'
import { SubscriptionScreen } from './components/SubscriptionScreen'
import { useExam } from './hooks/useExam'

export default function App() {
  const {
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
    confirmSubmit,
    retryExam,
    goHome,
    toggleDark,
    authSuccess,
    subscribe,
    dismissSubscription,
    showSubscription,
    logoutFromSub,
    attemptsRemaining,
    isSubscribed,
    subPlan,
    subExpiry,
  } = useExam()

  return (
    <div className="min-h-screen bg-[#F5F8FF] dark:bg-[#0F172A] font-sora">
      {state.screen !== 'auth' && <Header dark={state.dark} onToggleDark={toggleDark} />}

      {state.screen === 'auth' && (
        <AuthScreen onAuthSuccess={authSuccess} />
      )}

      {state.screen === 'subscription' && (
        <SubscriptionScreen
          attemptsRemaining={attemptsRemaining}
          isSubscribed={isSubscribed}
          subPlan={subPlan}
          subExpiry={subExpiry}
          onSubscribe={subscribe}
          onDismiss={dismissSubscription}
          onLogout={logoutFromSub}
        />
      )}

      {state.screen === 'home' && (
        <HomeScreen
          selectedExam={state.selectedExam}
          selectedSubject={state.selectedSubject}
          selectedUniversity={state.selectedUniversity}
          onSelectExam={selectExam}
          onSelectSubject={selectSubject}
          onSelectUniversity={selectUniversity}
          onStart={startExam}
          attemptsRemaining={attemptsRemaining}
          isSubscribed={isSubscribed}
          subPlan={subPlan}
          subExpiry={subExpiry}
          onShowSubscription={showSubscription}
        />
      )}

      {state.screen === 'cbt' && state.selectedExam && state.selectedSubject && !state.submitting && (
        <CbtScreen
          examType={state.selectedExam}
          subject={state.selectedSubject}
          questions={state.questions}
          userAnswers={state.userAnswers}
          currentQ={state.currentQ}
          timeLeft={state.timeLeft}
          onSelectOption={selectOption}
          onTypeAnswer={typeAnswer}
          onGoToQuestion={goToQuestion}
          onNext={nextQuestion}
          onPrev={prevQuestion}
          onSubmit={confirmSubmit}
        />
      )}

      {state.submitting && (
        <div className="flex flex-col items-center justify-center py-24 animate-fadeIn">
          <div className="w-12 h-12 border-4 border-[#1565C0] border-t-transparent rounded-full animate-spin mb-5" />
          <p className="font-nunito text-[1.1rem] font-700 text-[#1565C0] dark:text-[#42A5F5]">AI is evaluating your answers...</p>
          <p className="text-[.85rem] text-[#94A3B8] mt-2">Grading and generating analysis</p>
        </div>
      )}

      {state.screen === 'result' && state.result && state.selectedExam && state.selectedSubject && (
        <ResultScreen
          examType={state.selectedExam}
          subject={state.selectedSubject}
          questions={state.questions}
          userAnswers={state.userAnswers}
          evaluations={state.evaluations}
          correct={state.result.correct}
          wrong={state.result.wrong}
          skipped={state.result.skipped}
          pct={state.result.pct}
          grade={state.result.grade}
          emoji={state.result.emoji}
          onRetry={retryExam}
          onHome={goHome}
        />
      )}
    </div>
  )
}
