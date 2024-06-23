import type { TerminalContext } from '@/contexts/terminal'

export const clear = (context: TerminalContext) => {
  const { setContent, setShowLastLoginMessage } = context

  setContent(null)
  setShowLastLoginMessage(false)
}
