import Prompt from '@/components/terminal/prompt'
import type { TerminalContext } from '@/contexts/terminal'

import { clear } from './commands/clear'
import { ls } from './commands/ls'
import { mkdir } from './commands/mkdir'
import { pwd } from './commands/pwd'
import { whoami } from './commands/whoami'
import { writeCommandHistory } from './fs'

export type Output = (text: React.ReactNode) => void

export const handleEnterKey = (context: TerminalContext) => {
  const { input, setInput, setContent, setCaretPosition, setHistoryIndex } = context

  const output = (text: React.ReactNode) => {
    setContent((prev) => (
      <>
        {prev}
        <div>{text}</div>
      </>
    ))
  }

  // Add the input to the terminal content
  setContent((prev) => (
    <>
      {prev}
      <Prompt>{input}</Prompt>
    </>
  ))

  if (input.trim() === '') return

  // Save the input to the command history
  writeCommandHistory(input)

  // Clear the input
  setInput('')
  setCaretPosition(0)
  setHistoryIndex(-1)

  const formattedInput = input.replaceAll(/\s+/g, ' ').trim()
  const [command, ...args] = formattedInput.split(' ')

  if (!command) return

  switch (command) {
    case 'clear': {
      clear(context)
      break
    }
    case 'pwd': {
      pwd(context, output)
      break
    }
    case 'whoami': {
      whoami(output)
      break
    }
    case 'mkdir': {
      mkdir(context, args, output)
      break
    }
    case 'ls': {
      ls(context, args, output)
      break
    }
    default: {
      output(`zsh: command not found: ${command}`)
      break
    }
  }
}
