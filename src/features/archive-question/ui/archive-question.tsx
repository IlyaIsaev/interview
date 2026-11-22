import { Archive } from "lucide-react";
import type { ReactNode } from "react";
import { useArchiveQuestion } from "../model/use-archive-question";
import { DropdownMenuItem } from "@/shared/ui-kit/components/ui/dropdown-menu";
import { Spinner } from "@/shared/ui-kit/components/ui/spinner";

type ArchiveQuestionProps = {
  readonly id: number;
  readonly after?: "nextQuestion" | "refreshQuestions";
  readonly children: (item: ReactNode) => ReactNode;
};

type ArchiveStatus = "idle" | "pending" | "empty";

type ArchiveStatusOverlayProps = {
  readonly status: ArchiveStatus;
};

function ArchiveStatusOverlay({ status }: ArchiveStatusOverlayProps): ReactNode {
  if (status === "pending") {
    return (
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-background p-6">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (status === "empty") {
    return (
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-background p-6">
        <p>No questions left.</p>
      </div>
    );
  }

  return null;
}

export function ArchiveQuestion({ id, after, children }: ArchiveQuestionProps): ReactNode {
  const { status, onArchive } = useArchiveQuestion({ id, after });
  const isPending = status === "pending";
  const willRefreshQuestions = after === "refreshQuestions";
  const item = (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() => {
        void onArchive();
      }}
    >
      {willRefreshQuestions && isPending ? <Spinner /> : <Archive />}
      Archive
    </DropdownMenuItem>
  );

  return (
    <>
      {willRefreshQuestions ? null : <ArchiveStatusOverlay status={status} />}
      {children(item)}
    </>
  );
}
