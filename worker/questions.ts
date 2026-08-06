import { desc, eq, ne, sql } from 'drizzle-orm'
import { Hono } from 'hono'
import { validator } from 'hono/validator'

import { createDb, questions } from '@/db'

import type { AuthEnv, AuthVariables } from './auth'

type QuestionBody = {
  question: string
  answer: string
}

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0

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

    if (!user) {
      return c.json({ error: 'Unauthorized' as const }, 401)
    }

    const db = createDb(c.env.interview)

    const rows = await db
      .select()
      .from(questions)
      .orderBy(desc(questions.createdAt))

    return c.json({ questions: rows }, 200)
  })
  .post('/api/questions', questionBodyValidator, async (c) => {
    const user = c.get('user')

    if (!user) {
      return c.json({ error: 'Unauthorized' as const }, 401)
    }

    const { question, answer } = c.req.valid('json')

    const db = createDb(c.env.interview)

    const id = crypto.randomUUID()

    const [created] = await db
      .insert(questions)
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

    if (!user) {
      return c.json({ error: 'Unauthorized' as const }, 401)
    }

    const exclude = c.req.query('exclude')
    const db = createDb(c.env.interview)

    const selectRandom = async (excludedId?: string) => {
      if (excludedId && isNonEmptyString(excludedId)) {
        const [row] = await db
          .select()
          .from(questions)
          .where(ne(questions.id, excludedId.trim()))
          .orderBy(sql`RANDOM()`)
          .limit(1)

        return row
      }

      const [row] = await db
        .select()
        .from(questions)
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

    if (!user) {
      return c.json({ error: 'Unauthorized' as const }, 401)
    }

    const id = c.req.param('id')

    if (!isNonEmptyString(id)) {
      return c.json({ error: 'Question id is required' as const }, 400)
    }

    const db = createDb(c.env.interview)

    const [row] = await db
      .select()
      .from(questions)
      .where(eq(questions.id, id.trim()))
      .limit(1)

    if (!row) {
      return c.json({ error: 'Question not found' as const }, 404)
    }

    return c.json({ question: row }, 200)
  })
  .put('/api/questions/:id', questionBodyValidator, async (c) => {
    const user = c.get('user')

    if (!user) {
      return c.json({ error: 'Unauthorized' as const }, 401)
    }

    const id = c.req.param('id')

    if (!isNonEmptyString(id)) {
      return c.json({ error: 'Question id is required' as const }, 400)
    }

    const { question, answer } = c.req.valid('json')

    const db = createDb(c.env.interview)

    const [updated] = await db
      .update(questions)
      .set({
        question,
        answer,
      })
      .where(eq(questions.id, id.trim()))
      .returning()

    if (!updated) {
      return c.json({ error: 'Question not found' as const }, 404)
    }

    return c.json({ question: updated }, 200)
  })
  .delete('/api/questions/:id', async (c) => {
    const user = c.get('user')

    if (!user) {
      return c.json({ error: 'Unauthorized' as const }, 401)
    }

    const id = c.req.param('id')

    if (!isNonEmptyString(id)) {
      return c.json({ error: 'Question id is required' as const }, 400)
    }

    const db = createDb(c.env.interview)

    const [deleted] = await db
      .delete(questions)
      .where(eq(questions.id, id.trim()))
      .returning()

    if (!deleted) {
      return c.json({ error: 'Question not found' as const }, 404)
    }

    return c.json({ question: deleted }, 200)
  })
