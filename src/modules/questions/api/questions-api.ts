import * as v from 'valibot'

import { api } from '@/common/api'
import { readApiErrorMessage } from '@/common/lib/error-message'

import {
  QuestionResponseSchema,
  QuestionsListResponseSchema,
  RandomQuestionIdResponseSchema,
  type Question,
} from '../model/question'

const ensureQuestionsResponseOk = async (
  response: Response,
  fallbackMessage: string,
): Promise<void> => {
  if (response.ok) {
    return
  }

  const errorBody = await response.json().catch(() => null)

  throw new Error(readApiErrorMessage(errorBody, fallbackMessage))
}

export const fetchQuestions = async (
  searchQuery?: string,
): Promise<Question[]> => {
  const response = searchQuery
    ? await api.questions.$get({
        query: {
          search: searchQuery,
        },
      })
    : await api.questions.$get()

  await ensureQuestionsResponseOk(response, 'Failed to load questions')

  const questionsListResponse = v.parse(
    QuestionsListResponseSchema,
    await response.json(),
  )

  return questionsListResponse.questions
}

export const fetchQuestion = async (
  questionId: string,
): Promise<Question | null> => {
  const response = await api.questions[':id'].$get({
    param: {
      id: questionId,
    },
  })

  if (!response.ok) {
    if (response.status === 404) {
      return null
    }

    const errorBody = await response.json().catch(() => null)

    throw new Error(readApiErrorMessage(errorBody, 'Failed to load question'))
  }

  const questionResponse = v.parse(
    QuestionResponseSchema,
    await response.json(),
  )

  return questionResponse.question
}

export const fetchRandomQuestionId = async (
  excludeQuestionId?: string,
): Promise<string | null> => {
  const response = excludeQuestionId
    ? await api.questions.random.$get({
        query: {
          exclude: excludeQuestionId,
        },
      })
    : await api.questions.random.$get()

  if (!response.ok) {
    if (response.status === 404) {
      return null
    }

    throw new Error('Failed to load question')
  }

  const randomQuestionIdResponse = v.parse(
    RandomQuestionIdResponseSchema,
    await response.json(),
  )

  return randomQuestionIdResponse.questionId
}

export const createQuestion = async (
  question: string,
  answer: string,
): Promise<Question> => {
  const response = await api.questions.$post({
    json: {
      question,
      answer,
    },
  })

  await ensureQuestionsResponseOk(response, 'Failed to save question')

  const createdQuestionResponse = v.parse(
    QuestionResponseSchema,
    await response.json(),
  )

  return createdQuestionResponse.question
}

export const updateQuestion = async (
  questionId: string,
  question: string,
  answer: string,
): Promise<Question> => {
  const response = await api.questions[':id'].$put({
    param: {
      id: questionId,
    },
    json: {
      question,
      answer,
    },
  })

  await ensureQuestionsResponseOk(response, 'Failed to update question')

  const updatedQuestionResponse = v.parse(
    QuestionResponseSchema,
    await response.json(),
  )

  return updatedQuestionResponse.question
}

export const deleteQuestionById = async (questionId: string): Promise<void> => {
  const response = await api.questions[':id'].$delete({
    param: {
      id: questionId,
    },
  })

  await ensureQuestionsResponseOk(response, 'Failed to delete question')
}
