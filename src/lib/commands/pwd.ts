import type { TerminalContext } from '@/contexts/terminal'

import type { Output } from '../handle-enter-key'

export const pwd = (context: TerminalContext, output: Output) => {
  const { pwd: _pwd } = context

  output(_pwd)
}
