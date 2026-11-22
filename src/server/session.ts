import { createServerFn, createServerOnlyFn } from "@tanstack/react-start";
import { getRequest, setResponseStatus } from "@tanstack/react-start/server";
import { createAuth } from "@/server/auth";
import { FORBIDDEN_ACTION_MESSAGE } from "@/shared/auth/action-error";
import type { AuthSession } from "@/shared/auth";

export const getSession = createServerFn({ method: "GET" }).handler(
  async (): Promise<AuthSession> => {
    const { headers } = getRequest();

    return createAuth().api.getSession({ headers });
  },
);

export const ensureSession = createServerOnlyFn(async (): Promise<NonNullable<AuthSession>> => {
  const { headers } = getRequest();
  const session = await createAuth().api.getSession({ headers });

  if (!session) {
    setResponseStatus(401);
    throw new Error(FORBIDDEN_ACTION_MESSAGE);
  }

  return session;
});
