import { wrap } from '@reatom/core'
import { reatomComponent } from '@reatom/react'

import { Button } from '@/common/ui/button'
import { FieldError, FieldGroup, FieldSet } from '@/common/ui/field'
import { FormTextField } from '@/common/ui/form-text-field'

import {
  isSignInFormValid,
  signInForm,
  submitSignInForm,
} from '../model/sign-in-form'

export const SignInForm = reatomComponent(() => {
  const isSignInPending = !signInForm.submit.ready()
  const signInSubmitError = signInForm.submit.error()

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
          <FormTextField
            field={signInForm.fields.email}
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
          />
          <FormTextField
            field={signInForm.fields.password}
            label="Password"
            type="password"
            name="password"
            autoComplete="current-password"
          />
          <FieldError>{signInSubmitError?.message}</FieldError>
          <Button
            type="submit"
            disabled={isSignInPending || !isSignInFormValid()}
          >
            {isSignInPending ? 'Signing in…' : 'Sign in'}
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}, 'SignInForm')
