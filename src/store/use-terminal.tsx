import { type ReactNode } from 'react'
import { create } from 'zustand'

type TerminalStore = {
  content: ReactNode
  output: (content: ReactNode) => void
  clear: () => void
}

export const useTerminal = create<TerminalStore>()((set) => ({
  content: null,
  output: (content: ReactNode) =>
    set((state) => ({
      content: (
        <>
          {state.content}
          <div>{content}</div>
        </>
      )
    })),
  clear: () => set({ content: null })
}))
