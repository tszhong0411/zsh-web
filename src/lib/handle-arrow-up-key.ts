import type { TerminalContext } from '@/contexts/terminal'

import { getCommandHistory } from './fs'

export const handleArrowUpKey = (context: TerminalContext) => {
  const { setCaretPosition, setInput, historyIndex, setHistoryIndex } = context

  const history = getCommandHistory()
  const previousCommand = history[historyIndex + 1]

  if (previousCommand) {
    setCaretPosition(previousCommand.length)
    setInput(previousCommand)

    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
    }
  }
}
