import { action, computed, reatomForm, wrap } from '@reatom/core'
import { toast } from 'sonner'
import * as v from 'valibot'

import { readUnknownErrorMessage } from '@/common/lib/error-message'

import { createQuestion } from '../../../api/questions-api'
import { loadQuestionBank, prependQuestion } from '../../../model/questions'
import { showCreatedQuestion } from '../../../model/show-created-question'
import { createQuestionDialogOpen } from './dialog-open'

const CreateQuestionSchema = v.object({
  question: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(1, 'Question is required'),
  ),
  answer: v.pipe(v.string(), v.trim(), v.minLength(1, 'Answer is required')),
})

export const createQuestionForm = reatomForm(
  {
    question: '',
    answer: '',
  },
  {
    name: 'createQuestionForm',
    schema: CreateQuestionSchema,
    validateOnChange: true,
    resetOnSubmit: true,
    onSubmit: async ({ question, answer }) => {
      const trimmedQuestion = question.trim()
      const trimmedAnswer = answer.trim()

      try {
        const createdQuestion = await wrap(
          createQuestion(trimmedQuestion, trimmedAnswer),
        )
        const createdQuestionTitle = createdQuestion.question

        prependQuestion(createdQuestion)

        try {
          await loadQuestionBank()
        } catch {
          // Create succeeded; the sidebar will retry on the next open.
        }

        createQuestionDialogOpen.setFalse()

        showCreatedQuestion(createdQuestion)

        toast.success(`“${createdQuestionTitle}” created`, {
          classNames: {
            title: 'line-clamp-2 min-w-0 break-all whitespace-normal',
          },
        })
      } catch (error) {
        const errorMessage = readUnknownErrorMessage(
          error,
          'Failed to save question',
        )

        toast.error(errorMessage)

        throw error instanceof Error ? error : new Error(errorMessage)
      }
    },
  },
)

export const closeCreateQuestionDialog = action(() => {
  createQuestionDialogOpen.setFalse()

  createQuestionForm.reset()
}, 'closeCreateQuestionDialog')

export const setCreateQuestionDialogOpen = action((isOpen: boolean) => {
  createQuestionDialogOpen.set(isOpen)

  if (!isOpen) {
    createQuestionForm.reset()
  }
}, 'setCreateQuestionDialogOpen')

export const isCreateQuestionFormValid = computed(() => {
  return v.safeParse(CreateQuestionSchema, createQuestionForm()).success
}, 'isCreateQuestionFormValid')

export const submitCreateQuestionForm = action(async () => {
  if (!isCreateQuestionFormValid()) {
    return
  }

  try {
    await createQuestionForm.submit()
  } catch {
    // Validation stays on the form; API errors also toast.
  }
}, 'submitCreateQuestionForm')
