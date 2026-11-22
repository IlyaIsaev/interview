import { useEvent } from "@reactuses/core";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { deleteQuestion, getRandomQuestion, isNoQuestionsFoundError } from "@/server/questions";
import { getActionErrorMessage } from "@/shared/auth";
import { toast } from "@/shared/ui-kit/components/ui/toast";

type QuestionMutationStatus = "idle" | "pending" | "empty";

type UseDeleteQuestionParams = {
  readonly id: number;
  readonly after?: "nextQuestion" | "refreshQuestions";
  readonly onDeleted?: () => void;
};

type UseDeleteQuestionResult = {
  readonly status: QuestionMutationStatus;
  readonly onDelete: () => Promise<void>;
};

export const useDeleteQuestion = ({
  id,
  after = "nextQuestion",
  onDeleted,
}: UseDeleteQuestionParams): UseDeleteQuestionResult => {
  const navigate = useNavigate();
  const router = useRouter();
  const [status, setStatus] = useState<QuestionMutationStatus>("idle");
  const notifyDeleted = useEvent(() => {
    onDeleted?.();
  });

  const onDelete = useEvent(async () => {
    if (status === "pending") return;

    setStatus("pending");

    try {
      await deleteQuestion({ data: id });
    } catch (error) {
      setStatus("idle");

      toast.add({ title: getActionErrorMessage(error), type: "error" });

      return;
    }

    toast.add({ title: "Deleted" });

    notifyDeleted();

    if (after === "refreshQuestions") {
      try {
        await router.invalidate();
      } finally {
        setStatus("idle");
      }

      return;
    }

    try {
      const question = await getRandomQuestion();

      await navigate({
        to: "/questions/$id",
        params: { id: String(question.id) },
        replace: true,
      });

      setStatus("idle");
    } catch (error) {
      if (isNoQuestionsFoundError(error)) {
        setStatus("empty");

        return;
      }

      setStatus("idle");

      toast.add({ title: getActionErrorMessage(error), type: "error" });
    }
  });

  return {
    status,
    onDelete,
  };
};
