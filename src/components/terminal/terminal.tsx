'use client'

import { cloneElement } from 'react'

import { useTerminalContext } from '@/contexts/terminal'
import { useKeyHandler } from '@/hooks/use-key-handler'

import TitleBar from '../title-bar'
import LastLoginMessage from './last-login-message'
import Prompt from './prompt'
import PromptText from './prompt-text'

const Terminal = () => {
  const { pwd, showLastLoginMessage, content, isReadingInput } = useTerminalContext()

  useKeyHandler()

  return (
    <>
      <TitleBar />
      <div className='min-h-[calc(100vh-40px)] break-words p-1 font-mono leading-6 [&_*]:whitespace-pre-wrap'>
        {showLastLoginMessage && <LastLoginMessage />}
        {/* eslint-disable-next-line @eslint-react/no-clone-element -- it's fine */}
        {content.map((line) => cloneElement(line.element, { key: line.id }))}
        {isReadingInput ? null : (
          <Prompt pwd={pwd}>
            <PromptText />
          </Prompt>
        )}
      </div>
    </>
  )
}

export default Terminal
