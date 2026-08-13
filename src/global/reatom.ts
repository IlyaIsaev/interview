import { connectLogger } from '@reatom/core'

if (import.meta.env.DEV) {
  connectLogger()
}
