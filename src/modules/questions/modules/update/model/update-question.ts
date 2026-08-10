import { action, atom, effect, reatomForm, withAsync, wrap } from '@reatom/core'
import { toast } from 'sonner'

import { api } from '@/common/api'
import {
  readApiErrorMessage,
  readUnknownErrorMessage,
} from '@/common/lib/error-message'

import type { Question } from '../../../model/questions'
import { replaceQuestion } from '../../../model/questions'

export const updateQuestionId = atom<string | null>(null, 'updateQuestionId')

export const updateQuestionForm = reatomForm(
  {
    question: '',
    answer: '',
  },
  {
    name: 'updateQuestionForm',
    validateOnBlur: true,
    resetOnSubmit: false,
    validateBeforeSubmit: ({ question, answer }) => {
      if (!question.trim()) {
        throw new Error('Question is required')
      }

      if (!answer.trim()) {
        throw new Error('Answer is required')
      }
    },
    onSubmit: async ({ question, answer }) => {
      const questionId = updateQuestionId()

      if (!questionId) {
        const errorMessage = 'No question selected for update'

        toast.error(errorMessage)

        throw new Error(errorMessage)
      }

      try {
        const response = await api.questions[':id'].$put({
          param: {
            id: questionId,
          },
          json: {
            question: question.trim(),
            answer: answer.trim(),
          },
        })

        if (!response.ok) {
          const errorPayload = await response.json().catch(() => null)
          const errorMessage = readApiErrorMessage(
            errorPayload,
            'Failed to update question',
          )

          throw new Error(errorMessage)
        }

        const responsePayload = await response.json()
        const updatedQuestion = responsePayload.question as Question
        const updatedQuestionTitle = question.trim()

        replaceQuestion(updatedQuestion)

        updateQuestionId.set(null)

        updateQuestionForm.reset()

        toast.success(`“${updatedQuestionTitle}” updated`, {
          classNames: {
            title: 'line-clamp-2 min-w-0 break-all whitespace-normal',
          },
        })
      } catch (error) {
        const errorMessage = readUnknownErrorMessage(
          error,
          'Failed to update question',
        )

        toast.error(errorMessage)

        throw error instanceof Error ? error : new Error(errorMessage)
      }
    },
  },
)

export const loadUpdateQuestion = action(async () => {
  const questionId = updateQuestionId()

  if (!questionId) {
    throw new Error('No question selected for update')
  }

  const response = await api.questions[':id'].$get({
    param: {
      id: questionId,
    },
  })

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => null)
    const errorMessage = readApiErrorMessage(
      errorPayload,
      'Failed to load question',
    )

    throw new Error(errorMessage)
  }

  const responsePayload = await response.json()
  const question = responsePayload.question as Question

  updateQuestionForm.reset({
    question: question.question,
    answer: question.answer,
  })

  return question
}, 'loadUpdateQuestion').extend(withAsync())

export const openUpdateQuestionDialog = action((questionId: string) => {
  updateQuestionForm.reset()

  loadUpdateQuestion.error.set(undefined)

  updateQuestionId.set(questionId)
}, 'openUpdateQuestionDialog')

export const closeUpdateQuestionDialog = action(() => {
  updateQuestionId.set(null)

  updateQuestionForm.reset()

  loadUpdateQuestion.error.set(undefined)
}, 'closeUpdateQuestionDialog')

export const setUpdateQuestionDialogOpen = action(
  (isOpen: boolean, isBusy: boolean) => {
    if (!isOpen && !isBusy) {
      closeUpdateQuestionDialog()
    }
  },
  'setUpdateQuestionDialogOpen',
)

export const submitUpdateQuestionForm = action(async () => {
  if (!updateQuestionForm.focus().dirty) {
    return
  }

  try {
    await updateQuestionForm.submit()
  } catch {
    // Validation stays on the form; API errors also toast.
  }
}, 'submitUpdateQuestionForm')

effect(async () => {
  if (!updateQuestionId()) {
    return
  }

  try {
    await wrap(loadUpdateQuestion())
  } catch (error) {
    const errorMessage = readUnknownErrorMessage(
      error,
      'Failed to load question',
    )

    toast.error(errorMessage)

    updateQuestionId.set(null)

    updateQuestionForm.reset()
  }
}, 'loadUpdateQuestionOnOpen')
