import { wrap } from '@reatom/core'
import { reatomComponent } from '@reatom/react'
import { Trash2Icon } from 'lucide-react'

import { Button } from '@/common/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/common/components/ui/tooltip'

import { openDeleteQuestionDialog } from '../model/delete-question'

type DeleteQuestionButtonProps = {
  questionId: string
}

export const DeleteQuestionButton = reatomComponent(
  ({ questionId }: DeleteQuestionButtonProps) => {
    const handleOpen = wrap((event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()
      openDeleteQuestionDialog(questionId)
    })

    return (
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              tabIndex={-1}
              aria-label="Delete question"
              onClick={handleOpen}
            />
          }
        >
          <Trash2Icon />
        </TooltipTrigger>
        <TooltipContent side="bottom">Delete question</TooltipContent>
      </Tooltip>
    )
  },
  'DeleteQuestionButton',
)
