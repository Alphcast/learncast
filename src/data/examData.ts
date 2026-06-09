import type { ExamData, ExamType } from '../types'

export const EXAM_DATA: ExamData = {
  JAMB: { icon: '🎓', subjects: ['Use of English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Economics', 'Commerce', 'Accounting', 'Literature in English', 'Government', 'CRS', 'Islamic Studies', 'Yoruba', 'Arabic', 'French', 'Agricultural Science', 'Hausa', 'Igbo'] },
  WAEC: { icon: '📘', subjects: ['English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics', 'Economics', 'Commerce', 'Financial Accounting', 'Literature in English', 'Government', 'CRS', 'Civic Education', 'Computer Studies'] },
  NECO: { icon: '📗', subjects: ['English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics', 'Economics', 'Commerce', 'Literature in English', 'Government', 'CRS'] },
  GCE: { icon: '📙', subjects: ['English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics', 'Economics'] },
  NABTEB: { icon: '🛠️', subjects: ['Mathematics', 'English Language', 'Physics', 'Chemistry', 'Economics', 'Commerce'] },
  TOEFL: { icon: '🇺🇸', subjects: ['Reading', 'Listening', 'Speaking', 'Writing'] },
  POSTUTME: { icon: '🏛️', subjects: ['University of Lagos', 'University of Ibadan', 'Obafemi Awolowo University', 'Ahmadu Bello University', 'University of Nigeria', 'Federal University of Technology Akure', 'Federal University of Technology Owerri', 'University of Port Harcourt', 'University of Benin', 'University of Ilorin', 'University of Uyo', 'Federal University of Agriculture Makurdi', 'Lagos State University', 'Olabisi Onabanjo University', 'Ekiti State University', 'Delta State University', 'Rivers State University', 'Imo State University', 'Abia State University', 'Kaduna State University', 'Kwara State University', 'Niger Delta University', 'Covenant University', 'Babcock University', 'Bowen University', "Redeemer's University", 'Lead City University', 'Caleb University', 'Nile University of Nigeria', 'Baze University', 'Afe Babalola University', 'Ajayi Crowther University'] },
  THEORY: { icon: '📝', subjects: ['English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Economics', 'Government', 'Literature in English', 'CRS', 'Commerce'] },
}

export const EXAM_TYPES: ExamType[] = ['JAMB', 'WAEC', 'NECO', 'GCE', 'NABTEB', 'TOEFL', 'POSTUTME', 'THEORY']
