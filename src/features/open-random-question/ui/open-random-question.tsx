import { useEventListener } from "@reactuses/core";
import { useMatch } from "@tanstack/react-router";
import { Shuffle } from "lucide-react";
import type { ReactNode } from "react";
import { useOpenRandomQuestion } from "../model/use-open-random-question";
import { Button } from "@/shared/ui-kit/components/ui/button";
import { Spinner } from "@/shared/ui-kit/components/ui/spinner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui-kit/components/ui/tooltip";

const isEnterBlockedTarget = (target: EventTarget | null): boolean =>
  target instanceof HTMLElement &&
  target.closest(
    "input, textarea, select, button, a, [role='menu'], [role='dialog'], [contenteditable='true']",
  ) !== null;

export function OpenRandomQuestion(): ReactNode {
  const { isPending, onOpen } = useOpenRandomQuestion();
  const isQuestionOpened = useMatch({
    from: "/questions/$id/",
    shouldThrow: false,
    select: () => true,
  });

  useEventListener("keydown", (event) => {
    if (!isQuestionOpened) return;

    const shouldIgnoreEnter =
      event.key !== "Enter" || event.repeat || event.isComposing || event.defaultPrevented;

    if (shouldIgnoreEnter) return;

    if (event.metaKey || event.ctrlKey || event.altKey) return;

    if (isPending || isEnterBlockedTarget(event.target)) return;

    event.preventDefault();

    void onOpen();
  });

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <span className="inline-flex">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Open random question"
              disabled={isPending}
              onClick={() => {
                void onOpen();
              }}
            >
              {isPending ? (
                <Spinner data-icon="inline-start" />
              ) : (
                <Shuffle data-icon="inline-start" />
              )}
            </Button>
          </span>
        }
      />
      <TooltipContent side="left">Open a random question</TooltipContent>
    </Tooltip>
  );
}
