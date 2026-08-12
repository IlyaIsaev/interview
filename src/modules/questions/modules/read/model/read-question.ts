import {
  action,
  atom,
  effect,
  onEvent,
  reatomBoolean,
  withAsync,
} from '@reatom/core'

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

export const showReadAnswer = action(() => {
  readAnswerVisible.setTrue()
}, 'showReadAnswer')

export const clearReadQuestion = action(() => {
  readQuestion.set(null)
  readAnswerVisible.setFalse()
}, 'clearReadQuestion')

/** Show a newly created question on home when nothing is displayed yet. */
export const adoptReadQuestionIfEmpty = action((question: Question) => {
  if (readQuestion()) {
    return
  }

  readQuestion.set(question)

  readAnswerVisible.setFalse()
}, 'adoptReadQuestionIfEmpty')

/** Show this question in the read view (skips the next hydration overwrite). */
export const showCreatedReadQuestion = action((question: Question) => {
  isOpeningReadQuestion.set(true)

  try {
    readQuestion.set(question)

    readAnswerVisible.setFalse()
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

    readQuestion.set(hydrationPayload.randomQuestion)

    readAnswerVisible.setFalse()
  },
  'hydrateReadQuestionFromPayload',
)

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

        return null
      }

      throw new Error('Failed to load question')
    }

    const responsePayload = await response.json()
    const question = responsePayload.question as Question

    readQuestion.set(question)

    readAnswerVisible.setFalse()

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

export const pickReadQuestion = action(async () => {
  const excludeQuestionId = readQuestion()?.id

  await fetchRandomQuestion(excludeQuestionId)
}, 'pickReadQuestion')

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
    return
  }

  try {
    await fetchRandomQuestion()
  } catch {
    clearReadQuestion()
  }
}, 'clearReadQuestionIfId')

// Enter: show answer first; after answer is visible, go to the next question.
// Active only while a question is loaded (page layer clears it when leaving).
effect(() => {
  if (!readQuestion()) {
    return
  }

  onEvent(window, 'keydown', (keyboardEvent) => {
    if (keyboardEvent.key !== 'Enter' || keyboardEvent.repeat) {
      return
    }

    // Let the focused button handle Enter via its own click.
    if (keyboardEvent.target instanceof HTMLButtonElement) {
      return
    }

    if (
      keyboardEvent.target instanceof HTMLElement &&
      (keyboardEvent.target.tagName === 'INPUT' ||
        keyboardEvent.target.tagName === 'TEXTAREA' ||
        keyboardEvent.target.isContentEditable)
    ) {
      return
    }

    keyboardEvent.preventDefault()

    if (!readAnswerVisible()) {
      showReadAnswer()

      return
    }

    void pickReadQuestion()
  })
}, 'readQuestionOnEnter')
