import { wrap } from '@reatom/core'
import { reatomComponent } from '@reatom/react'
import { PlusIcon } from 'lucide-react'

import { Button } from '@/common/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/common/components/ui/tooltip'

import {
  canCreateQuestion,
  demoQuestionsLimitMessage,
} from '../../../model/questions'
import { openCreateQuestionDialog } from '../model/dialog-open'

export const CreateQuestionButton = reatomComponent(() => {
  const allowed = canCreateQuestion()
  const label = allowed ? 'Add a new question' : demoQuestionsLimitMessage

  return (
    <Tooltip>
      <TooltipTrigger render={<span className="inline-flex" />}>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={label}
          disabled={!allowed}
          onClick={wrap(openCreateQuestionDialog)}
        >
          <PlusIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">{label}</TooltipContent>
    </Tooltip>
  )
}, 'CreateQuestionButton')
