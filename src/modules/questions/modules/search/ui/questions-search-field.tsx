import { wrap } from '@reatom/core'
import { reatomComponent } from '@reatom/react'
import { SearchIcon } from 'lucide-react'

import { Input } from '@/common/components/ui/input'

import {
  questionsSearchInput,
  setQuestionsSearchInput,
} from '../model/search-questions'

export const QuestionsSearchField = reatomComponent(() => {
  return (
    <div className="relative px-2 py-2">
      <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-3.5 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        value={questionsSearchInput()}
        placeholder="Search questions…"
        aria-label="Search questions"
        className="h-8 pl-8"
        onChange={wrap((changeEvent: React.ChangeEvent<HTMLInputElement>) => {
          setQuestionsSearchInput(changeEvent.target.value)
        })}
      />
    </div>
  )
}, 'QuestionsSearchField')
