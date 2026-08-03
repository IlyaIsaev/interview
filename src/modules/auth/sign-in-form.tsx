import { reatomForm, wrap } from '@reatom/core'
import { reatomComponent } from '@reatom/react'

import { Button } from '@/common/components/ui/button'
import {
  FieldError,
  FieldGroup,
  FieldSet,
} from '@/common/components/ui/field'
import { homeRoute } from '@/common/routes'

import { signIn } from './client'
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
      const { error } = await signIn.email({
        email,
        password,
      })

      if (error) {
        throw new Error(error.message ?? 'Failed to sign in')
      }

      homeRoute.go()
    },
  },
)

export const SignInForm = reatomComponent(() => {
  const submitError = signInForm.submit.error()
  const isPending = signInForm.submit.pending() > 0

  return (
    <form
      onSubmit={wrap(async (event) => {
        event.preventDefault()

        try {
          await signInForm.submit()
        } catch {
          // Validation and auth errors stay on the form.
        }
      })}
    >
      <FieldSet disabled={isPending}>
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

          <FieldError>{submitError?.message}</FieldError>

          <Button type="submit" disabled={isPending}>
            {isPending ? 'Signing in…' : 'Sign in'}
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}, 'SignInForm')
