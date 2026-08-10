import { action, reatomBoolean, wrap } from "@reatom/core";
import { reatomComponent } from "@reatom/react";
import { PanelLeftIcon, PlusIcon } from "lucide-react";
import type { KeyboardEvent } from "react";

import { Button } from "@/common/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/common/components/ui/drawer";
import { Empty, EmptyContent, EmptyHeader, EmptyTitle } from "@/common/components/ui/empty";
import { Spinner } from "@/common/components/ui/spinner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/common/components/ui/tooltip";
import { isSessionPending } from "@/modules/auth";

import { CreateQuestionButton, openCreateQuestionDialog } from "../modules/create";
import { DeleteQuestionDialog } from "../modules/delete";
import { openReadQuestion } from "../modules/read";
import { UpdateQuestionDialog } from "../modules/update";
import {
  canCreateQuestion,
  fetchQuestions,
  isQuestionsLoaded,
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

const handleQuestionItemKeyDown = action((event: KeyboardEvent, questionId: string) => {
  if (event.key !== "Enter" && event.key !== " ") {
    return;
  }

  // Action buttons handle their own keyboard activation.
  if (event.target instanceof HTMLElement && event.target.closest("button")) {
    return;
  }

  event.preventDefault();
  selectQuestionFromDrawer(questionId);
}, "handleQuestionItemKeyDown");

export const QuestionsDrawer = reatomComponent(() => {
  const questions = fetchQuestions.data();
  const isPending =
    isSessionPending() ||
    (!isQuestionsLoaded() && fetchQuestions.pending() > 0);
  const error = fetchQuestions.error();
  const allowedToCreate = canCreateQuestion();

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
          {isPending && questions.length === 0 ? (
            <div className="flex min-h-0 flex-1 items-center justify-center">
              <Spinner className="size-5" />
            </div>
          ) : null}

          {!isPending && error && questions.length === 0 ? (
            <p className="text-sm text-destructive">
              {error.message || "Failed to load questions"}
            </p>
          ) : null}

          {!isPending && !error && questions.length === 0 ? (
            <Empty className="border border-dashed">
              <EmptyHeader>
                <EmptyTitle>No questions yet</EmptyTitle>
              </EmptyHeader>
              <EmptyContent>
                <Button
                  type="button"
                  disabled={!allowedToCreate}
                  onClick={wrap(openCreateQuestionDialog)}
                >
                  <PlusIcon data-icon="inline-start" />
                  Add question
                </Button>
              </EmptyContent>
            </Empty>
          ) : null}

          {questions.length > 0 ? (
            <QuestionsVirtualList
              questions={questions}
              onSelect={selectQuestionFromDrawer}
              onItemKeyDown={handleQuestionItemKeyDown}
            />
          ) : null}
        </div>
        <UpdateQuestionDialog />
        <DeleteQuestionDialog />
      </DrawerContent>
    </Drawer>
  );
}, "QuestionsDrawer");
