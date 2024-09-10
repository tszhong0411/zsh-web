import * as path from '@zenfs/core/emulation/path.js'
import * as fs from '@zenfs/core/promises'

import type { TerminalContext } from '@/contexts/terminal'
import { getFsError } from '@/utils/get-fs-error'

import type { Output } from '../handle-enter-key'

export const cat = async (context: TerminalContext, args: string[], output: Output) => {
  const { pwd } = context

  for (const arg of args) {
    const filePath = path.resolve(pwd, arg)

    try {
      const target = await fs.stat(filePath)

      if (target.isDirectory()) {
        output(`cat: ${arg}: Is a directory`)
        return
      }

      const content = await fs.readFile(filePath, 'utf8')
      output(content)
    } catch (error) {
      const fsError = getFsError(error)

      if (fsError?.code === 'ENOENT') {
        output(`cat: ${arg}: No such file or directory`)
      }
    }
  }
}
