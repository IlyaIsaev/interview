import { useBoolean, useEvent } from "@reactuses/core";
import { useRouter } from "@tanstack/react-router";
import { restoreQuestion } from "@/server/questions";
import { getActionErrorMessage } from "@/shared/auth";
import { toast } from "@/shared/ui-kit/components/ui/toast";

type UseRestoreQuestionParams = {
  readonly id: number;
};

type UseRestoreQuestionResult = {
  readonly isPending: boolean;
  readonly onRestore: () => Promise<void>;
};

export const useRestoreQuestion = ({ id }: UseRestoreQuestionParams): UseRestoreQuestionResult => {
  const router = useRouter();
  const { value: isPending, setTrue: setIsPendingTrue, setFalse: setIsPendingFalse } = useBoolean();

  const onRestore = useEvent(async () => {
    if (isPending) return;

    setIsPendingTrue();

    try {
      await restoreQuestion({ data: id });
      await router.invalidate();
    } catch (error) {
      toast.add({ title: getActionErrorMessage(error), type: "error" });
    } finally {
      setIsPendingFalse();
    }
  });

  return {
    isPending,
    onRestore,
  };
};
