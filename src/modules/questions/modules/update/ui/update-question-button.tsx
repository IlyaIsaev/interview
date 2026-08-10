import { wrap } from '@reatom/core'
import { reatomComponent } from '@reatom/react'
import { PencilIcon } from 'lucide-react'

import { Button } from '@/common/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/common/components/ui/tooltip'

import { openUpdateQuestionDialog } from '../model/update-question'

type UpdateQuestionButtonProps = {
  questionId: string
}

export const UpdateQuestionButton = reatomComponent(
  ({ questionId }: UpdateQuestionButtonProps) => {
    const handleUpdateButtonClick = wrap(
      (mouseEvent: React.MouseEvent<HTMLButtonElement>) => {
        mouseEvent.stopPropagation()
        openUpdateQuestionDialog(questionId)
      },
    )

    return (
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              tabIndex={-1}
              aria-label="Update question"
              onClick={handleUpdateButtonClick}
            />
          }
        >
          <PencilIcon />
        </TooltipTrigger>
        <TooltipContent side="bottom">Update question</TooltipContent>
      </Tooltip>
    )
  },
  'UpdateQuestionButton',
)
