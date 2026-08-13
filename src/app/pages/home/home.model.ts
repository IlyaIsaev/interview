import { effect } from '@reatom/core'

import { homeRoute, questionRoute, questionsRoute } from '@/common/routes'

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

  const redirectPayload = homeRoute.loader.data()

  if (!redirectPayload) {
    return
  }

  if (redirectPayload.randomQuestionId) {
    questionRoute.go(
      {
        questionId: redirectPayload.randomQuestionId,
      },
      true,
    )

    return
  }

  questionsRoute.go(undefined, true)
}, 'homePageRedirectToQuestions')
