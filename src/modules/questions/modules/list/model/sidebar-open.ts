import { effect, reatomBoolean, withLocalStorage } from '@reatom/core'

import { loadQuestionBank } from '../../../model/questions'

export const isQuestionsSidebarOpen = reatomBoolean(
  false,
  'isQuestionsSidebarOpen',
).extend(withLocalStorage('questions-sidebar-open'))

effect(() => {
  if (!isQuestionsSidebarOpen()) {
    return
  }

  void loadQuestionBank()
}, 'loadQuestionBankWhenSidebarOpens')
