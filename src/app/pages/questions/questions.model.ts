import { action, effect, onEvent, withAsync } from '@reatom/core'

import { isLoggedIn } from '@/common/auth'
import {
  loadRandomQuestion,
  questionRoute,
  questionsRoute,
} from '@/common/routes'
import {
  clearQuestionPathNavigationRequest,
  clearReadQuestion,
  hydrateQuestionsSession,
  isQuestionsLoaded,
  questionPathNavigationRequest,
  questions,
  readAnswerVisible,
  readQuestion,
  resetQuestionBank,
  resetQuestionsHydration,
  resetQuestionsSearch,
  showQuestionFromBank,
  showReadAnswer,
} from '@/modules/questions'

const isQuestionsShellActive = () =>
  questionsRoute() !== null || questionRoute() !== null

let lastQuestionsShellAuthMode: 'demo' | 'personal' | null = null

const hasLoadedBankWithAtMostOneQuestion = () =>
  isQuestionsLoaded() && questions().length <= 1

effect(() => {
  if (!isQuestionsShellActive()) {
    lastQuestionsShellAuthMode = null

    return
  }

  const currentAuthMode = isLoggedIn() ? 'personal' : 'demo'

  if (
    lastQuestionsShellAuthMode !== null &&
    lastQuestionsShellAuthMode !== currentAuthMode
  ) {
    resetQuestionBank()
  }

  lastQuestionsShellAuthMode = currentAuthMode
}, 'questionsPageResetBankOnAuthModeChange')

/**
 * Bare `/questions` with a random question: send the user to that question.
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
    if (
      loaderPayload.currentQuestion &&
      loaderPayload.currentQuestion.id !== urlQuestionId
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

/** Load a random question (not the current one), then open `/questions/:id`. */
export const goToNextQuestion = action(async () => {
  if (hasLoadedBankWithAtMostOneQuestion()) {
    return
  }

  const excludeQuestionId = questionRoute()?.questionId ?? readQuestion()?.id

  const randomQuestion = await loadRandomQuestion(excludeQuestionId)

  if (!randomQuestion) {
    return
  }

  showQuestionFromBank(randomQuestion)

  if (questionRoute()?.questionId === randomQuestion.id) {
    return
  }

  questionRoute.go({
    questionId: randomQuestion.id,
  })
}, 'goToNextQuestion').extend(withAsync())

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

    if (
      hasLoadedBankWithAtMostOneQuestion() ||
      goToNextQuestion.pending() > 0
    ) {
      return
    }

    void goToNextQuestion()
  })
}, 'questionsPageOnEnter')
