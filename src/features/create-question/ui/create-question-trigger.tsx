import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/shared/ui-kit/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui-kit/components/ui/tooltip";

export function CreateQuestionTrigger(): ReactNode {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            nativeButton={false}
            aria-label="Create question"
            render={<Link to="/questions/create" />}
          />
        }
      >
        <Plus data-icon="inline-start" />
      </TooltipTrigger>
      <TooltipContent side="left">Create a question</TooltipContent>
    </Tooltip>
  );
}
