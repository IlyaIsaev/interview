import {
  action,
  atom,
  effect,
  onEvent,
  reatomBoolean,
  withAsync,
  wrap,
} from '@reatom/core'

import { homeRoute } from '@/common/routes'
import { api } from '@/common/api'
import { isLoggedIn } from '@/modules/auth'

import type { Question } from '../../../model/questions'

export const readQuestion = atom<Question | null>(null, 'readQuestion')

export const readAnswerVisible = reatomBoolean(false, 'readAnswerVisible')

export const showReadAnswer = action(() => {
  readAnswerVisible.setTrue()
}, 'showReadAnswer')

export const fetchRandomQuestion = action(
  async (excludeId?: string) => {
    const response = await api.questions.random.$get({
      query: {
        ...(excludeId && { exclude: excludeId }),
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
  },
  'fetchRandomQuestion',
).extend(withAsync())

export const pickReadQuestion = action(async () => {
  const excludeId = readQuestion()?.id

  await fetchRandomQuestion(excludeId)
}, 'pickReadQuestion')

effect(async () => {
  if (!isLoggedIn()) {
    readQuestion.set(null)

    readAnswerVisible.setFalse()

    return
  }

  if (!homeRoute.exact()) {
    return
  }

  try {
    await wrap(fetchRandomQuestion())
  } catch {
    readQuestion.set(null)

    readAnswerVisible.setFalse()
  }
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
