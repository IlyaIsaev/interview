import { wrap } from '@reatom/core'
import { reatomComponent } from '@reatom/react'

import { Button } from '@/common/ui/button'
import { FieldError, FieldGroup, FieldSet } from '@/common/ui/field'
import { FormTextField } from '@/common/ui/form-text-field'

import {
  isSignUpFormValid,
  signUpForm,
  submitSignUpForm,
} from '../model/sign-up-form'

export const SignUpForm = reatomComponent(() => {
  const isSignUpPending = !signUpForm.submit.ready()
  const signUpSubmitError = signUpForm.submit.error()

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
          <FormTextField
            field={signUpForm.fields.name}
            label="Name"
            type="text"
            name="name"
            autoComplete="name"
          />
          <FormTextField
            field={signUpForm.fields.email}
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
          />
          <FormTextField
            field={signUpForm.fields.password}
            label="Password"
            type="password"
            name="password"
            autoComplete="new-password"
          />
          <FieldError>{signUpSubmitError?.message}</FieldError>
          <Button
            type="submit"
            disabled={isSignUpPending || !isSignUpFormValid()}
          >
            {isSignUpPending ? 'Creating account…' : 'Sign up'}
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}, 'SignUpForm')
