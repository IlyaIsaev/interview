import { wrap } from '@reatom/core'
import { reatomComponent } from '@reatom/react'

import { SignInForm } from '@/modules/auth'

import { signUpRoute } from '@/common/routes'

const SignInPage = reatomComponent(() => {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-medium tracking-tight">Sign in</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email and password to continue.
        </p>
      </div>

      <SignInForm />

      <p className="text-sm text-muted-foreground">
        No account?{' '}
        <button
          type="button"
          className="text-foreground underline-offset-4 hover:underline"
          onClick={wrap(() => signUpRoute.go())}
        >
          Sign up
        </button>
      </p>
    </div>
  )
}, 'SignInPage')

export default SignInPage
