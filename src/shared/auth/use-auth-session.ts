import { useRouteContext } from "@tanstack/react-router";
import type { AuthSession } from "./auth-client";

export const useAuthSession = (): AuthSession => useRouteContext({ from: "__root__" }).session;
