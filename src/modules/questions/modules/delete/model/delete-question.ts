import { action, atom, effect, withAsync, wrap } from '@reatom/core'
import { toast } from 'sonner'

import { api } from '@/common/api'
import {
  readApiErrorMessage,
  readUnknownErrorMessage,
} from '@/common/lib/error-message'

import type { Question } from '../../../model/questions'
import { loadQuestionBank, removeQuestion } from '../../../model/questions'
import { clearReadQuestionIfId } from '../../read'

export const deleteQuestionId = atom<string | null>(null, 'deleteQuestionId')

export const questionPendingDeletion = atom<Question | null>(
  null,
  'questionPendingDeletion',
)

export const loadDeleteQuestion = action(async () => {
  const questionId = deleteQuestionId()

  if (!questionId) {
    throw new Error('No question selected for deletion')
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

  questionPendingDeletion.set(question)

  return question
}, 'loadDeleteQuestion').extend(withAsync())

export const openDeleteQuestionDialog = action((questionId: string) => {
  deleteQuestion.error.set(undefined)

  loadDeleteQuestion.error.set(undefined)

  questionPendingDeletion.set(null)

  deleteQuestionId.set(questionId)
}, 'openDeleteQuestionDialog')

export const closeDeleteQuestionDialog = action(() => {
  deleteQuestionId.set(null)

  questionPendingDeletion.set(null)

  deleteQuestion.error.set(undefined)

  loadDeleteQuestion.error.set(undefined)
}, 'closeDeleteQuestionDialog')

export const setDeleteQuestionDialogOpen = action(
  (isOpen: boolean, isBusy: boolean) => {
    if (!isOpen && !isBusy) {
      closeDeleteQuestionDialog()
    }
  },
  'setDeleteQuestionDialogOpen',
)

export const deleteQuestion = action(async () => {
  const questionId = deleteQuestionId()
  const questionToDelete = questionPendingDeletion()

  if (!questionId) {
    const errorMessage = 'No question selected for deletion'

    toast.error(errorMessage)

    throw new Error(errorMessage)
  }

  try {
    const response = await api.questions[':id'].$delete({
      param: {
        id: questionId,
      },
    })

    if (!response.ok) {
      const errorPayload = await response.json().catch(() => null)
      const errorMessage = readApiErrorMessage(
        errorPayload,
        'Failed to delete question',
      )

      throw new Error(errorMessage)
    }

    const deletedQuestionTitle = questionToDelete?.question ?? 'Question'

    removeQuestion(questionId)

    try {
      await loadQuestionBank()
    } catch {
      // Delete succeeded; the sidebar will retry on the next open.
    }

    await clearReadQuestionIfId(questionId)

    deleteQuestionId.set(null)

    questionPendingDeletion.set(null)

    toast.success(`“${deletedQuestionTitle}” deleted`, {
      classNames: {
        title: 'line-clamp-2 min-w-0 break-all whitespace-normal',
      },
    })
  } catch (error) {
    const errorMessage = readUnknownErrorMessage(
      error,
      'Failed to delete question',
    )

    toast.error(errorMessage)

    throw error instanceof Error ? error : new Error(errorMessage)
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
    const errorMessage = readUnknownErrorMessage(
      error,
      'Failed to load question',
    )

    toast.error(errorMessage)

    deleteQuestionId.set(null)

    questionPendingDeletion.set(null)
  }
}, 'loadDeleteQuestionOnOpen')
