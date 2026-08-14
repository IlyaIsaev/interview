import { action, computed, reatomForm, urlAtom } from '@reatom/core'
import * as v from 'valibot'

import { signUp } from './session'

const SignUpSchema = v.object({
  name: v.pipe(v.string(), v.trim(), v.minLength(1, 'Name is required')),
  email: v.pipe(v.string(), v.trim(), v.email('Enter a valid email')),
  password: v.pipe(
    v.string(),
    v.minLength(8, 'Password must be at least 8 characters'),
  ),
})

export const signUpForm = reatomForm(
  {
    name: '',
    email: '',
    password: '',
  },
  {
    name: 'signUpForm',
    schema: SignUpSchema,
    validateOnChange: true,
    onSubmit: async ({ name, email, password }) => {
      const { error: signUpError } = await signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      })

      if (signUpError) {
        throw new Error(signUpError.message ?? 'Failed to sign up')
      }

      urlAtom.go('/')
    },
  },
)

export const isSignUpFormValid = computed(() => {
  return v.safeParse(SignUpSchema, signUpForm()).success
}, 'isSignUpFormValid')

export const submitSignUpForm = action(async () => {
  if (!isSignUpFormValid()) {
    return
  }

  try {
    await signUpForm.submit()
  } catch {
    // Validation and auth errors stay on the form.
  }
}, 'submitSignUpForm')
