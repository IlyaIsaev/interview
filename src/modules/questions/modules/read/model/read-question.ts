import {
  action,
  atom,
  effect,
  onEvent,
  reatomBoolean,
  withAsync,
} from '@reatom/core'

import { api } from '@/common/api'
import type { HomeLoaderData } from '@/common/routes'
import { homeRoute, testRoute } from '@/common/routes'

import {
  isHomeLoaderDataAlreadyHydrated,
  questions,
  type Question,
} from '../../../model/questions'

export const readQuestion = atom<Question | null>(null, 'readQuestion')

export const readAnswerVisible = reatomBoolean(false, 'readAnswerVisible')

const isOpeningReadQuestion = atom(false, 'isOpeningReadQuestion')

export const showReadAnswer = action(() => {
  readAnswerVisible.setTrue()
}, 'showReadAnswer')

/** Show a newly created question on home when nothing is displayed yet. */
export const adoptReadQuestionIfEmpty = action((question: Question) => {
  if (readQuestion()) {
    return
  }

  readQuestion.set(question)

  readAnswerVisible.setFalse()
}, 'adoptReadQuestionIfEmpty')

/** Navigate home and show this question in the read view. */
export const showCreatedReadQuestion = action((question: Question) => {
  isOpeningReadQuestion.set(true)

  try {
    readQuestion.set(question)

    readAnswerVisible.setFalse()

    homeRoute.go()
  } finally {
    isOpeningReadQuestion.set(false)
  }
}, 'showCreatedReadQuestion')

/**
 * Apply home loader payload into the read atom (from the home page model).
 * Skips when this loader payload was already applied so "Next" is not reset.
 */
export const hydrateReadQuestionFromHomeLoader = action(
  (homeLoaderPayload: HomeLoaderData) => {
    if (isHomeLoaderDataAlreadyHydrated(homeLoaderPayload)) {
      return
    }

    if (isOpeningReadQuestion()) {
      return
    }

    readQuestion.set(homeLoaderPayload.randomQuestion)

    readAnswerVisible.setFalse()
  },
  'hydrateReadQuestionFromHomeLoader',
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
        readQuestion.set(null)

        readAnswerVisible.setFalse()

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
      readQuestion.set(null)

      readAnswerVisible.setFalse()

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

export const openReadQuestion = action(async (questionId: string) => {
  isOpeningReadQuestion.set(true)

  try {
    homeRoute.go()

    await selectReadQuestion(questionId)
  } finally {
    isOpeningReadQuestion.set(false)
  }
}, 'openReadQuestion')

export const clearReadQuestionIfId = action(async (questionId: string) => {
  if (readQuestion()?.id !== questionId) {
    return
  }

  readQuestion.set(null)

  readAnswerVisible.setFalse()

  if (!homeRoute.exact() && !testRoute.exact()) {
    return
  }

  if (questions().length === 0) {
    return
  }

  try {
    await fetchRandomQuestion()
  } catch {
    readQuestion.set(null)

    readAnswerVisible.setFalse()
  }
}, 'clearReadQuestionIfId')

// Enter: show answer first; after answer is visible, go to the next question.
effect(() => {
  if ((!homeRoute.exact() && !testRoute.exact()) || !readQuestion()) {
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
