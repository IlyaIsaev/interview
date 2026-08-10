import { action, reatomForm, urlAtom, wrap } from '@reatom/core'
import { reatomComponent } from '@reatom/react'

import { signIn } from '@/common/auth'
import { Button } from '@/common/components/ui/button'
import { FieldError, FieldGroup, FieldSet } from '@/common/components/ui/field'

import { TextField } from './text-field'

export const signInForm = reatomForm(
  {
    email: '',
    password: '',
  },
  {
    name: 'signInForm',
    validateOnBlur: true,
    validateBeforeSubmit: ({ email, password }) => {
      if (!email.trim()) {
        throw new Error('Email is required')
      }

      if (!email.includes('@')) {
        throw new Error('Enter a valid email')
      }

      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters')
      }
    },
    onSubmit: async ({ email, password }) => {
      const { error: signInError } = await signIn.email({
        email,
        password,
      })

      if (signInError) {
        throw new Error(signInError.message ?? 'Failed to sign in')
      }

      urlAtom.go('/')
    },
  },
)

export const submitSignInForm = action(async () => {
  try {
    await signInForm.submit()
  } catch {
    // Validation and auth errors stay on the form.
  }
}, 'submitSignInForm')

export const SignInForm = reatomComponent(() => {
  const signInSubmitError = signInForm.submit.error()
  const isSignInPending = signInForm.submit.pending() > 0

  const handleSignInFormSubmit = wrap(
    (formEvent: React.FormEvent<HTMLFormElement>) => {
      formEvent.preventDefault()
      void submitSignInForm()
    },
  )

  return (
    <form onSubmit={handleSignInFormSubmit}>
      <FieldSet disabled={isSignInPending}>
        <FieldGroup>
          <TextField
            field={signInForm.fields.email}
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
          />
          <TextField
            field={signInForm.fields.password}
            label="Password"
            type="password"
            name="password"
            autoComplete="current-password"
          />
          <FieldError>{signInSubmitError?.message}</FieldError>
          <Button type="submit" disabled={isSignInPending}>
            {isSignInPending ? 'Signing in…' : 'Sign in'}
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}, 'SignInForm')
