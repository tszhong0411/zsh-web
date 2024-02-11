import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CommandHistoryStore = {
  commands: string[]
  appendCommand: (command: string) => void
}

export const useCommandHistory = create<CommandHistoryStore>()(
  persist(
    (set) => ({
      commands: [],
      appendCommand: (command: string) =>
        set((state) => ({
          commands: [command, ...state.commands]
        }))
    }),
    {
      name: 'command-history'
    }
  )
)
