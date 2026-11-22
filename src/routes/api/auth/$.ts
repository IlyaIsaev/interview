import { createFileRoute } from "@tanstack/react-router";

type AuthApiInput = {
  readonly request: Request;
};

const authApi = async ({ request }: AuthApiInput): Promise<Response> => {
  const { createAuth } = await import("@/server/auth");

  return createAuth().handler(request);
};

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: authApi,
      POST: authApi,
    },
  },
});
