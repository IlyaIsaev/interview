import { ArchiveRestore } from "lucide-react";
import type { ReactNode } from "react";
import { useRestoreQuestion } from "../model/use-restore-question";
import { DropdownMenuItem } from "@/shared/ui-kit/components/ui/dropdown-menu";
import { Spinner } from "@/shared/ui-kit/components/ui/spinner";

type RestoreQuestionProps = {
  readonly id: number;
};

export function RestoreQuestion({ id }: RestoreQuestionProps): ReactNode {
  const { isPending, onRestore } = useRestoreQuestion({ id });

  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() => {
        void onRestore();
      }}
    >
      {isPending ? <Spinner /> : <ArchiveRestore />}
      Restore
    </DropdownMenuItem>
  );
}
