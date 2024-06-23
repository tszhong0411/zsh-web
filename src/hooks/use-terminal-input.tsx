import { getErrorMessage } from '@tszhong0411/utils'
import { useCallback, useEffect, useRef, useState } from 'react'

import Prompt from '@/components/terminal/prompt'
import { useCurrentDirContext } from '@/contexts/current-dir'
import { fs, getCommandHistory, init, writeCommandHistory } from '@/lib/fs'
import { splitStringAtIndex } from '@/utils/split-string-at-index'

export const useTerminalInput = () => {
  const [showLastLoginMessage, setShowLastLoginMessage] = useState(true)
  const [terminalInput, setTerminalInput] = useState('')
  const [caretPosition, setCaretPosition] = useState(0)
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [content, setContent] = useState<React.ReactNode>(null)
  const isInitialized = useRef(false)
  const { dir } = useCurrentDirContext()

  const outputHistory = useCallback(() => {
    setContent((prev) => (
      <>
        {prev}
        <Prompt>{terminalInput}</Prompt>
      </>
    ))
  }, [terminalInput])

  const output = (text: React.ReactNode) => {
    setContent((prev) => (
      <>
        {prev}
        <div>{text}</div>
      </>
    ))
  }

  const handleCommand = useCallback(
    (command: string, args: string[]) => {
      switch (command) {
        case 'clear': {
          setContent(null)
          setShowLastLoginMessage(false)
          break
        }
        case 'mkdir': {
          for (const arg of args) {
            fs.mkdir(`${dir}/${arg}`, '0777', (error) => {
              if (error && error.code === 'EEXIST') {
                output(`mkdir: ${arg}: File exists`)
              }
            })
          }
          break
        }
        case 'pwd': {
          output(dir)
          break
        }
        case 'ls': {
          const formatFiles = (files: string[]) => files.join('\n')

          if (args.length === 0) {
            fs.readdir(dir, (_, files) => {
              files && output(formatFiles(files))
            })
          } else if (args.length === 1) {
            if (!fs.existsSync(`${dir}/${args[0]}`)) {
              output(`ls: ${args[0]}: No such file or directory`)
              return
            }

            fs.readdir(`${dir}/${args[0]}`, (_, files) => {
              files && output(formatFiles(files))
            })
          } else {
            for (const arg of args) {
              if (!fs.existsSync(`${dir}/${arg}`)) {
                output(`ls: ${arg}: No such file or directory`)
                continue
              }

              fs.readdir(`${dir}/${arg}`, (_, files) => {
                files && output(`${arg}:\n${formatFiles(files)}\n`)
              })
            }
          }
          break
        }
        default: {
          output(`zsh: command not found: ${command}`)
        }
      }
    },
    [dir]
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault()
      const key = e.key

      switch (key) {
        case 'Enter': {
          outputHistory()

          try {
            if (terminalInput) {
              writeCommandHistory(terminalInput)
              setTerminalInput('')
              setCaretPosition(0)
              setHistoryIndex(-1)

              const inputWithoutMultipleSpaces = terminalInput.replaceAll(/\s+/g, ' ').trim()
              const [command, ...args] = inputWithoutMultipleSpaces.split(' ')

              if (!command) return

              handleCommand(command, args)
            }
          } catch (error) {
            output(getErrorMessage(error))
          }

          break
        }
        case 'Backspace': {
          const [caretTextBefore, caretTextAfter] = splitStringAtIndex(terminalInput, caretPosition)

          setTerminalInput(
            `${caretTextBefore ? caretTextBefore.slice(0, -1) : ''}${caretTextAfter}`
          )
          if (terminalInput && terminalInput.length > 0) setCaretPosition(caretPosition - 1)
          break
        }
        case 'Delete': {
          const [caretTextBefore, caretTextAfter] = splitStringAtIndex(terminalInput, caretPosition)

          setTerminalInput(`${caretTextBefore}${caretTextAfter ? caretTextAfter.slice(1) : ''}`)
          break
        }
        case 'ArrowLeft': {
          if (caretPosition > 0) setCaretPosition(caretPosition - 1)
          break
        }
        case 'ArrowRight': {
          if (caretPosition < terminalInput.length) setCaretPosition(caretPosition + 1)
          break
        }
        case 'ArrowUp': {
          const history = getCommandHistory()
          const previousCommand = history[historyIndex + 1]

          if (previousCommand) {
            setCaretPosition(previousCommand.length)
            setTerminalInput(previousCommand)

            if (historyIndex < history.length - 1) {
              setHistoryIndex(historyIndex + 1)
            }
          }
          break
        }
        case 'ArrowDown': {
          const history = getCommandHistory()
          const nextCommand = history[historyIndex - 1]
          if (nextCommand) {
            setCaretPosition(nextCommand.length)
            setTerminalInput(nextCommand)

            if (historyIndex > 0) {
              setHistoryIndex(historyIndex - 1)
            }
          }
          break
        }
        default: {
          if (key.length === 1) {
            const [beforeCaret, afterCaret] = splitStringAtIndex(terminalInput, caretPosition)
            setTerminalInput(`${beforeCaret}${key}${afterCaret}`)
            setCaretPosition(caretPosition + 1)
          }
        }
      }
    },
    [caretPosition, handleCommand, historyIndex, outputHistory, terminalInput]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  useEffect(() => {
    if (!isInitialized.current) {
      init()
      isInitialized.current = true
    }
  }, [])

  return { terminalInput, caretPosition, content, showLastLoginMessage }
}
