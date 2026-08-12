import { action, atom, reatomBoolean, withAsync } from '@reatom/core'

import { api } from '@/common/api'

import {
  isQuestionsHydrationPayloadAlreadyApplied,
  questions,
  type Question,
  type QuestionsHydrationPayload,
} from '../../../model/questions'

export const readQuestion = atom<Question | null>(null, 'readQuestion')

export const readAnswerVisible = reatomBoolean(false, 'readAnswerVisible')

const isOpeningReadQuestion = atom(false, 'isOpeningReadQuestion')

/**
 * Page layer consumes this to navigate (modules must not import routes).
 * - `{ type: 'question', questionId }` → `/questions/:id`
 * - `{ type: 'list' }` → `/questions`
 * - `null` → no pending request
 */
export type QuestionPathNavigationRequest =
  | { type: 'question'; questionId: string }
  | { type: 'list' }

export const questionPathNavigationRequest =
  atom<QuestionPathNavigationRequest | null>(
    null,
    'questionPathNavigationRequest',
  )

const requestQuestionPath = action((questionId: string) => {
  questionPathNavigationRequest.set({
    type: 'question',
    questionId,
  })
}, 'requestQuestionPath')

const requestQuestionsListPath = action(() => {
  questionPathNavigationRequest.set({
    type: 'list',
  })
}, 'requestQuestionsListPath')

export const clearQuestionPathNavigationRequest = action(() => {
  questionPathNavigationRequest.set(null)
}, 'clearQuestionPathNavigationRequest')

export const showReadAnswer = action(() => {
  readAnswerVisible.setTrue()
}, 'showReadAnswer')

export const clearReadQuestion = action(() => {
  readQuestion.set(null)
  readAnswerVisible.setFalse()
}, 'clearReadQuestion')

/** Set the read view from an already-loaded bank item (sidebar click, no extra fetch). */
export const showQuestionFromBank = action((question: Question) => {
  isOpeningReadQuestion.set(true)

  try {
    readQuestion.set(question)
    readAnswerVisible.setFalse()
  } finally {
    isOpeningReadQuestion.set(false)
  }
}, 'showQuestionFromBank')

/** Show a newly created question on home when nothing is displayed yet. */
export const adoptReadQuestionIfEmpty = action((question: Question) => {
  if (readQuestion()) {
    return
  }

  readQuestion.set(question)

  readAnswerVisible.setFalse()
}, 'adoptReadQuestionIfEmpty')

/** Show this question and ask the page to open its path. */
export const showCreatedReadQuestion = action((question: Question) => {
  isOpeningReadQuestion.set(true)

  try {
    readQuestion.set(question)

    readAnswerVisible.setFalse()

    requestQuestionPath(question.id)
  } finally {
    isOpeningReadQuestion.set(false)
  }
}, 'showCreatedReadQuestion')

/**
 * Apply hydration snapshot into the read atom.
 * Skips when this payload was already applied so "Next" is not reset.
 */
export const hydrateReadQuestionFromPayload = action(
  (hydrationPayload: QuestionsHydrationPayload) => {
    if (isQuestionsHydrationPayloadAlreadyApplied(hydrationPayload)) {
      return
    }

    if (isOpeningReadQuestion()) {
      return
    }

    readQuestion.set(hydrationPayload.currentQuestion)

    readAnswerVisible.setFalse()
  },
  'hydrateReadQuestionFromPayload',
)

/** Fetch a random question id without updating read state (page navigates by id). */
export const loadRandomQuestionId = action(
  async (excludeQuestionId?: string): Promise<string | null> => {
    const response = excludeQuestionId
      ? await api.questions.random.$get({
          query: {
            exclude: excludeQuestionId,
          },
        })
      : await api.questions.random.$get()

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }

      throw new Error('Failed to load question')
    }

    const responsePayload = await response.json()
    const question = responsePayload.question as Question

    return question.id
  },
  'loadRandomQuestionId',
).extend(withAsync())

/** Fetch a random question and ask the page to open its path (e.g. delete fallback). */
export const fetchRandomQuestion = action(
  async (excludeQuestionId?: string) => {
    const response = excludeQuestionId
      ? await api.questions.random.$get({
          query: {
            exclude: excludeQuestionId,
          },
        })
      : await api.questions.random.$get()

    if (!response.ok) {
      if (response.status === 404) {
        clearReadQuestion()
        requestQuestionsListPath()

        return null
      }

      throw new Error('Failed to load question')
    }

    const responsePayload = await response.json()
    const question = responsePayload.question as Question

    readQuestion.set(question)

    readAnswerVisible.setFalse()

    requestQuestionPath(question.id)

    return question
  },
  'fetchRandomQuestion',
).extend(withAsync())

export const fetchQuestionById = action(async (questionId: string) => {
  const response = await api.questions[':id'].$get({
    param: {
      id: questionId,
    },
  })

  if (!response.ok) {
    if (response.status === 404) {
      clearReadQuestion()

      return null
    }

    throw new Error('Failed to load question')
  }

  const responsePayload = await response.json()
  const question = responsePayload.question as Question

  readQuestion.set(question)

  readAnswerVisible.setFalse()

  return question
}, 'fetchQuestionById').extend(withAsync())

export const selectReadQuestion = action(async (questionId: string) => {
  await fetchQuestionById(questionId)
}, 'selectReadQuestion')

/** Select a question for reading (skips the next hydration overwrite). */
export const openReadQuestion = action(async (questionId: string) => {
  isOpeningReadQuestion.set(true)

  try {
    await selectReadQuestion(questionId)
  } finally {
    isOpeningReadQuestion.set(false)
  }
}, 'openReadQuestion')

export const clearReadQuestionIfId = action(async (questionId: string) => {
  if (readQuestion()?.id !== questionId) {
    return
  }

  clearReadQuestion()

  if (questions().length === 0) {
    requestQuestionsListPath()

    return
  }

  try {
    await fetchRandomQuestion()
  } catch {
    clearReadQuestion()
    requestQuestionsListPath()
  }
}, 'clearReadQuestionIfId')
