import {
  action,
  atom,
  computed,
  effect,
  reatomForm,
  withAsync,
  wrap,
} from '@reatom/core'
import { toast } from 'sonner'
import * as v from 'valibot'

import { readUnknownErrorMessage } from '@/common/lib/error-message'

import { fetchQuestion, updateQuestion } from '../../../api/questions-api'
import { loadQuestionBank, replaceQuestion } from '../../../model/questions'
import { setShownQuestion, shownQuestion } from '../../../model/shown-question'

const UpdateQuestionSchema = v.object({
  question: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(1, 'Question is required'),
  ),
  answer: v.pipe(v.string(), v.trim(), v.minLength(1, 'Answer is required')),
})

export const updateQuestionId = atom<string | null>(null, 'updateQuestionId')

export const updateQuestionForm = reatomForm(
  {
    question: '',
    answer: '',
  },
  {
    name: 'updateQuestionForm',
    schema: UpdateQuestionSchema,
    validateOnChange: true,
    resetOnSubmit: false,
    onSubmit: async ({ question, answer }) => {
      const questionId = updateQuestionId()
      const trimmedQuestion = question.trim()
      const trimmedAnswer = answer.trim()

      if (!questionId) {
        const errorMessage = 'No question selected for update'

        toast.error(errorMessage)

        throw new Error(errorMessage)
      }

      try {
        const updatedQuestion = await wrap(
          updateQuestion(questionId, trimmedQuestion, trimmedAnswer),
        )
        const updatedQuestionTitle = trimmedQuestion

        replaceQuestion(updatedQuestion)

        if (shownQuestion()?.id === updatedQuestion.id) {
          setShownQuestion(updatedQuestion)
        }

        try {
          await loadQuestionBank()
        } catch {
          // Update succeeded; the sidebar will retry on the next open.
        }

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

  const question = await wrap(fetchQuestion(questionId))

  if (!question) {
    throw new Error('Failed to load question')
  }

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

export const isUpdateQuestionFormValid = computed(() => {
  return v.safeParse(UpdateQuestionSchema, updateQuestionForm()).success
}, 'isUpdateQuestionFormValid')

export const submitUpdateQuestionForm = action(async () => {
  if (!updateQuestionForm.focus().dirty || !isUpdateQuestionFormValid()) {
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
