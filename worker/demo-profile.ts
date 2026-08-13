import { eq, lte } from 'drizzle-orm'
import type { Context } from 'hono'
import { deleteCookie, getCookie, setCookie } from 'hono/cookie'

import { createDb, demoProfiles, type Database } from '@/db'

import type { AuthEnv } from './auth'

/** Cookie that identifies an unregistered visitor's demo profile. */
export const DEMO_PROFILE_COOKIE_NAME = 'demo_profile_id'

/** Fixed lifetime for demo profiles and their cookies (not sliding). */
export const DEMO_PROFILE_TTL_MS = 24 * 60 * 60 * 1000

const DEMO_PROFILE_TTL_SECONDS = DEMO_PROFILE_TTL_MS / 1000

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export type DemoProfile = typeof demoProfiles.$inferSelect

type EnvWithInterviewBinding = {
  Bindings: AuthEnv
}

const isUuid = (candidate: string): boolean => UUID_PATTERN.test(candidate)

const getRemainingCookieMaxAgeSeconds = (expiresAt: Date): number => {
  const remainingMs = expiresAt.getTime() - Date.now()

  return Math.max(0, Math.floor(remainingMs / 1000))
}

const shouldUseSecureCookie = (requestUrl: string): boolean =>
  new URL(requestUrl).protocol === 'https:'

const writeDemoProfileCookie = <E extends EnvWithInterviewBinding>(
  c: Context<E>,
  demoProfileId: string,
  expiresAt: Date,
) => {
  const maxAge = getRemainingCookieMaxAgeSeconds(expiresAt)

  if (maxAge <= 0) {
    deleteCookie(c, DEMO_PROFILE_COOKIE_NAME, { path: '/' })

    return
  }

  setCookie(c, DEMO_PROFILE_COOKIE_NAME, demoProfileId, {
    path: '/',
    httpOnly: true,
    sameSite: 'Lax',
    secure: shouldUseSecureCookie(c.req.url),
    maxAge: Math.min(maxAge, DEMO_PROFILE_TTL_SECONDS),
  })
}

const createDemoProfile = async (db: Database): Promise<DemoProfile> => {
  const now = new Date()
  const demoProfileId = crypto.randomUUID()
  const expiresAt = new Date(now.getTime() + DEMO_PROFILE_TTL_MS)

  const [createdDemoProfile] = await db
    .insert(demoProfiles)
    .values({
      id: demoProfileId,
      createdAt: now,
      expiresAt,
    })
    .returning()

  return createdDemoProfile
}

const deleteDemoProfileById = async (
  db: Database,
  demoProfileId: string,
): Promise<void> => {
  await db.delete(demoProfiles).where(eq(demoProfiles.id, demoProfileId))
}

const clearDemoProfileCookie = <E extends EnvWithInterviewBinding>(
  c: Context<E>,
) => {
  deleteCookie(c, DEMO_PROFILE_COOKIE_NAME, {
    path: '/',
    secure: shouldUseSecureCookie(c.req.url),
  })
}

/** Delete the current request's demo profile (if any) and clear its cookie. */
export const deleteDemoProfileForRequest = async <
  E extends EnvWithInterviewBinding,
>(
  c: Context<E>,
  db: Database,
): Promise<void> => {
  const cookieDemoProfileId = getCookie(c, DEMO_PROFILE_COOKIE_NAME)

  if (cookieDemoProfileId && isUuid(cookieDemoProfileId)) {
    await deleteDemoProfileById(db, cookieDemoProfileId)
  }

  clearDemoProfileCookie(c)
}

/**
 * Resolve the demo profile for an unregistered visitor.
 * Creates a new profile + cookie when missing/invalid/expired.
 * Registered users never use this path.
 */
export const resolveDemoProfile = async <E extends EnvWithInterviewBinding>(
  c: Context<E>,
  db: Database,
): Promise<DemoProfile> => {
  const cookieDemoProfileId = getCookie(c, DEMO_PROFILE_COOKIE_NAME)
  const now = new Date()

  if (cookieDemoProfileId && isUuid(cookieDemoProfileId)) {
    const [existingDemoProfile] = await db
      .select()
      .from(demoProfiles)
      .where(eq(demoProfiles.id, cookieDemoProfileId))
      .limit(1)

    if (existingDemoProfile && existingDemoProfile.expiresAt > now) {
      writeDemoProfileCookie(
        c,
        existingDemoProfile.id,
        existingDemoProfile.expiresAt,
      )

      return existingDemoProfile
    }

    if (existingDemoProfile) {
      await deleteDemoProfileById(db, existingDemoProfile.id)
    }
  }

  const createdDemoProfile = await createDemoProfile(db)

  writeDemoProfileCookie(c, createdDemoProfile.id, createdDemoProfile.expiresAt)

  return createdDemoProfile
}

/** Delete all demo profiles whose TTL has elapsed (cascade removes their questions). */
export const purgeExpiredDemoProfiles = async (
  env: AuthEnv,
): Promise<number> => {
  const db = createDb(env.interview)
  const now = new Date()

  const deletedDemoProfiles = await db
    .delete(demoProfiles)
    .where(lte(demoProfiles.expiresAt, now))
    .returning({ id: demoProfiles.id })

  return deletedDemoProfiles.length
}
