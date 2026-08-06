import { action, reatomForm } from "@reatom/core";
import { toast } from "sonner";

import { api } from "@/common/api";

import { fetchQuestions } from "../../model/questions";
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
          const data = await response.json().catch(() => null);

          const message =
            data && "error" in data && typeof data.error === "string"
              ? data.error
              : "Failed to save question";

          throw new Error(message);
        }

        const savedQuestion = question.trim();

        await fetchQuestions();

        createQuestionDialogOpen.setFalse();

        toast.success(`“${savedQuestion}” created`, {
          classNames: {
            title: "line-clamp-2 min-w-0 break-all whitespace-normal",
          },
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to save question";

        toast.error(message);

        throw error instanceof Error ? error : new Error(message);
      }
    },
  },
);

export const closeCreateQuestionDialog = action(() => {
  createQuestionDialogOpen.setFalse();

  createQuestionForm.reset();
}, "closeCreateQuestionDialog");

export const setCreateQuestionDialogOpen = action((open: boolean) => {
  createQuestionDialogOpen.set(open);

  if (!open) {
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

