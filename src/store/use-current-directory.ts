import { create } from 'zustand'

type CurrentDirectoryStore = {
  directory: string
  setDirectory: (directory: string) => void
}

export const useCurrentDirectory = create<CurrentDirectoryStore>()((set) => ({
  directory: '/Users/user',
  setDirectory: (directory: string) =>
    set({
      directory
    })
}))
