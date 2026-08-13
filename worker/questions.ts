import { and, count, desc, eq, like, ne, or, sql } from 'drizzle-orm'
import { Hono } from 'hono'
import { validator } from 'hono/validator'

import { createDb, demoQuestions, questions } from '@/db'

import type { AuthEnv, AuthVariables } from './auth'
import { resolveDemoProfile, type DemoProfile } from './demo-profile'

/** Max questions allowed per demo profile (logged-out mode). */
export const DEMO_QUESTIONS_LIMIT = 30

type QuestionBody = {
  question: string
  answer: string
}

type QuestionsVariables = AuthVariables & {
  demoProfile: DemoProfile | null
}

type QuestionsEnv = {
  Bindings: AuthEnv
  Variables: QuestionsVariables
}

const isNonEmptyString = (candidate: unknown): candidate is string =>
  typeof candidate === 'string' && candidate.trim().length > 0

/** Escape `%` and `_` so user input is treated as a literal LIKE substring. */
const escapeSqlLikePattern = (rawPattern: string): string =>
  rawPattern
    .replaceAll('\\', '\\\\')
    .replaceAll('%', '\\%')
    .replaceAll('_', '\\_')

const buildQuestionSearchLikePattern = (
  searchQuery: string | undefined,
): string | null => {
  if (!searchQuery) {
    return null
  }

  const trimmedSearchQuery = searchQuery.trim()

  if (!trimmedSearchQuery) {
    return null
  }

  return `%${escapeSqlLikePattern(trimmedSearchQuery)}%`
}

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

const toPublicQuestion = <T extends { demoProfileId?: string }>(
  questionRow: T,
) => {
  const { demoProfileId: _demoProfileId, ...publicQuestion } = questionRow

  return publicQuestion
}

const getResolvedDemoProfile = (
  demoProfile: DemoProfile | null,
): DemoProfile => {
  if (!demoProfile) {
    throw new Error('Demo profile is required for unregistered requests')
  }

  return demoProfile
}

