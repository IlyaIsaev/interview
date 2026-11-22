import { Link } from "@tanstack/react-router";
import { SquarePen } from "lucide-react";
import type { ReactNode } from "react";
import { DropdownMenuItem } from "@/shared/ui-kit/components/ui/dropdown-menu";

type UpdateQuestionTriggerProps = {
  readonly id: number;
};

export function UpdateQuestionTrigger({ id }: UpdateQuestionTriggerProps): ReactNode {
  return (
    <DropdownMenuItem
      nativeButton={false}
      render={<Link to="/questions/$id/edit" params={{ id: String(id) }} />}
    >
      <SquarePen />
      Edit
    </DropdownMenuItem>
  );
}
