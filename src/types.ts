export type ExamType = 'JAMB' | 'WAEC' | 'NECO' | 'GCE' | 'NABTEB' | 'TOEFL' | 'POSTUTME' | 'THEORY'

export type Subject =
  | 'Mathematics'
  | 'Use of English'
  | 'English Language'
  | 'Physics'
  | 'Chemistry'
  | 'Biology'
  | 'Economics'
  | 'Commerce'
  | 'Accounting'
  | 'Financial Accounting'
  | 'Literature in English'
  | 'Government'
  | 'CRS'
  | 'Islamic Studies'
  | 'Yoruba'
  | 'Arabic'
  | 'Civic Education'
  | 'French'
  | 'Computer Studies'
  | 'Reading'
  | 'Listening'
  | 'Speaking'
  | 'Writing'
  | 'University of Lagos'
  | 'University of Ibadan'
  | 'Obafemi Awolowo University'
  | 'Ahmadu Bello University'
  | 'University of Nigeria'
  | 'Federal University of Technology Akure'
  | 'Federal University of Technology Owerri'
  | 'University of Port Harcourt'
  | 'University of Benin'
  | 'University of Ilorin'
  | 'University of Uyo'
  | 'Federal University of Agriculture Makurdi'
  | 'Lagos State University'
  | 'Olabisi Onabanjo University'
  | 'Ekiti State University'
  | 'Delta State University'
  | 'Rivers State University'
  | 'Imo State University'
  | 'Abia State University'
  | 'Kaduna State University'
  | 'Kwara State University'
  | 'Niger Delta University'
  | 'Covenant University'
  | 'Babcock University'
  | 'Bowen University'
  | "Redeemer's University"
  | 'Lead City University'
  | 'Caleb University'
  | 'Nile University of Nigeria'
  | 'Baze University'
  | 'Afe Babalola University'
  | 'Ajayi Crowther University'
  | 'Further Mathematics'
  | 'Marketing'
  | 'Bookkeeping'
  | 'Agricultural Science'
  | 'Hausa'
  | 'Igbo'
  | 'WAEC'
  | 'NECO'

export interface Question {
  id: string
  question: string
  options: string[]
  answer: string
  explanation: string
  subject: Subject
  passage?: string
}

export interface ExamMeta {
  icon: string
  subjects: Subject[]
}

export type ExamData = Record<ExamType, ExamMeta>

export type Screen = 'auth' | 'home' | 'cbt' | 'result' | 'subscription'

export type SubscriptionPlan = 'monthly' | 'yearly' | null

export interface SubscriptionState {
  plan: SubscriptionPlan
  expiry: string | null
}

export interface UserAnswers {
  [questionIndex: number]: string
}

export interface ExamResult {
  score: number
  total: number
  pct: number
  grade: string
  date: string
}

export type TimerStatus = 'normal' | 'warning' | 'danger'

export interface AnswerEvaluation {
  isCorrect: boolean
  feedback: string
  analysis: string
}

export interface TheoryEvaluations {
  [questionIndex: number]: AnswerEvaluation
}
