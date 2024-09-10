import * as path from '@zenfs/core/emulation/path.js'
import * as fs from '@zenfs/core/promises'

import type { TerminalContext } from '@/contexts/terminal'
import { getFsError } from '@/utils/get-fs-error'

import { HOME } from '../constants'
import type { Output } from '../handle-enter-key'

export const cd = async (context: TerminalContext, args: string[], output: Output) => {
  const { pwd, setPwd } = context

  if (args.length === 0 || args[0] === '~') {
    setPwd(HOME)

    return
  }

  if (args.length > 1) {
    output('cd: too many arguments')

    return
  }

  const target = args[0]

  if (!target) return

  const normalizedPath = path.isAbsolute(target)
    ? path.normalize(target)
    : path.resolve(pwd, target)

  try {
    const stats = await fs.stat(normalizedPath)

    if (!stats.isDirectory()) {
      output(`cd: not a directory: ${target}`)

      return
    }

    setPwd(normalizedPath)
  } catch (error) {
    const fsError = getFsError(error)

    if (fsError?.code === 'ENOENT') {
      output(`cd: no such file or directory: ${target}`)
    }
  }
}
