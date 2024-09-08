import * as fs from '@zenfs/core/promises'

import type { TerminalContext } from '@/contexts/terminal'
import { getFsError } from '@/utils/get-fs-error'

import type { Output } from '../handle-enter-key'

const sortFiles = (files: string[]) => files.sort((a, b) => a.localeCompare(b))
const formatFiles = (files: string[]) => files.join('\n')

export const ls = async (context: TerminalContext, args: string[], output: Output) => {
  const { pwd } = context

  if (args.length === 0) {
    const files = await fs.readdir(pwd)
    const sortedFiles = sortFiles(files)
    output(formatFiles(sortedFiles))

    return
  }

  if (args.length === 1) {
    try {
      await fs.stat(`${pwd}/${args[0]}`)
    } catch (error) {
      const fsError = getFsError(error)

      if (fsError?.code === 'ENOENT') {
        output(`ls: ${args[0]}: No such file or directory`)

        return
      }

      const files = await fs.readdir(`${pwd}/${args[0]}`)
      const sortedFiles = sortFiles(files)
      output(formatFiles(sortedFiles))
    }

    return
  }

  for (const arg of args) {
    try {
      await fs.stat(`${pwd}/${arg}`)

      const files = await fs.readdir(`${pwd}/${arg}`)

      const sortedFiles = sortFiles(files)
      output(`${arg}:\n${formatFiles(sortedFiles)}\n`)
    } catch (error) {
      const fsError = getFsError(error)

      if (fsError?.code === 'ENOENT') {
        output(`ls: ${arg}: No such file or directory`)

        return
      }
    }
  }
}
