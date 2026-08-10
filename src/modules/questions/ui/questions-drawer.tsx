import { action, reatomBoolean, wrap } from "@reatom/core";
import { reatomComponent } from "@reatom/react";
import { PanelLeftIcon, PlusIcon } from "lucide-react";
import type { KeyboardEvent } from "react";

import { isSessionPending } from "@/common/auth";
import { Button } from "@/common/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/common/components/ui/drawer";
import { Empty, EmptyContent, EmptyHeader, EmptyTitle } from "@/common/components/ui/empty";
import { Spinner } from "@/common/components/ui/spinner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/common/components/ui/tooltip";
import { homeRoute } from "@/common/routes";

import { CreateQuestionButton, openCreateQuestionDialog } from "../modules/create";
import { DeleteQuestionDialog } from "../modules/delete";
import { openReadQuestion } from "../modules/read";
import { UpdateQuestionDialog } from "../modules/update";
import {
  canCreateQuestion,
  isQuestionsLoaded,
  questions,
  questionsError,
} from "../model/questions";
import { QuestionsVirtualList } from "./questions-virtual-list";

const questionsDrawerOpen = reatomBoolean(false, "questionsDrawerOpen");

const openQuestionsDrawer = action(() => {
  questionsDrawerOpen.setTrue();
}, "openQuestionsDrawer");

const selectQuestionFromDrawer = action((questionId: string) => {
  questionsDrawerOpen.setFalse();

  void openReadQuestion(questionId);
}, "selectQuestionFromDrawer");

const activateQuestionFromKeyboard = action(
  (keyboardEvent: KeyboardEvent, questionId: string) => {
    if (keyboardEvent.key !== "Enter" && keyboardEvent.key !== " ") {
      return;
    }

    // Action buttons handle their own keyboard activation.
    if (
      keyboardEvent.target instanceof HTMLElement &&
      keyboardEvent.target.closest("button")
    ) {
      return;
    }

    keyboardEvent.preventDefault();
    selectQuestionFromDrawer(questionId);
  },
  "activateQuestionFromKeyboard",
);

export const QuestionsDrawer = reatomComponent(() => {
  const questionBank = questions();
  // List is hydrated from the home route loader; only show loading on home while it runs.
  const isQuestionsListLoading =
    isSessionPending() || (homeRoute.exact() && !isQuestionsLoaded());
  const questionsLoadError = questionsError();
  const canAddQuestion = canCreateQuestion();

  if (isSessionPending()) {
    return null;
  }

  return (
    <Drawer
      open={questionsDrawerOpen()}
      swipeDirection="left"
      onOpenChange={wrap(questionsDrawerOpen.set)}
    >
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Show questions"
              onClick={wrap(openQuestionsDrawer)}
            />
          }
        >
          <PanelLeftIcon />
        </TooltipTrigger>
        <TooltipContent side="bottom">Show questions</TooltipContent>
      </Tooltip>
      <DrawerContent>
        <DrawerHeader className="flex flex-row items-start gap-2">
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <DrawerTitle>Questions</DrawerTitle>
          </div>
          <div className="shrink-0">
            <CreateQuestionButton />
          </div>
        </DrawerHeader>
        <div className="flex min-h-0 flex-1 flex-col p-4 pt-3">
          {isQuestionsListLoading && questionBank.length === 0 ? (
            <div className="flex min-h-0 flex-1 items-center justify-center">
              <Spinner className="size-5" />
            </div>
          ) : null}

          {!isQuestionsListLoading &&
          questionsLoadError &&
          questionBank.length === 0 ? (
            <p className="text-sm text-destructive">
              {questionsLoadError.message || "Failed to load questions"}
            </p>
          ) : null}

          {!isQuestionsListLoading &&
          !questionsLoadError &&
          questionBank.length === 0 ? (
            <Empty className="border border-dashed">
              <EmptyHeader>
                <EmptyTitle>No questions yet</EmptyTitle>
              </EmptyHeader>
              <EmptyContent>
                <Button
                  type="button"
                  disabled={!canAddQuestion}
                  onClick={wrap(openCreateQuestionDialog)}
                >
                  <PlusIcon data-icon="inline-start" />
                  Add question
                </Button>
              </EmptyContent>
            </Empty>
          ) : null}

          {questionBank.length > 0 ? (
            <QuestionsVirtualList
              questions={questionBank}
              onQuestionSelect={selectQuestionFromDrawer}
              onQuestionKeyDown={activateQuestionFromKeyboard}
            />
          ) : null}
        </div>
        <UpdateQuestionDialog />
        <DeleteQuestionDialog />
      </DrawerContent>
    </Drawer>
  );
}, "QuestionsDrawer");
