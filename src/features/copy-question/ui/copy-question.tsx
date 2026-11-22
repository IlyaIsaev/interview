import { Copy } from "lucide-react";
import type { ReactNode } from "react";
import { useCopyQuestion } from "../model/use-copy-question";
import { DropdownMenuItem } from "@/shared/ui-kit/components/ui/dropdown-menu";

type CopyQuestionProps = {
  readonly body: string;
};

export function CopyQuestion({ body }: CopyQuestionProps): ReactNode {
  const { onCopy } = useCopyQuestion();

  return (
    <DropdownMenuItem
      onClick={() => {
        void onCopy(body);
      }}
    >
      <Copy />
      Copy
    </DropdownMenuItem>
  );
}
