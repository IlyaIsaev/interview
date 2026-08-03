import { wrap } from "@reatom/core";
import { reatomComponent } from "@reatom/react";

import { signOut, useSession } from "@/modules/auth";
import { Button } from "@/common/components/ui/button";

import { signInRoute, signUpRoute } from "@/common/routes";

const HomePage = reatomComponent(() => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <p className="text-sm text-muted-foreground">Loading session…</p>;
  }

  if (session?.user) {
    return (
      <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
        <h1 className="text-2xl font-medium tracking-tight">Interview</h1>
        <p className="text-sm text-muted-foreground">Signed in as {session.user.email}</p>
        <Button
          type="button"
          variant="outline"
          onClick={wrap(async () => {
            await signOut();
          })}
        >
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
      <h1 className="text-2xl font-medium tracking-tight">Interview</h1>
      <p className="text-sm text-muted-foreground">Sign in or create an account to continue.</p>
      <div className="flex gap-2">
        <Button type="button" onClick={wrap(() => signInRoute.go())}>
          Sign in
        </Button>
        <Button type="button" variant="outline" onClick={wrap(() => signUpRoute.go())}>
          Sign up
        </Button>
      </div>
    </div>
  );
}, "HomePage");

export default HomePage;
