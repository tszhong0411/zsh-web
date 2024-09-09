import * as fs from '@zenfs/core/promises'
import arg from 'arg'

import type { TerminalContext } from '@/contexts/terminal'
import { getFsError } from '@/utils/get-fs-error'

import type { Output } from '../handle-enter-key'

export const mkdir = async (context: TerminalContext, args: string[], output: Output) => {
  const { pwd } = context

  const argv = arg(
    {
      '--verbose': Boolean,
      '--parents': Boolean,
      '--mode': Number,

      '-v': '--verbose',
      '-p': '--parents',
      '-m': '--mode'
    },
    {
      argv: args,
      stopAtPositional: true
    }
  )

  const dirs = argv._

  if (dirs.length === 0) {
    output('usage: mkdir [-pv] [-m mode] directory_name ...')
    return
  }

  const mode = argv['--mode'] ?? 0o777

  for (const dir of dirs) {
    if (argv['--parents']) {
      const parts = dir.split('/')
      let currentPath = pwd

      for (const part of parts) {
        currentPath += `/${part}`
        try {
          await fs.mkdir(currentPath, { mode })
          if (argv['--verbose']) {
            output(currentPath.replace(`${pwd}/`, ''))
          }
        } catch (error) {
          const fsError = getFsError(error)
          if (fsError?.code === 'EEXIST') continue
          console.log({ error, v: argv['--verbose'], p: argv['--parents'] })
        }
      }

      continue
    }

    try {
      await fs.mkdir(`${pwd}/${dir}`, { mode })
      if (argv['--verbose']) {
        output(dir)
      }
    } catch (error) {
      console.log({ error, v: argv['--verbose'], p: argv['--parents'] })

      const fsError = getFsError(error)

      if (fsError?.code === 'EEXIST') {
        output(`mkdir: ${dir}: File exists`)
      }
      if (fsError?.code === 'ENOENT') {
        output(`mkdir: ${dir}: No such file or directory`)
      }
    }
  }
}
