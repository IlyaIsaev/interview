import { action, atom, reatomBoolean, withAsync } from '@reatom/core'

import { api } from '@/common/api'

import {
  requestQuestionPath,
  requestQuestionsListPath,
} from '../../../model/question-path'
import {
  isQuestionsHydrationPayloadAlreadyApplied,
  pickRandomQuestionId,
  questions,
  type Question,
  type QuestionsHydrationPayload,
} from '../../../model/questions'
import {
  clearShownQuestion,
  setShownQuestion,
  shownQuestion,
} from '../../../model/shown-question'

export const readAnswerVisible = reatomBoolean(false, 'readAnswerVisible')

const isOpeningReadQuestion = atom(false, 'isOpeningReadQuestion')

export const showReadAnswer = action(() => {
  readAnswerVisible.setTrue()
}, 'showReadAnswer')

export const clearReadQuestion = action(() => {
  clearShownQuestion()
  readAnswerVisible.setFalse()
}, 'clearReadQuestion')

/** Set the read view from an already-loaded bank item (sidebar click, no extra fetch). */
export const showQuestionFromBank = action((question: Question) => {
  isOpeningReadQuestion.set(true)

  try {
    setShownQuestion(question)
    readAnswerVisible.setFalse()
  } finally {
    isOpeningReadQuestion.set(false)
  }
}, 'showQuestionFromBank')

/** Show a newly created question on home when nothing is displayed yet. */
export const adoptReadQuestionIfEmpty = action((question: Question) => {
  if (shownQuestion()) {
    return
  }

  setShownQuestion(question)

  readAnswerVisible.setFalse()
}, 'adoptReadQuestionIfEmpty')

/** Show this question and ask the page to open its path. */
export const showCreatedReadQuestion = action((question: Question) => {
  isOpeningReadQuestion.set(true)

  try {
    setShownQuestion(question)

    readAnswerVisible.setFalse()

    requestQuestionPath(question.id)
  } finally {
    isOpeningReadQuestion.set(false)
  }
}, 'showCreatedReadQuestion')

/**
 * Apply hydration snapshot into the shown-question atom.
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

    setShownQuestion(hydrationPayload.currentQuestion)

    readAnswerVisible.setFalse()
  },
  'hydrateReadQuestionFromPayload',
)

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

  setShownQuestion(question)

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
  if (shownQuestion()?.id !== questionId) {
    return
  }

  clearReadQuestion()

  const nextQuestionId = pickRandomQuestionId(questions())

  if (!nextQuestionId) {
    requestQuestionsListPath()

    return
  }

  try {
    const loadedQuestion = await fetchQuestionById(nextQuestionId)

    if (!loadedQuestion) {
      requestQuestionsListPath()

      return
    }

    requestQuestionPath(nextQuestionId)
  } catch {
    clearReadQuestion()
    requestQuestionsListPath()
  }
}, 'clearReadQuestionIfId')
