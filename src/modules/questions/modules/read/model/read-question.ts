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
import { isLoggedIn, isSessionPending } from '@/modules/auth'

import {
  fetchQuestions,
  isQuestionsLoaded,
  type Question,
} from '../../../model/questions'

export const readQuestion = atom<Question | null>(null, 'readQuestion')

export const readAnswerVisible = reatomBoolean(false, 'readAnswerVisible')

const isOpeningReadQuestion = atom(false, 'isOpeningReadQuestion')

const lastReadAuthLoggedIn = atom<boolean | null>(null, 'lastReadAuthLoggedIn')

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

export const ensureReadQuestionLoaded = action(async () => {
  if (isSessionPending()) {
    return
  }

  if (isOpeningReadQuestion()) {
    return
  }

  // Wait for the site-level list load; do not start another GET /questions.
  if (!isQuestionsLoaded()) {
    return
  }

  if (readQuestion()) {
    return
  }

  if (fetchRandomQuestion.pending() > 0 || fetchQuestionById.pending() > 0) {
    return
  }

  const questions = fetchQuestions.data()

  // Empty bank: skip /random (would only 404) and show the empty state.
  if (questions.length === 0) {
    readQuestion.set(null)

    readAnswerVisible.setFalse()

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

  if (homeRoute.exact()) {
    await ensureReadQuestionLoaded()
  }
}, 'clearReadQuestionIfId')

// Load a random question when home is open and the questions list has settled.
effect(async () => {
  if (isSessionPending()) {
    return
  }

  const loggedIn = isLoggedIn()
  const previousLoggedIn = lastReadAuthLoggedIn()

  if (previousLoggedIn !== null && previousLoggedIn !== loggedIn) {
    readQuestion.set(null)

    readAnswerVisible.setFalse()
  }

  lastReadAuthLoggedIn.set(loggedIn)

  if (!homeRoute.exact()) {
    return
  }

  // Re-runs when isQuestionsLoaded flips true after the site-level list fetch.
  if (!isQuestionsLoaded()) {
    return
  }

  await wrap(ensureReadQuestionLoaded())
}, 'loadReadQuestionOnHome')

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

