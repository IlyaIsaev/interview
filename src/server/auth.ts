import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { betterAuth } from "better-auth";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { env, waitUntil } from "cloudflare:workers";
import * as authSchema from "@/server/db/auth-schema";
import { createDb } from "@/server/db/client";

const createAuthInstance = () =>
  betterAuth({
    database: drizzleAdapter(createDb(), {
      provider: "sqlite",
      schema: authSchema,
    }),
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
    trustedOrigins: [new URL(env.BETTER_AUTH_URL).origin],
    emailAndPassword: {
      enabled: true,
    },
    rateLimit: {
      enabled: true,
      storage: "database",
      customRules: {
        "/sign-in/email": { window: 60, max: 5 },
        "/sign-up/email": { window: 60, max: 3 },
      },
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7,
      updateAge: 60 * 60 * 24,
      freshAge: 60 * 60,
      cookieCache: {
        enabled: true,
        maxAge: 60 * 5,
        strategy: "compact",
      },
    },
    advanced: {
      ipAddress: {
        ipAddressHeaders: ["cf-connecting-ip"],
      },
      database: {
        joins: true,
      },
      backgroundTasks: {
        handler: waitUntil,
      },
    },
    hooks: {
      before: createAuthMiddleware(async (ctx) => {
        if (ctx.path !== "/sign-up/email") return;

        const email = ctx.body?.email;
        const allowed = env.ALLOWED_SIGN_UP_EMAIL?.trim().toLowerCase();
        const submitted = typeof email === "string" ? email.trim().toLowerCase() : "";

        if (!allowed || submitted !== allowed)
          throw new APIError("BAD_REQUEST", {
            message: "Creating new accounts is temporarily disabled",
          });
      }),
    },
    plugins: [tanstackStartCookies()],
  });

type Auth = ReturnType<typeof createAuthInstance>;

let auth: Auth | undefined;

export const createAuth = (): Auth => {
  auth ??= createAuthInstance();

  return auth;
};
