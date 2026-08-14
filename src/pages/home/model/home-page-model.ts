import { effect } from '@reatom/core'

import { homeRoute, questionRoute, questionsRoute } from '@/modules/routing'

/**
 * `/` is empty: redirect into the questions flow with a random question,
 * or to `/questions` when the bank is empty.
 */
effect(() => {
  if (!homeRoute.exact()) {
    return
  }

  if (!homeRoute.loader.ready()) {
    return
  }

  const homeRedirect = homeRoute.loader.data()

  if (!homeRedirect) {
    return
  }

  if (homeRedirect.randomQuestionId) {
    questionRoute.go(
      {
        questionId: homeRedirect.randomQuestionId,
      },
      true,
    )

    return
  }

  questionsRoute.go(undefined, true)
}, 'homePageRedirectToQuestions')