export const app = new Hono<QuestionsEnv>()
  .use(async (c, next) => {
    const user = c.get('user')

    if (user) {
      c.set('demoProfile', null)
      await next()

      return
    }

    const db = createDb(c.env.interview)
    const demoProfile = await resolveDemoProfile(c, db)

    c.set('demoProfile', demoProfile)
    await next()
  })
  .get('/api/questions', async (c) => {
    const user = c.get('user')
    const db = createDb(c.env.interview)
    const searchLikePattern = buildQuestionSearchLikePattern(
      c.req.query('search'),
    )

    if (user) {
      const questionRows = await db
        .select()
        .from(questions)
        .where(
          searchLikePattern
            ? or(
                like(questions.question, searchLikePattern),
                like(questions.answer, searchLikePattern),
              )
            : undefined,
        )
        .orderBy(desc(questions.createdAt))

      return c.json({ questions: questionRows }, 200)
    }

    const demoProfile = getResolvedDemoProfile(c.get('demoProfile'))

    const questionRows = await db
      .select()
      .from(demoQuestions)
      .where(
        and(
          eq(demoQuestions.demoProfileId, demoProfile.id),
          searchLikePattern
            ? or(
                like(demoQuestions.question, searchLikePattern),
                like(demoQuestions.answer, searchLikePattern),
              )
            : undefined,
        ),
      )
      .orderBy(desc(demoQuestions.createdAt))

    return c.json({ questions: questionRows.map(toPublicQuestion) }, 200)
  })
  .post('/api/questions', questionBodyValidator, async (c) => {
    const user = c.get('user')
    const { question, answer } = c.req.valid('json')
    const db = createDb(c.env.interview)
    const questionId = crypto.randomUUID()

    if (user) {
      const [createdQuestion] = await db
        .insert(questions)
        .values({
          id: questionId,
          question,
          answer,
        })
        .returning()

      return c.json({ question: createdQuestion }, 201)
    }

    const demoProfile = getResolvedDemoProfile(c.get('demoProfile'))

    const [demoQuestionCountRow] = await db
      .select({ value: count() })
      .from(demoQuestions)
      .where(eq(demoQuestions.demoProfileId, demoProfile.id))

    if ((demoQuestionCountRow?.value ?? 0) >= DEMO_QUESTIONS_LIMIT) {
      return c.json(
        {
          error: `Demo mode allows up to ${DEMO_QUESTIONS_LIMIT} questions. Sign in to add more.`,
        },
        403,
      )
    }

    const [createdQuestion] = await db
      .insert(demoQuestions)
      .values({
        id: questionId,
        demoProfileId: demoProfile.id,
        question,
        answer,
      })
      .returning()

    return c.json({ question: toPublicQuestion(createdQuestion) }, 201)
  })
  .get('/api/questions/random', async (c) => {
    const user = c.get('user')
    const excludeQuery = c.req.query('exclude')
    const db = createDb(c.env.interview)

    const excludedQuestionId =
      excludeQuery && isNonEmptyString(excludeQuery)
        ? excludeQuery.trim()
        : undefined

    if (user) {
      const selectRandomQuestion = async (excludedId?: string) => {
        if (excludedId) {
          const [questionRow] = await db
            .select()
            .from(questions)
            .where(ne(questions.id, excludedId))
            .orderBy(sql`RANDOM()`)
            .limit(1)

          return questionRow
        }

        const [questionRow] = await db
          .select()
          .from(questions)
          .orderBy(sql`RANDOM()`)
          .limit(1)

        return questionRow
      }

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
    }

    const demoProfile = getResolvedDemoProfile(c.get('demoProfile'))
    const demoProfileId = demoProfile.id

    const selectRandomDemoQuestion = async (excludedId?: string) => {
      if (excludedId) {
        const [questionRow] = await db
          .select()
          .from(demoQuestions)
          .where(
            and(
              eq(demoQuestions.demoProfileId, demoProfileId),
              ne(demoQuestions.id, excludedId),
            ),
          )
          .orderBy(sql`RANDOM()`)
          .limit(1)

        return questionRow
      }

      const [questionRow] = await db
        .select()
        .from(demoQuestions)
        .where(eq(demoQuestions.demoProfileId, demoProfileId))
        .orderBy(sql`RANDOM()`)
        .limit(1)

      return questionRow
    }

    const preferredQuestion = await selectRandomDemoQuestion(excludedQuestionId)

    if (preferredQuestion) {
      return c.json({ question: toPublicQuestion(preferredQuestion) }, 200)
    }

    if (excludedQuestionId) {
      const fallbackQuestion = await selectRandomDemoQuestion()

      if (fallbackQuestion) {
        return c.json({ question: toPublicQuestion(fallbackQuestion) }, 200)
      }
    }

    return c.json({ error: 'No questions found' as const }, 404)
  })
  .get('/api/questions/:id', async (c) => {
    const user = c.get('user')
    const questionId = c.req.param('id')

    if (!isNonEmptyString(questionId)) {
      return c.json({ error: 'Question id is required' as const }, 400)
    }

    const trimmedQuestionId = questionId.trim()
    const db = createDb(c.env.interview)

    if (user) {
      const [questionRow] = await db
        .select()
        .from(questions)
        .where(eq(questions.id, trimmedQuestionId))
        .limit(1)

      if (!questionRow) {
        return c.json({ error: 'Question not found' as const }, 404)
      }

      return c.json({ question: questionRow }, 200)
    }

    const demoProfile = getResolvedDemoProfile(c.get('demoProfile'))

    const [questionRow] = await db
      .select()
      .from(demoQuestions)
      .where(
        and(
          eq(demoQuestions.id, trimmedQuestionId),
          eq(demoQuestions.demoProfileId, demoProfile.id),
        ),
      )
      .limit(1)

    if (!questionRow) {
      return c.json({ error: 'Question not found' as const }, 404)
    }

    return c.json({ question: toPublicQuestion(questionRow) }, 200)
  })
  .put('/api/questions/:id', questionBodyValidator, async (c) => {
    const user = c.get('user')
    const questionId = c.req.param('id')

    if (!isNonEmptyString(questionId)) {
      return c.json({ error: 'Question id is required' as const }, 400)
    }

    const trimmedQuestionId = questionId.trim()
    const { question, answer } = c.req.valid('json')
    const db = createDb(c.env.interview)

    if (user) {
      const [updatedQuestion] = await db
        .update(questions)
        .set({
          question,
          answer,
        })
        .where(eq(questions.id, trimmedQuestionId))
        .returning()

      if (!updatedQuestion) {
        return c.json({ error: 'Question not found' as const }, 404)
      }

      return c.json({ question: updatedQuestion }, 200)
    }

    const demoProfile = getResolvedDemoProfile(c.get('demoProfile'))

    const [updatedQuestion] = await db
      .update(demoQuestions)
      .set({
        question,
        answer,
      })
      .where(
        and(
          eq(demoQuestions.id, trimmedQuestionId),
          eq(demoQuestions.demoProfileId, demoProfile.id),
        ),
      )
      .returning()

    if (!updatedQuestion) {
      return c.json({ error: 'Question not found' as const }, 404)
    }

    return c.json({ question: toPublicQuestion(updatedQuestion) }, 200)
  })
  .delete('/api/questions/:id', async (c) => {
    const user = c.get('user')
    const questionId = c.req.param('id')

    if (!isNonEmptyString(questionId)) {
      return c.json({ error: 'Question id is required' as const }, 400)
    }

    const trimmedQuestionId = questionId.trim()
    const db = createDb(c.env.interview)

    if (user) {
      const [deletedQuestion] = await db
        .delete(questions)
        .where(eq(questions.id, trimmedQuestionId))
        .returning()

      if (!deletedQuestion) {
        return c.json({ error: 'Question not found' as const }, 404)
      }

      return c.json({ question: deletedQuestion }, 200)
    }

    const demoProfile = getResolvedDemoProfile(c.get('demoProfile'))

    const [deletedQuestion] = await db
      .delete(demoQuestions)
      .where(
        and(
          eq(demoQuestions.id, trimmedQuestionId),
          eq(demoQuestions.demoProfileId, demoProfile.id),
        ),
      )
      .returning()

    if (!deletedQuestion) {
      return c.json({ error: 'Question not found' as const }, 404)
    }

    return c.json({ question: toPublicQuestion(deletedQuestion) }, 200)
  })
