import { useBoolean, useEvent } from "@reactuses/core";
import { useNavigate } from "@tanstack/react-router";
import { getRandomQuestion, isNoQuestionsFoundError } from "@/server/questions";
import { getActionErrorMessage } from "@/shared/auth";
import { toast } from "@/shared/ui-kit/components/ui/toast";

type UseOpenRandomQuestionResult = {
  readonly isPending: boolean;
  readonly onOpen: () => Promise<void>;
};

export const useOpenRandomQuestion = (): UseOpenRandomQuestionResult => {
  const navigate = useNavigate();
  const { value: isPending, setTrue: setIsPendingTrue, setFalse: setIsPendingFalse } = useBoolean();

  const onOpen = useEvent(async () => {
    if (isPending) return;

    setIsPendingTrue();

    try {
      const question = await getRandomQuestion();

      await navigate({
        to: "/questions/$id",
        params: { id: String(question.id) },
      });

      setIsPendingFalse();
    } catch (error) {
      setIsPendingFalse();

      const isNoQuestionsFound = isNoQuestionsFoundError(error);

      if (isNoQuestionsFound) toast.add({ title: "No questions left." });

      if (!isNoQuestionsFound) toast.add({ title: getActionErrorMessage(error), type: "error" });
    }
  });

  return {
    isPending,
    onOpen,
  };
};
