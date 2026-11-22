import { useEvent } from "@reactuses/core";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { archiveQuestion, getRandomQuestion, isNoQuestionsFoundError } from "@/server/questions";
import { getActionErrorMessage } from "@/shared/auth";
import { toast } from "@/shared/ui-kit/components/ui/toast";

type QuestionMutationStatus = "idle" | "pending" | "empty";

type UseArchiveQuestionParams = {
  readonly id: number;
  readonly after?: "nextQuestion" | "refreshQuestions";
};

type UseArchiveQuestionResult = {
  readonly status: QuestionMutationStatus;
  readonly onArchive: () => Promise<void>;
};

export const useArchiveQuestion = ({
  id,
  after = "nextQuestion",
}: UseArchiveQuestionParams): UseArchiveQuestionResult => {
  const navigate = useNavigate();
  const router = useRouter();
  const [status, setStatus] = useState<QuestionMutationStatus>("idle");

  const onArchive = useEvent(async () => {
    if (status === "pending") return;

    setStatus("pending");

    try {
      await archiveQuestion({ data: id });
    } catch (error) {
      setStatus("idle");

      toast.add({ title: getActionErrorMessage(error), type: "error" });

      return;
    }

    toast.add({ title: "Archived" });

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
    onArchive,
  };
};
