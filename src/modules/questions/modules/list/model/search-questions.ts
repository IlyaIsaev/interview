import { action, atom, withAsync, wrap } from '@reatom/core'

import { fetchQuestions } from '../../../api/questions-api'
import type { Question } from '../../../model/question'

const QUESTIONS_SEARCH_DEBOUNCE_MS = 300

/** Raw text in the sidebar search field. */
export const questionsSearchInput = atom('', 'questionsSearchInput')

/**
 * Backend search hits for the sidebar list.
 * `null` means search is inactive — show the full questions bank.
 */
export const questionsSearchResults = atom<Question[] | null>(
  null,
  'questionsSearchResults',
)

const questionsSearchRequestSerial = atom(0, 'questionsSearchRequestSerial')

let questionsSearchDebounceTimeoutId: ReturnType<typeof setTimeout> | undefined

const clearQuestionsSearchDebounce = () => {
  if (questionsSearchDebounceTimeoutId === undefined) {
    return
  }

  clearTimeout(questionsSearchDebounceTimeoutId)
  questionsSearchDebounceTimeoutId = undefined
}

/** Fetch matching questions from the API (no debounce). */
export const searchQuestions = action(async (searchQuery: string) => {
  const trimmedSearchQuery = searchQuery.trim()
  const requestSerial = questionsSearchRequestSerial() + 1

  questionsSearchRequestSerial.set(requestSerial)

  if (!trimmedSearchQuery) {
    questionsSearchResults.set(null)

    return []
  }

  const matchedQuestions = await wrap(fetchQuestions(trimmedSearchQuery))

  if (requestSerial !== questionsSearchRequestSerial()) {
    return questionsSearchResults() ?? []
  }

  questionsSearchResults.set(matchedQuestions)

  return matchedQuestions
}, 'searchQuestions').extend(withAsync())

export const questionsSearchError = searchQuestions.error

/** Update the search field; empty clears results, non-empty debounces a backend search. */
export const setQuestionsSearchInput = action((searchInput: string) => {
  questionsSearchInput.set(searchInput)
  clearQuestionsSearchDebounce()

  const trimmedSearchInput = searchInput.trim()

  if (!trimmedSearchInput) {
    questionsSearchRequestSerial.set(questionsSearchRequestSerial() + 1)
    questionsSearchResults.set(null)
    searchQuestions.error.set(undefined)

    return
  }

  questionsSearchDebounceTimeoutId = setTimeout(() => {
    questionsSearchDebounceTimeoutId = undefined
    void searchQuestions(trimmedSearchInput)
  }, QUESTIONS_SEARCH_DEBOUNCE_MS)
}, 'setQuestionsSearchInput')

/** Clear search UI state (e.g. when leaving the questions shell). */
export const resetQuestionsSearch = action(() => {
  clearQuestionsSearchDebounce()
  questionsSearchRequestSerial.set(questionsSearchRequestSerial() + 1)
  questionsSearchInput.set('')
  questionsSearchResults.set(null)
  searchQuestions.error.set(undefined)
}, 'resetQuestionsSearch')
