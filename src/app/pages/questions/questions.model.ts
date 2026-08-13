import { action, effect, onEvent } from '@reatom/core'

import { questionRoute, questionsRoute } from '@/common/routes'
import {
  clearQuestionPathNavigationRequest,
  clearReadQuestion,
  hydrateQuestionsSession,
  pickRandomQuestionId,
  questionPathNavigationRequest,
  questions,
  readAnswerVisible,
  readQuestion,
  resetQuestionsHydration,
  resetQuestionsSearch,
  showQuestionFromBank,
  showReadAnswer,
} from '@/modules/questions'

const isQuestionsShellActive = () =>
  questionsRoute() !== null || questionRoute() !== null

/**
 * Bare `/questions` with a non-empty bank: send the user to the first list question.
 */
effect(() => {
  if (!questionsRoute.exact()) {
    return
  }

  if (!questionsRoute.loader.ready()) {
    return
  }

  const questionsPayload = questionsRoute.loader.data()

  if (!questionsPayload?.currentQuestion) {
    return
  }

  questionRoute.go(
    {
      questionId: questionsPayload.currentQuestion.id,
    },
    true,
  )
}, 'questionsIndexRedirectToQuestion')

/**
 * `/questions/:id` whose id is not in this user's bank: replace with the
 * question the loader actually loaded (first bank item).
 */
effect(() => {
  if (!questionRoute.exact()) {
    return
  }

  if (!questionRoute.loader.ready()) {
    return
  }

  const urlQuestionId = questionRoute()?.questionId
  const questionPayload = questionRoute.loader.data()
  const resolvedQuestion = questionPayload?.currentQuestion

  if (!urlQuestionId || !resolvedQuestion) {
    return
  }

  if (resolvedQuestion.id === urlQuestionId) {
    return
  }

  questionRoute.go(
    {
      questionId: resolvedQuestion.id,
    },
    true,
  )
}, 'questionRouteUnknownIdRedirectToResolved')

/**
 * Bridge the active route loader into the questions module.
 * Only one of questionsRoute / questionRoute matches a given URL (siblings).
 */
effect(() => {
  if (!isQuestionsShellActive()) {
    resetQuestionsHydration()
    resetQuestionsSearch()
    clearReadQuestion()

    return
  }

  if (questionRoute.exact()) {
    const urlQuestionId = questionRoute()?.questionId
    const loaderPayload = questionRoute.loader.data()

    if (!questionRoute.loader.ready() || !loaderPayload || !urlQuestionId) {
      return
    }

    // Ignore stale loader payload while a newer navigation is in flight.
    // Unknown URL ids are not in the bank — that mismatch is a fallback, not stale.
    const isUrlQuestionInBank = loaderPayload.questions.some(
      (question) => question.id === urlQuestionId,
    )

    if (
      loaderPayload.currentQuestion &&
      loaderPayload.currentQuestion.id !== urlQuestionId &&
      isUrlQuestionInBank
    ) {
      return
    }

    hydrateQuestionsSession(loaderPayload)

    return
  }

  if (!questionsRoute.exact()) {
    return
  }

  const questionsPayload = questionsRoute.loader.data()

  if (!questionsRoute.loader.ready() || !questionsPayload) {
    return
  }

  hydrateQuestionsSession(questionsPayload)
}, 'questionsPageSyncSession')

/**
 * Module intents (create / delete) → path navigation.
 * Sidebar/Next call questionRoute.go directly.
 */
effect(() => {
  if (!isQuestionsShellActive()) {
    return
  }

  const navigationRequest = questionPathNavigationRequest()

  if (!navigationRequest) {
    return
  }

  if (navigationRequest.type === 'question') {
    if (questionRoute()?.questionId !== navigationRequest.questionId) {
      questionRoute.go({
        questionId: navigationRequest.questionId,
      })
    }
  } else {
    questionsRoute.go()
  }

  clearQuestionPathNavigationRequest()
}, 'questionsPageApplyPathNavigationRequest')

/** Sidebar / explicit open: show bank item immediately, then sync URL. */
export const navigateToQuestion = action((questionId: string) => {
  const questionFromBank = questions().find(
    (question) => question.id === questionId,
  )

  if (questionFromBank) {
    showQuestionFromBank(questionFromBank)
  }

  if (questionRoute()?.questionId === questionId) {
    return
  }

  questionRoute.go({
    questionId,
  })
}, 'navigateToQuestion')

/** Pick a random bank id (not the current one), then open `/questions/:id`. */
export const goToNextQuestion = action(() => {
  if (questions().length <= 1) {
    return
  }

  const excludeQuestionId = questionRoute()?.questionId ?? readQuestion()?.id

  const nextQuestionId = pickRandomQuestionId(questions(), excludeQuestionId)

  if (!nextQuestionId) {
    return
  }

  navigateToQuestion(nextQuestionId)
}, 'goToNextQuestion')

// Enter: show answer first; after answer is visible, go to the next question.
effect(() => {
  if (!isQuestionsShellActive() || !readQuestion()) {
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

    if (questions().length <= 1) {
      return
    }

    goToNextQuestion()
  })
}, 'questionsPageOnEnter')
