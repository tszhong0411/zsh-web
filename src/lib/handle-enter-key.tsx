import Prompt from '@/components/terminal/prompt'
import PromptText from '@/components/terminal/prompt-text'
import type { TerminalContext } from '@/contexts/terminal'

import { cd } from './commands/cd'
import { clear } from './commands/clear'
import { ls } from './commands/ls'
import { mkdir } from './commands/mkdir'
import { pwd } from './commands/pwd'
import { rm } from './commands/rm'
import { whoami } from './commands/whoami'
import { writeCommandHistory } from './fs'

export type Output = (text: React.ReactNode) => void
export type ReadInput = (text: string) => Promise<string>

export const handleEnterKey = async (context: TerminalContext) => {
  const {
    pwd: currentPath,
    input,
    setInput,
    setContent,
    appendContent,
    setCaretPosition,
    setHistoryIndex,
    setIsReadingInput
  } = context

  const output = (text: React.ReactNode) => {
    appendContent(<div>{text}</div>)
  }

  const readInput = (text: string): Promise<string> => {
    setIsReadingInput(true)

    return new Promise((resolve) => {
      appendContent(
        <div>
          {text}
          <PromptText
            callback={(value) => {
              setIsReadingInput(false)
              setInput('')
              setContent((prev) => {
                const lastIndex = prev.length - 1
                const lastElement = prev.at(-1)

                const updatedContent = [...prev]

                if (!lastElement) return updatedContent

                updatedContent[lastIndex] = {
                  ...lastElement,
                  element: (
                    <div>
                      {text}
                      {value}
                    </div>
                  )
                }

                return updatedContent
              })
              resolve(value)
            }}
          />
        </div>
      )
    })
  }

  // Add the input to the terminal content
  appendContent(<Prompt pwd={currentPath}>{input}</Prompt>)

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
      await mkdir(context, args, output)
      break
    }
    case 'ls': {
      ls(context, args, output)
      break
    }
    case 'rm': {
      rm(context, args, output, readInput)
      break
    }
    case 'cd': {
      cd(context, args, output)
      break
    }
    default: {
      output(`zsh: command not found: ${command}`)
      break
    }
  }
}
