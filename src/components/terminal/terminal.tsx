/**
 * TODO: Clean up the code
 * Need to understand how browserfs works
 */
import { format } from 'date-fns'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { toast, Toaster } from 'sonner'

import { useWindowFocus } from '@/hooks/use-window-focus'
import { TTY_NAME } from '@/lib/constants'
import { fs } from '@/lib/fs'
import { useCommandHistory } from '@/store/use-command-history'
import { useCurrentDirectory } from '@/store/use-current-directory'
import { useTerminal } from '@/store/use-terminal'
import { cn } from '@/utils/cn'
import { splitStringAtIndex } from '@/utils/split-string-at-index'

import TitleBar from '../title-bar'
import Prompt from './prompt'

const Terminal = () => {
  const terminalRef = useRef<HTMLDivElement>(null)
  const [terminalInput, setTerminalInput] = useState('')
  const [caretPosition, setCaretPosition] = useState(0)
  const [beforeCaretText, setBeforeCaretText] = useState('')
  const [afterCaretText, setAfterCaretText] = useState('')
  const [formattedDate, setFormattedDate] = useState('--- --- -- --:--:--')
  const isWindowFocused = useWindowFocus()
  const { commands, appendCommand } = useCommandHistory()
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isWelcomeMessageVisible, setIsWelcomeMessageVisible] = useState(true)
  const { directory } = useCurrentDirectory()
  const { content, output, clear } = useTerminal()

  const handleBackspace = useCallback(() => {
    const [caretTextBefore, caretTextAfter] = splitStringAtIndex(
      terminalInput,
      caretPosition
    )

    setTerminalInput(
      (caretTextBefore ? caretTextBefore.slice(0, -1) : '') + caretTextAfter
    )

    if (terminalInput && terminalInput.length > 0)
      setCaretPosition(caretPosition - 1)
  }, [caretPosition, terminalInput])

  const handleDelete = useCallback(() => {
    const [caretTextBefore, caretTextAfter] = splitStringAtIndex(
      terminalInput,
      caretPosition
    )

    setTerminalInput(
      caretTextBefore + (caretTextAfter ? caretTextAfter.slice(1) : '')
    )
  }, [caretPosition, terminalInput])

  const handleArrowLeft = useCallback(() => {
    if (caretPosition > 0) setCaretPosition(caretPosition - 1)
  }, [caretPosition])

  const handleArrowRight = useCallback(() => {
    if (caretPosition < terminalInput.length)
      setCaretPosition(caretPosition + 1)
  }, [caretPosition, terminalInput.length])

  const handlePaste = useCallback(() => {
    navigator.clipboard
      .readText()
      .then((text) => {
        const [caretTextBefore, caretTextAfter] = splitStringAtIndex(
          terminalInput,
          caretPosition
        )
        setTerminalInput(caretTextBefore + text + caretTextAfter)
        setCaretPosition(caretPosition + text.length)
      })
      .catch(() => {
        toast(
          <div className='flex items-center gap-4'>
            <div className='size-10'>
              <Image
                src='/images/terminal-icon.png'
                width={40}
                height={40}
                alt='Terminal icon'
              />
            </div>
            <div>
              <div className='font-semibold'>Error!</div>
              <div>Failed to paste text</div>
            </div>
          </div>
        )
      })
  }, [caretPosition, terminalInput])

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleCopy = () => {
    const selectedText = window.getSelection()?.toString()
    navigator.clipboard.writeText(selectedText ?? '')
  }

  const handleOtherKey = useCallback(
    (key: string) => {
      const [caretTextBefore, caretTextAfter] = splitStringAtIndex(
        terminalInput,
        caretPosition
      )
      setTerminalInput(caretTextBefore + key + caretTextAfter)
      setCaretPosition(caretPosition + 1)
    },
    [caretPosition, terminalInput]
  )

  // eslint-disable-next-line sonarjs/cognitive-complexity
  const handleCommand = useCallback(() => {
    output(<Prompt>{terminalInput}</Prompt>)

    if (terminalInput) {
      appendCommand(terminalInput)
      setTerminalInput('')
      setCaretPosition(0)

      const [command, ...args] = terminalInput
        .replaceAll(/\s+/g, ' ') // Replace multiple spaces with a single space
        .trim()
        .split(' ')

      if (!command) return

      switch (command) {
        case 'clear': {
          clear()
          setIsWelcomeMessageVisible(false)

          return
        }
        case 'pwd': {
          output(directory)

          return
        }
        case 'mkdir': {
          if (args.length === 0) {
            output('usage: mkdir [-pv] [-m mode] directory_name ...')
            return
          }

          for (const arg of args) {
            fs.mkdir(`${directory}/${arg}`, '0777', (error) => {
              if (error && error.code === 'EEXIST') {
                output(`mkdir: ${arg}: File exists`)
              }
            })
          }

          return
        }
        case 'ls': {
          if (args.length === 0) {
            fs.readdir(directory, (_, files) => {
              files && output(files.map((file) => `${file}\n`))
            })
          } else if (args.length === 1) {
            if (!fs.existsSync(`${directory}/${args[0]}`)) {
              output(`ls: ${args[0]}: No such file or directory`)
              return
            }

            fs.readdir(`${directory}/${args[0]}`, (_, files) => {
              files && output(files.map((file) => `${file}\n`))
            })
          } else {
            for (const arg of args) {
              if (!fs.existsSync(`${directory}/${arg}`)) {
                output(`ls: ${arg}: No such file or directory`)
                continue
              }

              fs.readdir(`${directory}/${arg}`, (_, files) => {
                files &&
                  // eslint-disable-next-line sonarjs/no-nested-template-literals, @typescript-eslint/restrict-template-expressions
                  output(`${arg}:\n${files.map((file) => `${file}\n`)}\n`)
              })
            }
          }

          return
        }
        case 'rm': {
          if (args.length === 0) {
            output(`usage: rm [-f | -i] [-dIPRrvWx] file ...
      unlink [--] file`)
            return
          }

          if (args[0] === '-r') {
            for (const arg of args.slice(1)) {
              // eslint-disable-next-line unicorn/consistent-function-scoping
              const removeDirectoryRecursive = (path: string) => {
                const files = fs.readdirSync(path)
                for (const file of files) {
                  const filePath = `${path}/${file}`
                  if (fs.statSync(filePath).isDirectory()) {
                    removeDirectoryRecursive(filePath) // Recursive call for subdirectories
                  } else {
                    fs.unlinkSync(filePath) // Remove file
                  }
                }
                fs.rmdirSync(path) // Remove empty directory
              }
              removeDirectoryRecursive(`${directory}/${arg}`)
            }

            return
          }

          for (const arg of args) {
            fs.unlink(`${directory}/${arg}`, (error) => {
              if (error) {
                // eslint-disable-next-line sonarjs/no-nested-switch
                switch (error.code) {
                  case 'EISDIR': {
                    output(`rm: ${arg}: is a directory`)
                    break
                  }
                  case 'ENOENT': {
                    output(`rm: ${arg}: No such file or directory`)
                    break
                  }
                }
              }
            })
          }

          return
        }
        default: {
          output(`zsh: command not found: ${command}`)
        }
      }
    }
  }, [appendCommand, clear, directory, output, terminalInput])

  const getPreviousCommand = useCallback(() => {
    const command = commands[historyIndex + 1]
    if (command) {
      setCaretPosition(command.length)
      setTerminalInput(command)

      if (historyIndex < commands.length - 1) {
        setHistoryIndex(historyIndex + 1)
      }
    }
  }, [commands, historyIndex])

  const getNextCommand = useCallback(() => {
    const command = commands[historyIndex - 1]
    if (command) {
      setCaretPosition(command.length)
      setTerminalInput(command)

      if (historyIndex > 0) {
        setHistoryIndex(historyIndex - 1)
      }
    }
  }, [commands, historyIndex])

  const handleKeyDownEvent = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault()

      const key = event.key

      if (key === 'Enter') {
        handleCommand()
        return
      }

      switch (key) {
        case 'Backspace': {
          handleBackspace()
          break
        }

        case 'Delete': {
          handleDelete()
          break
        }

        case 'ArrowUp': {
          getPreviousCommand()
          break
        }

        case 'ArrowDown': {
          getNextCommand()
          break
        }

        case 'ArrowLeft': {
          handleArrowLeft()
          break
        }

        case 'ArrowRight': {
          handleArrowRight()
          break
        }

        default: {
          if ((event.ctrlKey || event.metaKey) && key === 'v') {
            handlePaste()
            break
          }

          if ((event.ctrlKey || event.metaKey) && key === 'c') {
            handleCopy()
            break
          }

          if (key && key.length === 1) handleOtherKey(key)

          break
        }
      }
    },
    [
      getNextCommand,
      getPreviousCommand,
      handleArrowLeft,
      handleArrowRight,
      handleBackspace,
      handleCommand,
      handleDelete,
      handleOtherKey,
      handlePaste
    ]
  )

  useEffect(
    () => setFormattedDate(format(new Date(), 'EEE MMM d HH:mm:ss')),
    []
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDownEvent)

    return () => document.removeEventListener('keydown', handleKeyDownEvent)
  }, [handleKeyDownEvent])

  useEffect(() => {
    const [caretTextBefore, caretTextAfter] = splitStringAtIndex(
      terminalInput,
      caretPosition
    )
    setBeforeCaretText(caretTextBefore ?? '')
    setAfterCaretText(caretTextAfter ?? '')
  }, [terminalInput, caretPosition])

  return (
    <>
      <TitleBar />
      <div
        ref={terminalRef}
        className='min-h-[calc(100vh-40px)] break-words p-1 font-mono leading-6 [&_*]:whitespace-pre-wrap'
      >
        {isWelcomeMessageVisible && (
          <div>
            Last login: {formattedDate} on {TTY_NAME}
          </div>
        )}
        {content}
        <Prompt>
          {/* Text before caret */}
          <span>{beforeCaretText}</span>

          {/* Caret */}
          <span
            className={cn(
              'absolute -z-10 h-[22px] w-2.5 border border-[#9d9d9d]',
              isWindowFocused ? 'bg-[#9d9d9d]' : 'bg-transparent'
            )}
          />

          {/* Text after caret */}
          <span>{afterCaretText}</span>
        </Prompt>
      </div>
      <Toaster
        visibleToasts={1}
        position='top-right'
        closeButton
        toastOptions={{
          unstyled: true
        }}
      />
    </>
  )
}

export default Terminal
