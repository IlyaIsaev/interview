import {
  action,
  atom,
  effect,
  onEvent,
  reatomBoolean,
  withAsync,
  wrap,
} from '@reatom/core'

import { api } from '@/common/api'
import { homeRoute } from '@/common/routes'
import { isLoggedIn } from '@/modules/auth'

import type { Question } from '../../../model/questions'

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

export const fetchRandomQuestion = action(async (excludeId?: string) => {
  const response = excludeId
    ? await api.questions.random.$get({
        query: {
          exclude: excludeId,
        },
      })
    : await api.questions.random.$get()

  if (!response.ok) {
    if (response.status === 401 || response.status === 404) {
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
    if (response.status === 401 || response.status === 404) {
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

export const ensureReadQuestionLoaded = action(async () => {
  if (!isLoggedIn()) {
    readQuestion.set(null)

    readAnswerVisible.setFalse()

    return
  }

  if (isOpeningReadQuestion()) {
    return
  }

  if (readQuestion()) {
    return
  }

  if (fetchRandomQuestion.pending() > 0 || fetchQuestionById.pending() > 0) {
    return
  }

  try {
    await fetchRandomQuestion()
  } catch {
    readQuestion.set(null)

    readAnswerVisible.setFalse()
  }
}, 'ensureReadQuestionLoaded')

export const clearReadQuestionIfId = action(async (id: string) => {
  if (readQuestion()?.id !== id) {
    return
  }

  readQuestion.set(null)

  readAnswerVisible.setFalse()

  if (homeRoute.exact() && isLoggedIn()) {
    await ensureReadQuestionLoaded()
  }
}, 'clearReadQuestionIfId')

// Load a random question when the home route is open and the user is logged in.
effect(async () => {
  if (!isLoggedIn()) {
    readQuestion.set(null)

    readAnswerVisible.setFalse()

    return
  }

  if (!homeRoute.exact()) {
    return
  }

  await wrap(ensureReadQuestionLoaded())
}, 'loadReadQuestionOnHome')

effect(() => {
  if (!readAnswerVisible()) {
    return
  }

  onEvent(window, 'keydown', (event) => {
    if (event.key !== 'Enter' || event.repeat) {
      return
    }

    // Let the focused Next button handle Enter via its own click.
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

    void pickReadQuestion()
  })
}, 'nextReadQuestionOnEnter')
