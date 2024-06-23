import fs from '@zenfs/core'

import type { TerminalContext } from '@/contexts/terminal'

import type { Output } from '../handle-enter-key'

const sortFiles = (files: string[]) => files.sort((a, b) => a.localeCompare(b))
const formatFiles = (files: string[]) => files.join('\n')

export const ls = (context: TerminalContext, args: string[], output: Output) => {
  const { pwd } = context

  if (args.length === 0) {
    fs.readdir(pwd, (_, files = []) => {
      const sortedFiles = sortFiles(files)
      output(formatFiles(sortedFiles))
    })

    return
  }

  if (args.length === 1) {
    fs.stat(`${pwd}/${args[0]}`, (error) => {
      if (error?.code === 'ENOENT') {
        output(`ls: ${args[0]}: No such file or directory`)

        return
      }

      fs.readdir(`${pwd}/${args[0]}`, (_, files = []) => {
        const sortedFiles = sortFiles(files)
        output(formatFiles(sortedFiles))
      })
    })

    return
  }

  for (const arg of args) {
    fs.stat(`${pwd}/${arg}`, (error) => {
      if (error?.code === 'ENOENT') {
        output(`ls: ${arg}: No such file or directory`)

        return
      }

      fs.readdir(`${pwd}/${arg}`, (_, files = []) => {
        const sortedFiles = sortFiles(files)
        output(`${arg}:\n${formatFiles(sortedFiles)}\n`)
      })
    })
  }
}
