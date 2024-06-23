'use client'

import { useTerminalInput } from '@/hooks/use-terminal-input'
import { splitStringAtIndex } from '@/utils/split-string-at-index'

import TitleBar from '../title-bar'
import Caret from './caret'
import LastLoginMessage from './last-login-message'
import Prompt from './prompt'

const Terminal = () => {
  const { terminalInput, caretPosition, content, showLastLoginMessage } = useTerminalInput()

  const [beforeCaretText, afterCaretText] = splitStringAtIndex(terminalInput, caretPosition)

  return (
    <>
      <TitleBar />
      <div className='min-h-[calc(100vh-40px)] break-words p-1 font-mono leading-6 [&_*]:whitespace-pre-wrap'>
        {showLastLoginMessage && <LastLoginMessage />}
        {content}
        <Prompt>
          <span>{beforeCaretText}</span>
          <Caret />
          <span>{afterCaretText}</span>
        </Prompt>
      </div>
    </>
  )
}

export default Terminal
