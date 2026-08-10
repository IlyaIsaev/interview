import { count, desc, eq, ne, sql } from 'drizzle-orm'
import { Hono } from 'hono'
import { validator } from 'hono/validator'

import { createDb, demoQuestions, questions } from '@/db'

import type { AuthEnv, AuthVariables } from './auth'

/** Max questions allowed in the shared demo bank (logged-out mode). */
export const DEMO_QUESTIONS_LIMIT = 30

type QuestionBody = {
  question: string
  answer: string
}

const isNonEmptyString = (candidate: unknown): candidate is string =>
  typeof candidate === 'string' && candidate.trim().length > 0

const getQuestionsTableForUser = (user: AuthVariables['user']) =>
  user ? questions : demoQuestions

const questionBodyValidator = validator('json', (requestBody, c) => {
  if (!requestBody || typeof requestBody !== 'object') {
    return c.json({ error: 'Invalid JSON body' as const }, 400)
  }

  const body = requestBody as {
    question?: unknown
    answer?: unknown
  }

  if (!isNonEmptyString(body.question)) {
    return c.json({ error: 'Question is required' as const }, 400)
  }

  if (!isNonEmptyString(body.answer)) {
    return c.json({ error: 'Answer is required' as const }, 400)
  }

  return {
    question: body.question.trim(),
    answer: body.answer.trim(),
  } satisfies QuestionBody
})

export const app = new Hono<{ Bindings: AuthEnv; Variables: AuthVariables }>()
  .get('/api/questions', async (c) => {
    const user = c.get('user')
    const questionsTable = getQuestionsTableForUser(user)
    const db = createDb(c.env.interview)

    const questionRows = await db
      .select()
      .from(questionsTable)
      .orderBy(desc(questionsTable.createdAt))

    return c.json({ questions: questionRows }, 200)
  })
  .post('/api/questions', questionBodyValidator, async (c) => {
    const user = c.get('user')
    const questionsTable = getQuestionsTableForUser(user)
    const { question, answer } = c.req.valid('json')
    const db = createDb(c.env.interview)

    // Demo bank is shared and unbounded otherwise — cap create for logged-out users.
    if (!user) {
      const [demoQuestionCountRow] = await db
        .select({ value: count() })
        .from(demoQuestions)

      if ((demoQuestionCountRow?.value ?? 0) >= DEMO_QUESTIONS_LIMIT) {
        return c.json(
          {
            error: `Demo mode allows up to ${DEMO_QUESTIONS_LIMIT} questions. Sign in to add more.`,
          },
          403,
        )
      }
    }

    const questionId = crypto.randomUUID()

    const [createdQuestion] = await db
      .insert(questionsTable)
      .values({
        id: questionId,
        question,
        answer,
      })
      .returning()

    return c.json({ question: createdQuestion }, 201)
  })
  .get('/api/questions/random', async (c) => {
    const user = c.get('user')
    const questionsTable = getQuestionsTableForUser(user)
    const excludeQuery = c.req.query('exclude')
    const db = createDb(c.env.interview)

    const selectRandomQuestion = async (excludedQuestionId?: string) => {
      if (excludedQuestionId && isNonEmptyString(excludedQuestionId)) {
        const [questionRow] = await db
          .select()
          .from(questionsTable)
          .where(ne(questionsTable.id, excludedQuestionId.trim()))
          .orderBy(sql`RANDOM()`)
          .limit(1)

        return questionRow
      }

      const [questionRow] = await db
        .select()
        .from(questionsTable)
        .orderBy(sql`RANDOM()`)
        .limit(1)

      return questionRow
    }

    const excludedQuestionId =
      excludeQuery && isNonEmptyString(excludeQuery)
        ? excludeQuery.trim()
        : undefined

    const preferredQuestion = await selectRandomQuestion(excludedQuestionId)

    if (preferredQuestion) {
      return c.json({ question: preferredQuestion }, 200)
    }

    if (excludedQuestionId) {
      const fallbackQuestion = await selectRandomQuestion()

      if (fallbackQuestion) {
        return c.json({ question: fallbackQuestion }, 200)
      }
    }

    return c.json({ error: 'No questions found' as const }, 404)
  })
  .get('/api/questions/:id', async (c) => {
    const user = c.get('user')
    const questionsTable = getQuestionsTableForUser(user)
    const questionId = c.req.param('id')

    if (!isNonEmptyString(questionId)) {
      return c.json({ error: 'Question id is required' as const }, 400)
    }

    const db = createDb(c.env.interview)

    const [questionRow] = await db
      .select()
      .from(questionsTable)
      .where(eq(questionsTable.id, questionId.trim()))
      .limit(1)

    if (!questionRow) {
      return c.json({ error: 'Question not found' as const }, 404)
    }

    return c.json({ question: questionRow }, 200)
  })
  .put('/api/questions/:id', questionBodyValidator, async (c) => {
    const user = c.get('user')
    const questionsTable = getQuestionsTableForUser(user)
    const questionId = c.req.param('id')

    if (!isNonEmptyString(questionId)) {
      return c.json({ error: 'Question id is required' as const }, 400)
    }

    const { question, answer } = c.req.valid('json')
    const db = createDb(c.env.interview)

    const [updatedQuestion] = await db
      .update(questionsTable)
      .set({
        question,
        answer,
      })
      .where(eq(questionsTable.id, questionId.trim()))
      .returning()

    if (!updatedQuestion) {
      return c.json({ error: 'Question not found' as const }, 404)
    }

    return c.json({ question: updatedQuestion }, 200)
  })
  .delete('/api/questions/:id', async (c) => {
    const user = c.get('user')
    const questionsTable = getQuestionsTableForUser(user)
    const questionId = c.req.param('id')

    if (!isNonEmptyString(questionId)) {
      return c.json({ error: 'Question id is required' as const }, 400)
    }

    const db = createDb(c.env.interview)

    const [deletedQuestion] = await db
      .delete(questionsTable)
      .where(eq(questionsTable.id, questionId.trim()))
      .returning()

    if (!deletedQuestion) {
      return c.json({ error: 'Question not found' as const }, 404)
    }

    return c.json({ question: deletedQuestion }, 200)
  })
