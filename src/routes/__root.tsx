import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { useEvent } from "@reactuses/core";
import { DoorOpen, LogIn, Menu, Undo2 } from "lucide-react";
import { useState } from "react";
import { CreateQuestionTrigger } from "@/features/create-question";
import { OpenRandomQuestion } from "@/features/open-random-question";
import { getSession } from "@/server/session";
import { authClient, useAuthSession } from "@/shared/auth";
import type { AuthSession } from "@/shared/auth";
import { markdownHighlightCss } from "@/shared/ui/highlight-markdown";
import { Button } from "@/shared/ui-kit/components/ui/button";
import { Item, ItemContent, ItemTitle } from "@/shared/ui-kit/components/ui/item";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui-kit/components/ui/sheet";
import { Toaster } from "@/shared/ui-kit/components/ui/toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui-kit/components/ui/tooltip";
import appCss from "../styles.css?url";

const isAuthRoutePath = (pathname: string): boolean =>
  pathname === "/login" || pathname === "/sign-up";

function SiteHistoryBackButton() {
  const router = useRouter();

  return (
    <div className="fixed top-4 left-4 z-50">
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Return"
              onClick={() => {
                router.history.back();
              }}
            />
          }
        >
          <Undo2 data-icon="inline-start" />
        </TooltipTrigger>
        <TooltipContent side="right">Return</TooltipContent>
      </Tooltip>
    </div>
  );
}

function SiteCornerNav() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const router = useRouter();
  const session = useAuthSession();

  const logOut = useEvent(async () => {
    await authClient.signOut();

    setOpenPath(null);

    await router.invalidate();
  });

  return (
    <div className="fixed top-4 left-4 z-50">
      <Sheet
        open={open}
        onOpenChange={(nextOpen) => {
          setOpenPath(nextOpen ? pathname : null);
        }}
      >
        <SheetTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Open menu" />}>
          <Menu data-icon="inline-start" />
        </SheetTrigger>

        <SheetContent side="left" showCloseButton={false}>
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <nav className="flex flex-col gap-2 p-4">
            <Item render={<SheetClose nativeButton={false} render={<Link to="/questions" />} />}>
              <ItemContent>
                <ItemTitle className="text-base">Questions</ItemTitle>
              </ItemContent>
            </Item>
            <Item render={<SheetClose nativeButton={false} render={<Link to="/archived" />} />}>
              <ItemContent>
                <ItemTitle className="text-base">Archived</ItemTitle>
              </ItemContent>
            </Item>
          </nav>
          <SheetFooter className="flex-row justify-end">
            {session ? (
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Log out"
                      onClick={() => {
                        void logOut();
                      }}
                    />
                  }
                >
                  <DoorOpen data-icon="inline-start" />
                </TooltipTrigger>
                <TooltipContent side="top">Log out</TooltipContent>
              </Tooltip>
            ) : (
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      nativeButton={false}
                      aria-label="Log in"
                      render={<Link to="/login" />}
                    />
                  }
                >
                  <LogIn data-icon="inline-start" />
                </TooltipTrigger>
                <TooltipContent side="top">Log in</TooltipContent>
              </Tooltip>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export const Route = createRootRouteWithContext<{
  session: AuthSession;
}>()({
  beforeLoad: async () => {
    const session = await getSession();

    return { session };
  },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Interview quiz" },
    ],
    links: [
      { rel: "icon", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
    ],
    styles: [{ children: markdownHighlightCss }],
  }),
  component: RootComponent,
});

function RootComponent() {
  const isAuthRoute = useRouterState({
    select: (state) => isAuthRoutePath(state.location.pathname),
  });

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <TooltipProvider>
          {isAuthRoute ? <SiteHistoryBackButton /> : <SiteCornerNav />}
          {isAuthRoute ? null : (
            <div className="fixed top-4 right-4 z-50 flex flex-col items-end gap-2">
              <CreateQuestionTrigger />
              <OpenRandomQuestion />
            </div>
          )}
          <Outlet />
          <Toaster />
        </TooltipProvider>
        <Scripts />
      </body>
    </html>
  );
}
