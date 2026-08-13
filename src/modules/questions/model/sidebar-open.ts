import { reatomBoolean, withLocalStorage } from '@reatom/core'

export const isQuestionsSidebarOpen = reatomBoolean(
  false,
  'isQuestionsSidebarOpen',
).extend(withLocalStorage('questions-sidebar-open'))
