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

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0

const getQuestionsTable = (user: AuthVariables['user']) =>
  user ? questions : demoQuestions

const questionBodyValidator = validator('json', (value, c) => {
  if (!value || typeof value !== 'object') {
    return c.json({ error: 'Invalid JSON body' as const }, 400)
  }

  const body = value as {
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
    const table = getQuestionsTable(user)
    const db = createDb(c.env.interview)

    const rows = await db
      .select()
      .from(table)
      .orderBy(desc(table.createdAt))

    return c.json({ questions: rows }, 200)
  })
  .post('/api/questions', questionBodyValidator, async (c) => {
    const user = c.get('user')
    const table = getQuestionsTable(user)
    const { question, answer } = c.req.valid('json')
    const db = createDb(c.env.interview)

    // Demo bank is shared and unbounded otherwise — cap create for logged-out users.
    if (!user) {
      const [result] = await db
        .select({ value: count() })
        .from(demoQuestions)

      if ((result?.value ?? 0) >= DEMO_QUESTIONS_LIMIT) {
        return c.json(
          {
            error: `Demo mode allows up to ${DEMO_QUESTIONS_LIMIT} questions. Sign in to add more.`,
          },
          403,
        )
      }
    }

    const id = crypto.randomUUID()

    const [created] = await db
      .insert(table)
      .values({
        id,
        question,
        answer,
      })
      .returning()

    return c.json({ question: created }, 201)
  })
  .get('/api/questions/random', async (c) => {
    const user = c.get('user')
    const table = getQuestionsTable(user)
    const exclude = c.req.query('exclude')
    const db = createDb(c.env.interview)

    const selectRandom = async (excludedId?: string) => {
      if (excludedId && isNonEmptyString(excludedId)) {
        const [row] = await db
          .select()
          .from(table)
          .where(ne(table.id, excludedId.trim()))
          .orderBy(sql`RANDOM()`)
          .limit(1)

        return row
      }

      const [row] = await db
        .select()
        .from(table)
        .orderBy(sql`RANDOM()`)
        .limit(1)

      return row
    }

    const excludedId =
      exclude && isNonEmptyString(exclude) ? exclude.trim() : undefined

    const preferred = await selectRandom(excludedId)

    if (preferred) {
      return c.json({ question: preferred }, 200)
    }

    if (excludedId) {
      const fallback = await selectRandom()

      if (fallback) {
        return c.json({ question: fallback }, 200)
      }
    }

    return c.json({ error: 'No questions found' as const }, 404)
  })
  .get('/api/questions/:id', async (c) => {
    const user = c.get('user')
    const table = getQuestionsTable(user)
    const id = c.req.param('id')

    if (!isNonEmptyString(id)) {
      return c.json({ error: 'Question id is required' as const }, 400)
    }

    const db = createDb(c.env.interview)

    const [row] = await db
      .select()
      .from(table)
      .where(eq(table.id, id.trim()))
      .limit(1)

    if (!row) {
      return c.json({ error: 'Question not found' as const }, 404)
    }

    return c.json({ question: row }, 200)
  })
  .put('/api/questions/:id', questionBodyValidator, async (c) => {
    const user = c.get('user')
    const table = getQuestionsTable(user)
    const id = c.req.param('id')

    if (!isNonEmptyString(id)) {
      return c.json({ error: 'Question id is required' as const }, 400)
    }

    const { question, answer } = c.req.valid('json')
    const db = createDb(c.env.interview)

    const [updated] = await db
      .update(table)
      .set({
        question,
        answer,
      })
      .where(eq(table.id, id.trim()))
      .returning()

    if (!updated) {
      return c.json({ error: 'Question not found' as const }, 404)
    }

    return c.json({ question: updated }, 200)
  })
  .delete('/api/questions/:id', async (c) => {
    const user = c.get('user')
    const table = getQuestionsTable(user)
    const id = c.req.param('id')

    if (!isNonEmptyString(id)) {
      return c.json({ error: 'Question id is required' as const }, 400)
    }

    const db = createDb(c.env.interview)

    const [deleted] = await db
      .delete(table)
      .where(eq(table.id, id.trim()))
      .returning()

    if (!deleted) {
      return c.json({ error: 'Question not found' as const }, 404)
    }

    return c.json({ question: deleted }, 200)
  })
