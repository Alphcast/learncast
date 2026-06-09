const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY
const API_URL = 'https://openrouter.ai/api/v1/chat/completions'

export interface AnswerEvaluation {
  isCorrect: boolean
  feedback: string
  analysis: string
}

export interface TheoryEvaluations {
  [questionIndex: number]: AnswerEvaluation
}

interface QuestionData {
  index: number
  question: string
  modelAnswer: string
  userAnswer: string
}

function extractJSON(text: string): string {
  const cleaned = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim()
  const start = cleaned.indexOf('[')
  const end = cleaned.lastIndexOf(']')
  if (start !== -1 && end !== -1 && end > start) {
    return cleaned.slice(start, end + 1)
  }
  return cleaned
}

export async function evaluateTheoryAnswers(data: QuestionData[]): Promise<TheoryEvaluations> {
  if (data.length === 0) return {}

  const prompt = `You are an expert WAEC/NECO theory exam grader. Evaluate each student answer STEP BY STEP against the model answer.

For each question:
1. Compare the student's key points against the model answer
2. Mark correct if they capture the main ideas (be generous)
3. Provide specific feedback on what was right and what's missing
4. Write an "analysis" with additional learning insights the student should know

Respond with ONLY a valid JSON array. No markdown, no backticks, no extra text.
Each object must have exactly these fields:
- "index": number
- "isCorrect": boolean
- "feedback": string (2-4 sentences of specific feedback on their answer)
- "analysis": string (2-4 sentences of extra learning points about this topic)

Questions to evaluate:
${data.map(q => `--- Question ${q.index + 1} ---
Q: ${q.question}
Model Answer: ${q.modelAnswer}
Student Answer: ${q.userAnswer || '(no answer given)'}`).join('\n\n')}`

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
      'HTTP-Referer': 'https://learncast1.vercel.app',
      'X-Title': 'LearnCast Hub',
    },
    body: JSON.stringify({
      model: 'google/gemini-2.0-flash-exp:free',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 4096,
    }),
  })

  if (!res.ok) {
    throw new Error(`AI evaluation failed: ${res.status} ${res.statusText}`)
  }

  const json = await res.json()
  const content = json.choices?.[0]?.message?.content || ''

  const raw = extractJSON(content)
  let evaluations: { index: number; isCorrect: boolean; feedback: string; analysis: string }[]

  try {
    evaluations = JSON.parse(raw)
  } catch {
    evaluations = data.map(d => ({
      index: d.index,
      isCorrect: true,
      feedback: 'AI was unable to parse the evaluation. Please review your answer against the model answer above.',
      analysis: 'Review the model answer to understand the key points expected.',
    }))
    return evaluations.reduce<TheoryEvaluations>((acc, ev) => {
      acc[ev.index] = { isCorrect: ev.isCorrect, feedback: ev.feedback, analysis: ev.analysis }
      return acc
    }, {})
  }

  const result: TheoryEvaluations = {}
  for (const ev of evaluations) {
    result[ev.index] = {
      isCorrect: ev.isCorrect,
      feedback: ev.feedback || 'No specific feedback provided.',
      analysis: ev.analysis || 'Review the model answer to deepen your understanding.',
    }
  }
  return result
}
