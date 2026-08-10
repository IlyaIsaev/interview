import { action, reatomForm } from "@reatom/core";
import { toast } from "sonner";

import { api } from "@/common/api";
import {
  readApiErrorMessage,
  readUnknownErrorMessage,
} from "@/common/lib/error-message";

import type { Question } from "../../../model/questions";
import { prependQuestion } from "../../../model/questions";
import { showCreatedReadQuestion } from "../../read";
import { createQuestionDialogOpen } from "./dialog-open";

export const createQuestionForm = reatomForm(
  {
    question: "",
    answer: "",
  },
  {
    name: "createQuestionForm",
    validateOnBlur: true,
    resetOnSubmit: true,
    validateBeforeSubmit: ({ question, answer }) => {
      if (!question.trim()) {
        throw new Error("Question is required");
      }

      if (!answer.trim()) {
        throw new Error("Answer is required");
      }
    },
    onSubmit: async ({ question, answer }) => {
      try {
        const response = await api.questions.$post({
          json: {
            question: question.trim(),
            answer: answer.trim(),
          },
        });

        if (!response.ok) {
          const errorPayload = await response.json().catch(() => null);
          const errorMessage = readApiErrorMessage(
            errorPayload,
            "Failed to save question",
          );

          throw new Error(errorMessage);
        }

        const responsePayload = await response.json();
        const createdQuestion = responsePayload.question as Question;
        const createdQuestionTitle = createdQuestion.question;

        prependQuestion(createdQuestion);

        createQuestionDialogOpen.setFalse();

        showCreatedReadQuestion(createdQuestion);

        toast.success(`“${createdQuestionTitle}” created`, {
          classNames: {
            title: "line-clamp-2 min-w-0 break-all whitespace-normal",
          },
        });
      } catch (error) {
        const errorMessage = readUnknownErrorMessage(
          error,
          "Failed to save question",
        );

        toast.error(errorMessage);

        throw error instanceof Error ? error : new Error(errorMessage);
      }
    },
  },
);

export const closeCreateQuestionDialog = action(() => {
  createQuestionDialogOpen.setFalse();

  createQuestionForm.reset();
}, "closeCreateQuestionDialog");

export const setCreateQuestionDialogOpen = action((isOpen: boolean) => {
  createQuestionDialogOpen.set(isOpen);

  if (!isOpen) {
    createQuestionForm.reset();
  }
}, "setCreateQuestionDialogOpen");

export const submitCreateQuestionForm = action(async () => {
  try {
    await createQuestionForm.submit();
  } catch {
    // Validation stays on the form; API errors also toast.
  }
}, "submitCreateQuestionForm");
