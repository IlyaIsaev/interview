import { reatomForm, wrap } from '@reatom/core'
import { reatomComponent } from '@reatom/react'

import { Button } from '@/common/components/ui/button'
import {
  FieldError,
  FieldGroup,
  FieldSet,
} from '@/common/components/ui/field'
import { homeRoute } from '@/common/routes'

import { signUp } from './client'
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
      const { error } = await signUp.email({
        name,
        email,
        password,
      })

      if (error) {
        throw new Error(error.message ?? 'Failed to sign up')
      }

      homeRoute.go()
    },
  },
)

export const SignUpForm = reatomComponent(() => {
  const submitError = signUpForm.submit.error()
  const isPending = signUpForm.submit.pending() > 0

  return (
    <form
      onSubmit={wrap(async (event) => {
        event.preventDefault()

        try {
          await signUpForm.submit()
        } catch {
          // Validation and auth errors stay on the form.
        }
      })}
    >
      <FieldSet disabled={isPending}>
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

          <FieldError>{submitError?.message}</FieldError>

          <Button type="submit" disabled={isPending}>
            {isPending ? 'Creating account…' : 'Sign up'}
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}, 'SignUpForm')
