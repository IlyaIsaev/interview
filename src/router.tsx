import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import type { AuthSession } from "@/shared/auth";

const routerContext: { session: AuthSession } = { session: null };

export const getRouter = () =>
  createRouter({
    routeTree,
    context: routerContext,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
