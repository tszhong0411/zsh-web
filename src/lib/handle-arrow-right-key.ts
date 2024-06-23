import type { TerminalContext } from '@/contexts/terminal'

export const handleArrowRightKey = (context: TerminalContext) => {
  const { input, caretPosition, setCaretPosition } = context

  if (caretPosition < input.length) setCaretPosition(caretPosition + 1)
}
