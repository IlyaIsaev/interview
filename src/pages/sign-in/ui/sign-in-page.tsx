import { reatomComponent } from '@reatom/react'

import { SignInForm } from '@/modules/auth'

const SignInPage = reatomComponent(() => {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-heading font-medium tracking-tight uppercase">
          Sign in
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email and password to continue.
        </p>
      </div>
      <SignInForm />
    </div>
  )
}, 'SignInPage')

export default SignInPage
