import { action, computed, reatomForm, urlAtom } from '@reatom/core'
import * as v from 'valibot'

import { signIn } from './session'

const SignInSchema = v.object({
  email: v.pipe(v.string(), v.trim(), v.email('Enter a valid email')),
  password: v.pipe(
    v.string(),
    v.minLength(8, 'Password must be at least 8 characters'),
  ),
})

export const signInForm = reatomForm(
  {
    email: '',
    password: '',
  },
  {
    name: 'signInForm',
    schema: SignInSchema,
    validateOnChange: true,
    onSubmit: async ({ email, password }) => {
      const { error: signInError } = await signIn.email({
        email: email.trim(),
        password,
      })

      if (signInError) {
        throw new Error(signInError.message ?? 'Failed to sign in')
      }

      urlAtom.go('/')
    },
  },
)

export const isSignInFormValid = computed(() => {
  return v.safeParse(SignInSchema, signInForm()).success
}, 'isSignInFormValid')

export const submitSignInForm = action(async () => {
  if (!isSignInFormValid()) {
    return
  }

  try {
    await signInForm.submit()
  } catch {
    // Validation and auth errors stay on the form.
  }
}, 'submitSignInForm')
