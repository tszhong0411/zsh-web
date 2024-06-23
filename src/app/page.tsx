'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import Debug from '@/components/debug'
import Terminal from '@/components/terminal'
import { type TerminalContext, TerminalProvider } from '@/contexts/terminal'
import { HOME } from '@/lib/constants'
import { init } from '@/lib/fs'

const Page = () => {
  const [pwd, setPwd] = useState(HOME)
  const [showLastLoginMessage, setShowLastLoginMessage] = useState(true)
  const [input, setInput] = useState('')
  const [caretPosition, setCaretPosition] = useState(0)
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [content, setContent] = useState<React.ReactNode>(null)
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
      setContent
    }),
    [caretPosition, content, historyIndex, input, pwd, showLastLoginMessage]
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
