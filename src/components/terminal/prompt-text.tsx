import { useCallback, useEffect } from 'react'

import { useTerminalContext } from '@/contexts/terminal'
import { splitStringAtIndex } from '@/utils/split-string-at-index'

import Caret from './caret'

type PromptTextProps = {
  callback?: (value: string) => void
}

const PromptText = (props: PromptTextProps) => {
  const { callback } = props
  const { input, caretPosition } = useTerminalContext()
  const [beforeCaretText, afterCaretText] = splitStringAtIndex(input, caretPosition)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        callback?.(input)
      }
    },
    [callback, input]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return (
    <>
      <span>{beforeCaretText}</span>
      <Caret />
      <span>{afterCaretText}</span>
    </>
  )
}

export default PromptText
