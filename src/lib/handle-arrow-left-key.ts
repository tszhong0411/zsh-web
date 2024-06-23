import type { TerminalContext } from '@/contexts/terminal'

export const handleArrowLeftKey = (context: TerminalContext) => {
  const { caretPosition, setCaretPosition } = context

  if (caretPosition > 0) setCaretPosition(caretPosition - 1)
}
