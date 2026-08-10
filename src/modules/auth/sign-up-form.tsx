import { action, reatomForm, urlAtom, wrap } from '@reatom/core'
import { reatomComponent } from '@reatom/react'

import { signUp } from '@/common/auth'
import { Button } from '@/common/components/ui/button'
import { FieldError, FieldGroup, FieldSet } from '@/common/components/ui/field'

import { TextField } from './text-field'

export const signUpForm = reatomForm(
  {
    name: '',
    email: '',
    password: '',
  },
  {
    name: 'signUpForm',
    validateOnBlur: true,
    validateBeforeSubmit: ({ name, email, password }) => {
      if (!name.trim()) {
        throw new Error('Name is required')
      }

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
    onSubmit: async ({ name, email, password }) => {
      const { error: signUpError } = await signUp.email({
        name,
        email,
        password,
      })

      if (signUpError) {
        throw new Error(signUpError.message ?? 'Failed to sign up')
      }

      urlAtom.go('/')
    },
  },
)

export const submitSignUpForm = action(async () => {
  try {
    await signUpForm.submit()
  } catch {
    // Validation and auth errors stay on the form.
  }
}, 'submitSignUpForm')

export const SignUpForm = reatomComponent(() => {
  const signUpSubmitError = signUpForm.submit.error()
  const isSignUpPending = signUpForm.submit.pending() > 0

  const handleSignUpFormSubmit = wrap(
    (formEvent: React.FormEvent<HTMLFormElement>) => {
      formEvent.preventDefault()
      void submitSignUpForm()
    },
  )

  return (
    <form onSubmit={handleSignUpFormSubmit}>
      <FieldSet disabled={isSignUpPending}>
        <FieldGroup>
          <TextField
            field={signUpForm.fields.name}
            label="Name"
            type="text"
            name="name"
            autoComplete="name"
          />
          <TextField
            field={signUpForm.fields.email}
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
          />
          <TextField
            field={signUpForm.fields.password}
            label="Password"
            type="password"
            name="password"
            autoComplete="new-password"
          />
          <FieldError>{signUpSubmitError?.message}</FieldError>
          <Button type="submit" disabled={isSignUpPending}>
            {isSignUpPending ? 'Creating account…' : 'Sign up'}
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}, 'SignUpForm')
