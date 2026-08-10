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
import { homeRoute } from '@/common/routes'

import {
  questions,
  type Question,
  wasHomeLoaderDataHydrated,
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
 * Apply home loader payload into the read atom (call from component render).
 * Skips when this loader payload was already applied so "Next" is not reset.
 */
export const hydrateReadQuestionFromHomeLoader = action(
  (data: HomeLoaderData) => {
    if (wasHomeLoaderDataHydrated(data)) {
      return
    }

    if (isOpeningReadQuestion()) {
      return
    }

    readQuestion.set(data.randomQuestion)

    readAnswerVisible.setFalse()
  },
  'hydrateReadQuestionFromHomeLoader',
)

export const fetchRandomQuestion = action(async (excludeId?: string) => {
  const response = excludeId
    ? await api.questions.random.$get({
        query: {
          exclude: excludeId,
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

  const data = await response.json()
  const question = data.question as Question

  readQuestion.set(question)

  readAnswerVisible.setFalse()

  return question
}, 'fetchRandomQuestion').extend(withAsync())

export const fetchQuestionById = action(async (id: string) => {
  const response = await api.questions[':id'].$get({
    param: {
      id,
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

  const data = await response.json()
  const question = data.question as Question

  readQuestion.set(question)

  readAnswerVisible.setFalse()

  return question
}, 'fetchQuestionById').extend(withAsync())

export const pickReadQuestion = action(async () => {
  const excludeId = readQuestion()?.id

  await fetchRandomQuestion(excludeId)
}, 'pickReadQuestion')

export const openReadQuestion = action(async (id: string) => {
  isOpeningReadQuestion.set(true)

  try {
    homeRoute.go()

    await fetchQuestionById(id)
  } finally {
    isOpeningReadQuestion.set(false)
  }
}, 'openReadQuestion')

export const clearReadQuestionIfId = action(async (id: string) => {
  if (readQuestion()?.id !== id) {
    return
  }

  readQuestion.set(null)

  readAnswerVisible.setFalse()

  if (!homeRoute.exact()) {
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
  if (!homeRoute.exact() || !readQuestion()) {
    return
  }

  onEvent(window, 'keydown', (event) => {
    if (event.key !== 'Enter' || event.repeat) {
      return
    }

    // Let the focused button handle Enter via its own click.
    if (event.target instanceof HTMLButtonElement) {
      return
    }

    if (
      event.target instanceof HTMLElement &&
      (event.target.tagName === 'INPUT' ||
        event.target.tagName === 'TEXTAREA' ||
        event.target.isContentEditable)
    ) {
      return
    }

    event.preventDefault()

    if (!readAnswerVisible()) {
      showReadAnswer()

      return
    }

    void pickReadQuestion()
  })
}, 'readQuestionOnEnter')
