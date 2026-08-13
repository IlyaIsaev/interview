import { action, atom, computed, effect, withAsync } from '@reatom/core'

import { api } from '@/common/api'

import { requestQuestionPath } from '../../../model/question-path'
import { isQuestionsLoaded, questions } from '../../../model/questions'
import { shownQuestion } from '../../../model/shown-question'

/** Hide Next when the bank is loaded and there is at most one question. */
export const canGoToNextQuestion = computed(() => {
  if (!isQuestionsLoaded()) {
    return true
  }

  return questions().length > 1
}, 'canGoToNextQuestion')

const pendingNextQuestionId = atom<string | null>(null, 'pendingNextQuestionId')

const shownQuestionIdWhenNextRequested = atom<string | null>(
  null,
  'shownQuestionIdWhenNextRequested',
)

const loadRandomQuestionId = async (
  excludeQuestionId: string,
): Promise<string | null> => {
  const response = await api.questions.random.$get({
    query: {
      exclude: excludeQuestionId,
    },
  })

  if (!response.ok) {
    if (response.status === 404) {
      return null
    }

    throw new Error('Failed to load question')
  }

  const payload = await response.json()

  return payload.questionId
}

export const goToNextQuestion = action(async () => {
  if (!canGoToNextQuestion()) {
    return
  }

  const excludeQuestionId = shownQuestion()?.id

  if (!excludeQuestionId) {
    return
  }

  const nextQuestionId = await loadRandomQuestionId(excludeQuestionId)

  if (!nextQuestionId) {
    return
  }

  if (shownQuestion()?.id === nextQuestionId) {
    return
  }

  pendingNextQuestionId.set(nextQuestionId)
  shownQuestionIdWhenNextRequested.set(excludeQuestionId ?? null)

  requestQuestionPath(nextQuestionId)
}, 'goToNextQuestion').extend(withAsync())

export const isNextQuestionPending = computed(() => {
  return goToNextQuestion.pending() > 0 || pendingNextQuestionId() !== null
}, 'isNextQuestionPending')

effect(() => {
  const pendingQuestionId = pendingNextQuestionId()
  const shownQuestionId = shownQuestion()?.id
  const shownQuestionIdAtRequest = shownQuestionIdWhenNextRequested()

  if (!pendingQuestionId || !shownQuestionId) {
    return
  }

  const didShowRequestedQuestion = shownQuestionId === pendingQuestionId
  const didShowDifferentQuestion =
    shownQuestionIdAtRequest !== null &&
    shownQuestionId !== shownQuestionIdAtRequest

  if (!didShowRequestedQuestion && !didShowDifferentQuestion) {
    return
  }

  pendingNextQuestionId.set(null)
  shownQuestionIdWhenNextRequested.set(null)
}, 'clearPendingNextQuestionWhenShown')
