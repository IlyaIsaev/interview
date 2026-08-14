import { action } from '@reatom/core'

import { signInRoute } from '@/modules/routing'

export const navigateToSignIn = action(() => {
  signInRoute.go()
}, 'navigateToSignInFromSignUp')
