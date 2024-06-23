import { configure, fs } from '@zenfs/core'
import { IndexedDB } from '@zenfs/dom'

import { DB_NAME } from './constants'

export { fs } from '@zenfs/core'

export const init = async () => {
  await configure({
    backend: IndexedDB,
    storeName: DB_NAME
  })

  if (!fs.existsSync('initialized')) {
    fs.writeFileSync('initialized', 'true')
    fs.writeFileSync('terminal-history', '[]')
    fs.mkdirSync('Users/user', { recursive: true })
  }
}

export const getCommandHistory = () => {
  return JSON.parse(fs.readFileSync('terminal-history', 'utf8')) as string[]
}

export const writeCommandHistory = (command: string) => {
  const history = getCommandHistory()
  const newHistory = [command, ...history]

  fs.writeFileSync('terminal-history', JSON.stringify(newHistory))
}
