'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { uid } from 'uid'

import Debug from '@/components/debug'
import Terminal from '@/components/terminal'
import { type Content, type TerminalContext, TerminalProvider } from '@/contexts/terminal'
import { HOME } from '@/lib/constants'
import { init } from '@/lib/fs'

const Page = () => {
  const [pwd, setPwd] = useState(HOME)
  const [showLastLoginMessage, setShowLastLoginMessage] = useState(true)
  const [input, setInput] = useState('')
  const [caretPosition, setCaretPosition] = useState(0)
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [content, setContent] = useState<Content>([])
  const [isReadingInput, setIsReadingInput] = useState(false)
  const isInitialized = useRef(false)

  const context = useMemo<TerminalContext>(
    () => ({
      pwd,
      setPwd,
      showLastLoginMessage,
      setShowLastLoginMessage,
      input,
      setInput,
      caretPosition,
      setCaretPosition,
      historyIndex,
      setHistoryIndex,
      content,
      setContent,
      appendContent: (element) => {
        setContent((prev) => [
          ...prev,
          {
            id: uid(),
            element
          }
        ])
      },
      isReadingInput,
      setIsReadingInput
    }),
    [caretPosition, content, historyIndex, input, isReadingInput, pwd, showLastLoginMessage]
  )

  useEffect(() => {
    if (!isInitialized.current) {
      init()
      isInitialized.current = true
    }
  }, [])

  return (
    <TerminalProvider value={context}>
      <Terminal />
      {process.env.NODE_ENV === 'development' ? <Debug /> : null}
    </TerminalProvider>
  )
}

export default Page
