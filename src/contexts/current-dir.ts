import { createContext, useContext } from 'react'

type CurrentDir = {
  dir: string
}

const Context = createContext<CurrentDir | undefined>(undefined)

export const useCurrentDirContext = () => {
  const context = useContext(Context)

  if (!context) {
    throw new Error('useCurrentDirContext must be used within a CurrentDirProvider')
  }

  return context
}

export const CurrentDirProvider = Context.Provider
