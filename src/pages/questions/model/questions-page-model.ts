import { action, atom, computed, effect, onEvent } from '@reatom/core'

import { isLoggedIn, signOut } from '@/modules/auth'
import {
  canGoToNextQuestion,
  clearQuestionPathNavigationRequest,
  clearReadQuestion,
  goToNextQuestion,
  hydrateQuestionsSession,
  isNextQuestionPending,
  questionPathNavigationRequest,
  questions,
  readAnswerVisible,
  resetQuestionBank,
  resetQuestionsHydration,
  resetQuestionsSearch,
  showQuestionFromBank,
  showReadAnswer,
  shownQuestion,
} from '@/modules/questions'
import {
  homeRoute,
  questionRoute,
  questionsRoute,
  signInRoute,
} from '@/modules/routing'

export const isQuestionsShellActive = computed(() => {
  const isQuestionsRouteActive = questionsRoute() !== null
  const isQuestionRouteActive = questionRoute() !== null

  return isQuestionsRouteActive || isQuestionRouteActive
}, 'isQuestionsShellActive')

export type QuestionsPageMain =
  | { kind: 'full-page-loading' }
  | { kind: 'error'; message: string }
  | { kind: 'missing' }
  | { kind: 'loading' }
  | { kind: 'ready' }

export const questionsPageMain = computed((): QuestionsPageMain => {
  const isQuestionDetail = questionRoute.exact()
  const questionLoader = questionRoute.loader.data()
  const questionsIndex = questionsRoute.loader.data()
  const isLoaderReady = isQuestionDetail
    ? questionRoute.loader.ready()
    : questionsRoute.loader.ready()
  const loaderError = isQuestionDetail
    ? questionRoute.loader.error()
    : questionsRoute.loader.error()
  const hasLoaderPayload = isQuestionDetail
    ? Boolean(questionLoader)
    : Boolean(questionsIndex)
  const currentReadQuestion = shownQuestion()
  const questionBank = questions()
  const isRedirectingToRandomQuestion =
    !isQuestionDetail && Boolean(questionsIndex?.randomQuestionId)
  const hasShellContent =
    questionBank.length > 0 || currentReadQuestion !== null || hasLoaderPayload

  if (!isLoaderReady && !hasShellContent) {
    return { kind: 'full-page-loading' }
  }

  if (loaderError && !hasLoaderPayload && !currentReadQuestion) {
    return {
      kind: 'error',
      message: loaderError.message || 'Failed to load questions',
    }
  }

  const isQuestionMissing =
    isQuestionDetail &&
    isLoaderReady &&
    Boolean(questionLoader) &&
    questionLoader?.currentQuestion === null &&
    !loaderError &&
    !currentReadQuestion

  if (isQuestionMissing) {
    return { kind: 'missing' }
  }

  if (isRedirectingToRandomQuestion && !currentReadQuestion) {
    return { kind: 'loading' }
  }

  if (
    currentReadQuestion ||
    (hasLoaderPayload && !isRedirectingToRandomQuestion)
  ) {
    return { kind: 'ready' }
  }

  return { kind: 'loading' }
}, 'questionsPageMain')

const questionsShellAuthMode = atom<'demo' | 'personal' | null>(
  null,
  'questionsShellAuthMode',
)

effect(() => {
  if (!isQuestionsShellActive()) {
    questionsShellAuthMode.set(null)

    return
  }

  const currentAuthMode = isLoggedIn() ? 'personal' : 'demo'
  const previousAuthMode = questionsShellAuthMode()

  if (previousAuthMode === currentAuthMode) {
    return
  }

  if (previousAuthMode !== null) {
    resetQuestionBank()
  }

  questionsShellAuthMode.set(currentAuthMode)
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

  const questionsIndex = questionsRoute.loader.data()

  if (!questionsIndex?.randomQuestionId) {
    return
  }

  questionRoute.go(
    {
      questionId: questionsIndex.randomQuestionId,
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
    const questionLoader = questionRoute.loader.data()

    if (!questionRoute.loader.ready() || !questionLoader || !urlQuestionId) {
      return
    }

    // Ignore stale loader payload while a newer navigation is in flight.
    if (
      questionLoader.currentQuestion &&
      questionLoader.currentQuestion.id !== urlQuestionId
    ) {
      return
    }

    hydrateQuestionsSession(questionLoader)

    return
  }

  if (!questionsRoute.exact()) {
    return
  }

  const questionsIndex = questionsRoute.loader.data()

  if (!questionsRoute.loader.ready() || !questionsIndex) {
    return
  }

  if (questionsIndex.randomQuestionId) {
    return
  }

  hydrateQuestionsSession({
    currentQuestion: null,
  })
}, 'questionsPageSyncSession')

/**
 * Module intents (create / delete) → path navigation.
 * Sidebar calls questionRoute.go; Next/create/delete request a path.
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

export const signOutUser = action(() => {
  void signOut()
}, 'signOutUser')

export const navigateToSignIn = action(() => {
  signInRoute.go()
}, 'navigateToSignInFromQuestions')

export const navigateToHome = action(() => {
  homeRoute.go()
}, 'navigateToHomeFromQuestionsShell')

// Enter: show answer first; after answer is visible, go to the next question.
effect(() => {
  if (!isQuestionsShellActive() || !shownQuestion()) {
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

    if (!canGoToNextQuestion() || isNextQuestionPending()) {
      return
    }

    void goToNextQuestion()
  })
}, 'questionsPageOnEnter')
