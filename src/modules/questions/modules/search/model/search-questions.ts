import { action, atom, withAsync } from '@reatom/core'

import { api } from '@/common/api'

import type { Question } from '../../../model/questions'

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

export const questionsSearchError = atom<Error | undefined>(
  undefined,
  'questionsSearchError',
)

let questionsSearchDebounceTimeoutId: ReturnType<typeof setTimeout> | undefined

let questionsSearchRequestSerial = 0

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
  const requestSerial = ++questionsSearchRequestSerial

  if (!trimmedSearchQuery) {
    questionsSearchResults.set(null)
    questionsSearchError.set(undefined)

    return []
  }

  const response = await api.questions.$get({
    query: {
      search: trimmedSearchQuery,
    },
  })

  if (requestSerial !== questionsSearchRequestSerial) {
    return questionsSearchResults() ?? []
  }

  if (!response.ok) {
    const searchError = new Error('Failed to search questions')

    questionsSearchError.set(searchError)

    throw searchError
  }

  const payload = await response.json()
  const matchedQuestions = payload.questions as Question[]

  questionsSearchResults.set(matchedQuestions)
  questionsSearchError.set(undefined)

  return matchedQuestions
}, 'searchQuestions').extend(withAsync())

/** Update the search field; empty clears results, non-empty debounces a backend search. */
export const setQuestionsSearchInput = action((searchInput: string) => {
  questionsSearchInput.set(searchInput)
  clearQuestionsSearchDebounce()

  const trimmedSearchInput = searchInput.trim()

  if (!trimmedSearchInput) {
    questionsSearchRequestSerial += 1
    questionsSearchResults.set(null)
    questionsSearchError.set(undefined)

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
  questionsSearchRequestSerial += 1
  questionsSearchInput.set('')
  questionsSearchResults.set(null)
  questionsSearchError.set(undefined)
}, 'resetQuestionsSearch')
