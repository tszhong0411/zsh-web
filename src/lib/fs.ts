import { configure, fs } from '@zenfs/core'
import { IndexedDB } from '@zenfs/dom'

import { DB_NAME } from './constants'

export { fs } from '@zenfs/core'

export const init = async () => {
  await configure({
    backend: IndexedDB,
    storeName: DB_NAME
  })

  if (!fs.existsSync('terminal-history')) {
    fs.writeFileSync('terminal-history', '[]')
  }

  if (!fs.existsSync('Users')) {
    fs.mkdirSync('Users')
  }

  if (!fs.existsSync('Users/user')) {
    fs.mkdirSync('Users/user')
  }
}

export const getCommandHistory = () => {
  console.log('history', JSON.parse(fs.readFileSync('terminal-history', 'utf8')))

  return JSON.parse(fs.readFileSync('terminal-history', 'utf8')) as string[]
}

export const writeCommandHistory = (command: string) => {
  const history = getCommandHistory()

  const newHistory = [command, ...history]

  console.log('newHistory', newHistory)

  fs.writeFileSync('terminal-history', JSON.stringify(newHistory))
}
