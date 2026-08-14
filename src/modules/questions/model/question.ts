import * as v from 'valibot'

const QuestionTimestampSchema = v.union([v.string(), v.number(), v.date()])

export const QuestionSchema = v.object({
  id: v.pipe(v.string(), v.minLength(1)),
  question: v.string(),
  answer: v.string(),
  createdAt: QuestionTimestampSchema,
  updatedAt: QuestionTimestampSchema,
})

export type Question = v.InferOutput<typeof QuestionSchema>

export const QuestionResponseSchema = v.object({
  question: QuestionSchema,
})

export const QuestionsListResponseSchema = v.object({
  questions: v.array(QuestionSchema),
})

export const RandomQuestionIdResponseSchema = v.object({
  questionId: v.pipe(v.string(), v.minLength(1)),
})

/** Snapshot used to hydrate the current read question from a route loader. */
export type QuestionsHydrationPayload = {
  currentQuestion: Question | null
}

/** Pick a random id from the bank, preferring anything other than `excludeQuestionId`. */
export const pickRandomQuestionId = (
  questionBank: readonly Question[],
  excludeQuestionId?: string,
): string | null => {
  const candidateQuestionIds = questionBank
    .filter((question) => question.id !== excludeQuestionId)
    .map((question) => question.id)

  const questionIdsToPickFrom =
    candidateQuestionIds.length > 0
      ? candidateQuestionIds
      : questionBank.map((question) => question.id)

  if (questionIdsToPickFrom.length === 0) {
    return null
  }

  const randomIndex = Math.floor(Math.random() * questionIdsToPickFrom.length)

  return questionIdsToPickFrom[randomIndex] ?? null
}
