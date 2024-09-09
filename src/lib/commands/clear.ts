import type { TerminalContext } from '@/contexts/terminal'

export const clear = (context: TerminalContext) => {
  const { setContent, setShowLastLoginMessage } = context

  setContent([])
  setShowLastLoginMessage(false)
}
