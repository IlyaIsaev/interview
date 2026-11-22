import { useClipboard, useEvent } from "@reactuses/core";
import { toast } from "@/shared/ui-kit/components/ui/toast";

type UseCopyQuestionResult = {
  readonly onCopy: (value: string) => Promise<void>;
};

export const useCopyQuestion = (): UseCopyQuestionResult => {
  const [, copy] = useClipboard();

  const onCopy = useEvent(async (value: string) => {
    try {
      await copy(value);

      toast.add({ title: "Copied" });
    } catch {
      toast.add({ title: "Could not copy", type: "error" });
    }
  });

  return { onCopy };
};
