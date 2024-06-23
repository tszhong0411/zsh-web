import { createContext, useContext } from 'react'

export type TerminalContext = {
  pwd: string
  setPwd: React.Dispatch<React.SetStateAction<string>>
  showLastLoginMessage: boolean
  setShowLastLoginMessage: React.Dispatch<React.SetStateAction<boolean>>
  input: string
  setInput: React.Dispatch<React.SetStateAction<string>>
  caretPosition: number
  setCaretPosition: React.Dispatch<React.SetStateAction<number>>
  historyIndex: number
  setHistoryIndex: React.Dispatch<React.SetStateAction<number>>
  content: React.ReactNode
  setContent: React.Dispatch<React.SetStateAction<React.ReactNode>>
}

const Context = createContext<TerminalContext | undefined>(undefined)

export const useTerminalContext = () => {
  const context = useContext(Context)

  if (!context) {
    throw new Error('useTerminalContext must be used within a TerminalProvider')
  }

  return context
}

export const TerminalProvider = Context.Provider
