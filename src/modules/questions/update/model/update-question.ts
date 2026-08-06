import { action, atom, effect, reatomForm, withAsync, wrap } from '@reatom/core'
import { toast } from 'sonner'

import { api } from '@/common/api'

import type { Question } from '../../model/questions'
import { fetchQuestions } from '../../model/questions'

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
      const id = updateQuestionId()

      if (!id) {
        const message = 'No question selected for update'

        toast.error(message)

        throw new Error(message)
      }

      try {
        const response = await api.questions[':id'].$put({
          param: {
            id,
          },
          json: {
            question: question.trim(),
            answer: answer.trim(),
          },
        })

        if (!response.ok) {
          const data = await response.json().catch(() => null)
          const message =
            data && 'error' in data && typeof data.error === 'string'
              ? data.error
              : 'Failed to update question'

          throw new Error(message)
        }

        const savedQuestion = question.trim()

        await fetchQuestions()
        updateQuestionId.set(null)
        updateQuestionForm.reset()
        toast.success(`“${savedQuestion}” updated`, {
          classNames: {
            title: 'line-clamp-2 min-w-0 break-all whitespace-normal',
          },
        })
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Failed to update question'

        toast.error(message)

        throw error instanceof Error ? error : new Error(message)
      }
    },
  },
)

export const loadUpdateQuestion = action(async () => {
  const id = updateQuestionId()

  if (!id) {
    throw new Error('No question selected for update')
  }

  const response = await api.questions[':id'].$get({
    param: {
      id,
    },
  })

  if (!response.ok) {
    const data = await response.json().catch(() => null)
    const message =
      data && 'error' in data && typeof data.error === 'string'
        ? data.error
        : 'Failed to load question'

    throw new Error(message)
  }

  const data = await response.json()
  const question = data.question as Question

  updateQuestionForm.reset({
    question: question.question,
    answer: question.answer,
  })

  return question
}, 'loadUpdateQuestion').extend(withAsync())

export const openUpdateQuestionDialog = action((id: string) => {
  updateQuestionForm.reset()
  loadUpdateQuestion.error.set(undefined)
  updateQuestionId.set(id)
}, 'openUpdateQuestionDialog')

export const closeUpdateQuestionDialog = action(() => {
  updateQuestionId.set(null)
  updateQuestionForm.reset()
  loadUpdateQuestion.error.set(undefined)
}, 'closeUpdateQuestionDialog')

effect(async () => {
  if (!updateQuestionId()) {
    return
  }

  try {
    await wrap(loadUpdateQuestion())
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to load question'

    toast.error(message)
    updateQuestionId.set(null)
    updateQuestionForm.reset()
  }
}, 'loadUpdateQuestionOnOpen')
