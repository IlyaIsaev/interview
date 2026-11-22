import { EllipsisVertical } from "lucide-react";
import type { ReactNode } from "react";
import { ArchiveQuestion } from "@/features/archive-question";
import { CopyQuestion } from "@/features/copy-question";
import { DeleteQuestion } from "@/features/delete-question";
import { RestoreQuestion } from "@/features/restore-question";
import { UpdateQuestionTrigger } from "@/features/update-question";
import { Button } from "@/shared/ui-kit/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/shared/ui-kit/components/ui/dropdown-menu";

type QuestionMenuAfter = "nextQuestion" | "refreshQuestions";
type QuestionMenuOrientation = "horizontal" | "vertical";

type QuestionMenuProps = {
  readonly orientation?: QuestionMenuOrientation;
} & (
  | {
      readonly variant: "active";
      readonly question: { readonly id: number; readonly body: string };
      readonly after?: QuestionMenuAfter;
    }
  | {
      readonly variant: "archived";
      readonly question: { readonly id: number };
      readonly after?: QuestionMenuAfter;
    }
);

type QuestionMenuDropdownProps = {
  readonly orientation: QuestionMenuOrientation;
  readonly children: ReactNode;
};

const QUESTION_MENU_CHROME = {
  horizontal: "question-actions-hover absolute -top-2 right-0 z-10 bg-background p-2",
  vertical: "question-actions-hover shrink-0 self-start pl-2",
} as const satisfies Record<QuestionMenuOrientation, string>;

function QuestionMenuDropdown({ orientation, children }: QuestionMenuDropdownProps): ReactNode {
  return (
    <div className={QUESTION_MENU_CHROME[orientation]}>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button type="button" variant="ghost" size="icon-sm" aria-label="Question actions" />
          }
        >
          <EllipsisVertical data-icon="inline-start" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" side="bottom" className="w-auto min-w-48">
          <DropdownMenuGroup>{children}</DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function QuestionMenu(props: QuestionMenuProps): ReactNode {
  const orientation = props.orientation ?? "horizontal";

  switch (props.variant) {
    case "active":
      return (
        <ArchiveQuestion id={props.question.id} after={props.after}>
          {(archiveItem) => (
            <DeleteQuestion id={props.question.id} after={props.after}>
              {(deleteItem) => (
                <QuestionMenuDropdown orientation={orientation}>
                  <CopyQuestion body={props.question.body} />
                  <UpdateQuestionTrigger id={props.question.id} />
                  {archiveItem}
                  {deleteItem}
                </QuestionMenuDropdown>
              )}
            </DeleteQuestion>
          )}
        </ArchiveQuestion>
      );
    case "archived":
      return (
        <DeleteQuestion id={props.question.id} after={props.after}>
          {(deleteItem) => (
            <QuestionMenuDropdown orientation={orientation}>
              <RestoreQuestion id={props.question.id} />
              {deleteItem}
            </QuestionMenuDropdown>
          )}
        </DeleteQuestion>
      );
  }
}
