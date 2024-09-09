import * as fs from '@zenfs/core/promises'
import arg from 'arg'

import type { TerminalContext } from '@/contexts/terminal'
import { getFsError } from '@/utils/get-fs-error'

import type { Output, ReadInput } from '../handle-enter-key'

export const rm = async (
  context: TerminalContext,
  args: string[],
  output: Output,
  readInput: ReadInput
) => {
  const { pwd } = context

  const argv = arg(
    {
      '--force': Boolean,
      '--interactive': Boolean,
      '--dir': Boolean,
      '--preserve-root': Boolean,
      '--recursive': Boolean,
      '--verbose': Boolean,

      '-f': '--force',
      '-i': '--interactive',
      '-d': '--dir',
      '-I': Boolean,
      '-P': '--preserve-root',
      '-R': '--recursive',
      '-r': '--recursive',
      '-v': '--verbose',
      '-W': Boolean,
      '-x': Boolean
    },
    {
      argv: args,
      stopAtPositional: true
    }
  )

  const targets = argv._

  if (targets.length === 0) {
    output('usage: rm [-f | -i] [-dIPRrvWx] file ...\n       unlink [--] file')
    return
  }

  for (const target of targets) {
    try {
      const onSuccess = () => {
        if (argv['--verbose']) {
          output(target)
        }
      }

      if (argv['--interactive']) {
        await fs.stat(`${pwd}/${target}`)

        const value = (await readInput(`examine files in directory ${target}? `))
          .trim()
          .toLowerCase()

        if (value !== 'y' && value !== 'yes') continue

        const value2 = (await readInput(`remove ${target}? `)).trim().toLowerCase()

        if (value2 !== 'y' && value2 !== 'yes') continue
      }

      if (argv['--recursive']) {
        await fs.rm(`${pwd}/${target}`, { recursive: true })

        onSuccess()
        continue
      }

      await fs.unlink(`${pwd}/${target}`)
      onSuccess()
    } catch (error) {
      const fsError = getFsError(error)

      if (fsError?.code === 'ENOENT') {
        output(`rm: ${target}: No such file or directory`)
      }

      if (fsError?.code === 'EISDIR') {
        output(`rm: ${target}: is a directory`)
      }
    }
  }
}
