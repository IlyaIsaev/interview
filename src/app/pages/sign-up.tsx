import { action, wrap } from '@reatom/core'
import { reatomComponent } from '@reatom/react'

import { signInRoute } from '@/common/routes'
import { SignUpForm } from '@/modules/auth'

const navigateToSignIn = action(() => {
  signInRoute.go()
}, 'navigateToSignInFromSignUp')

const SignUpPage = reatomComponent(() => {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-medium tracking-tight">Sign up</h1>
        <p className="text-sm text-muted-foreground">
          Create an account with your name, email, and password.
        </p>
      </div>
      <SignUpForm />
      <p className="text-sm text-muted-foreground">
        Already have an account?{' '}
        <button
          type="button"
          className="text-foreground underline-offset-4 hover:underline"
          onClick={wrap(navigateToSignIn)}
        >
          Sign in
        </button>
      </p>
    </div>
  )
}, 'SignUpPage')

export default SignUpPage
