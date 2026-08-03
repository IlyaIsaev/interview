import { wrap } from "@reatom/core";
import { reatomComponent } from "@reatom/react";
import { lazy, Suspense } from "react";

import { Spinner } from "@/common/components/ui/spinner";

import { homeRoute, signInRoute, signUpRoute } from "@/common/routes";

const HomePage = lazy(() => import("./pages/home"));

const SignInPage = lazy(() => import("./pages/sign-in"));

const SignUpPage = lazy(() => import("./pages/sign-up"));

function PageFallback() {
  return (
    <div className="flex w-full justify-center">
      <Spinner className="size-6" />
    </div>
  );
}

const App = reatomComponent(() => {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="border-b border-border">
        <nav className="mx-auto flex h-12 max-w-3xl items-center gap-3 px-4">
          <button
            type="button"
            className="text-sm font-medium"
            onClick={wrap(() => homeRoute.go())}
          >
            Interview
          </button>
          <div className="ml-auto flex items-center gap-3">
            <button
              type="button"
              className="text-sm text-muted-foreground hover:text-foreground"
              onClick={wrap(() => signInRoute.go())}
            >
              Sign in
            </button>
            <button
              type="button"
              className="text-sm text-muted-foreground hover:text-foreground"
              onClick={wrap(() => signUpRoute.go())}
            >
              Sign up
            </button>
          </div>
        </nav>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 items-center px-4 py-10">
        <Suspense fallback={<PageFallback />}>
          {homeRoute.exact() ? <HomePage /> : null}
          {signInRoute.exact() ? <SignInPage /> : null}
          {signUpRoute.exact() ? <SignUpPage /> : null}
        </Suspense>
      </main>
    </div>
  );
}, "App");

export default App;
