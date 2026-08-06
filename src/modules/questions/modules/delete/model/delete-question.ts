import { action, atom, effect, withAsync, wrap } from '@reatom/core'
import { toast } from 'sonner'

import { api } from '@/common/api'

import type { Question } from '../../../model/questions'
import { fetchQuestions } from '../../../model/questions'
import { clearReadQuestionIfId } from '../../read'

export const deleteQuestionId = atom<string | null>(null, 'deleteQuestionId')

export const deleteQuestionData = atom<Question | null>(null, 'deleteQuestionData')

export const loadDeleteQuestion = action(async () => {
  const id = deleteQuestionId()

  if (!id) {
    throw new Error('No question selected for deletion')
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

  deleteQuestionData.set(question)

  return question
}, 'loadDeleteQuestion').extend(withAsync())

export const openDeleteQuestionDialog = action((id: string) => {
  deleteQuestion.error.set(undefined)

  loadDeleteQuestion.error.set(undefined)

  deleteQuestionData.set(null)

  deleteQuestionId.set(id)
}, 'openDeleteQuestionDialog')

export const closeDeleteQuestionDialog = action(() => {
  deleteQuestionId.set(null)

  deleteQuestionData.set(null)

  deleteQuestion.error.set(undefined)

  loadDeleteQuestion.error.set(undefined)
}, 'closeDeleteQuestionDialog')

export const setDeleteQuestionDialogOpen = action(
  (open: boolean, isBusy: boolean) => {
    if (!open && !isBusy) {
      closeDeleteQuestionDialog()
    }
  },
  'setDeleteQuestionDialogOpen',
)

export const deleteQuestion = action(async () => {
  const id = deleteQuestionId()

  const loaded = deleteQuestionData()

  if (!id) {
    const message = 'No question selected for deletion'

    toast.error(message)

    throw new Error(message)
  }

  try {
    const response = await api.questions[':id'].$delete({
      param: {
        id,
      },
    })

    if (!response.ok) {
      const data = await response.json().catch(() => null)

      const message =
        data && 'error' in data && typeof data.error === 'string'
          ? data.error
          : 'Failed to delete question'

      throw new Error(message)
    }

    const deletedQuestion = loaded?.question ?? 'Question'

    await fetchQuestions()

    await clearReadQuestionIfId(id)

    deleteQuestionId.set(null)

    deleteQuestionData.set(null)

    toast.success(`“${deletedQuestion}” deleted`, {
      classNames: {
        title: 'line-clamp-2 min-w-0 break-all whitespace-normal',
      },
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to delete question'

    toast.error(message)

    throw error instanceof Error ? error : new Error(message)
  }
}, 'deleteQuestion').extend(withAsync())

export const submitDeleteQuestion = action(async () => {
  try {
    await deleteQuestion()
  } catch {
    // Error toast is shown by deleteQuestion.
  }
}, 'submitDeleteQuestion')

effect(async () => {
  if (!deleteQuestionId()) {
    return
  }

  try {
    await wrap(loadDeleteQuestion())
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to load question'

    toast.error(message)

    deleteQuestionId.set(null)

    deleteQuestionData.set(null)
  }
}, 'loadDeleteQuestionOnOpen')
