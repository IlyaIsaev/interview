import { useBoolean } from "@reactuses/core";
import { Trash2 } from "lucide-react";
import type { ReactNode } from "react";
import { useDeleteQuestion } from "../model/use-delete-question";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/ui-kit/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/shared/ui-kit/components/ui/dropdown-menu";
import { Spinner } from "@/shared/ui-kit/components/ui/spinner";

type DeleteQuestionProps = {
  readonly id: number;
  readonly after?: "nextQuestion" | "refreshQuestions";
  readonly children: (item: ReactNode) => ReactNode;
};

type DeleteStatus = "idle" | "pending" | "empty";

type DeleteStatusOverlayProps = {
  readonly status: DeleteStatus;
};

function DeleteStatusOverlay({ status }: DeleteStatusOverlayProps): ReactNode {
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

export function DeleteQuestion({ id, after, children }: DeleteQuestionProps): ReactNode {
  const {
    value: isConfirmOpen,
    setTrue: setIsConfirmOpenTrue,
    setFalse: setIsConfirmOpenFalse,
  } = useBoolean();
  const { status, onDelete } = useDeleteQuestion({
    id,
    after,
    onDeleted: setIsConfirmOpenFalse,
  });
  const isPending = status === "pending";
  const willRefreshQuestions = after === "refreshQuestions";
  const showOverlay = !willRefreshQuestions && (!isConfirmOpen || status === "empty");
  const item = (
    <DropdownMenuItem variant="destructive" disabled={isPending} onClick={setIsConfirmOpenTrue}>
      <Trash2 />
      Delete
    </DropdownMenuItem>
  );

  return (
    <>
      {showOverlay ? <DeleteStatusOverlay status={status} /> : null}
      {children(item)}
      <AlertDialog
        open={isConfirmOpen}
        onOpenChange={(open) => {
          if (isPending) return;

          if (open) {
            setIsConfirmOpenTrue();

            return;
          }

          setIsConfirmOpenFalse();
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this question?</AlertDialogTitle>
            <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={isPending}
              onClick={() => {
                void onDelete();
              }}
            >
              {isPending ? (
                <Spinner data-icon="inline-start" />
              ) : (
                <Trash2 data-icon="inline-start" />
              )}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
