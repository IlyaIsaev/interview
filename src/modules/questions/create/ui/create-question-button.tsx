import { wrap } from '@reatom/core'
import { reatomComponent } from '@reatom/react'
import { PlusIcon } from 'lucide-react'

import { Button } from '@/common/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/common/components/ui/tooltip'

import { createQuestionDialogOpen } from '../model/dialog-open'

export const CreateQuestionButton = reatomComponent(() => {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Add a new question"
            onClick={wrap(() => {
              createQuestionDialogOpen.setTrue()
            })}
          />
        }
      >
        <PlusIcon />
      </TooltipTrigger>
      <TooltipContent side="bottom">Add a new question</TooltipContent>
    </Tooltip>
  )
}, 'CreateQuestionButton')
