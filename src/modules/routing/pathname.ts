import { urlAtom } from '@reatom/core'

import { isLoggedIn, isSessionPending } from '@/modules/auth'

export type AuthBankModeParams = {
  /** Auth bank mode — included so loaders re-run on sign-in / sign-out. */
  mode: 'demo' | 'personal'
}

export const getNormalizedPathname = (): string => {
  const pathname = urlAtom().pathname.replace(/\/+$/, '')

  return pathname === '' ? '/' : pathname
}

export const getAuthBankModeParams = (): AuthBankModeParams | null => {
  if (isSessionPending()) {
    return null
  }

  return {
    mode: isLoggedIn() ? 'personal' : 'demo',
  }
}
