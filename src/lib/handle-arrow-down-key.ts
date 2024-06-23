import type { TerminalContext } from '@/contexts/terminal'

import { getCommandHistory } from './fs'

export const handleArrowDownKey = (context: TerminalContext) => {
  const { setCaretPosition, setInput, historyIndex, setHistoryIndex } = context

  const history = getCommandHistory()
  const nextCommand = history[historyIndex - 1]

  if (nextCommand) {
    setCaretPosition(nextCommand.length)
    setInput(nextCommand)

    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
    }
  }
}
