import fs from '@zenfs/core'

import type { TerminalContext } from '@/contexts/terminal'

import type { Output } from '../handle-enter-key'

export const mkdir = (context: TerminalContext, args: string[], output: Output) => {
  const { pwd } = context

  if (args.length === 0) {
    output('usage: mkdir [-pv] [-m mode] directory_name ...')
    return
  }

  for (const arg of args) {
    fs.mkdir(`${pwd}/${arg}`, '0777', (error) => {
      if (error?.code === 'EEXIST') {
        output(`mkdir: ${arg}: File exists`)
      }

      console.log(error)
    })
  }
}
