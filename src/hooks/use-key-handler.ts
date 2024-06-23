import { useCallback, useEffect } from 'react'

import { useTerminalContext } from '@/contexts/terminal'
import { handleArrowDownKey } from '@/lib/handle-arrow-down-key'
import { handleArrowLeftKey } from '@/lib/handle-arrow-left-key'
import { handleArrowRightKey } from '@/lib/handle-arrow-right-key'
import { handleArrowUpKey } from '@/lib/handle-arrow-up-key'
import { handleBackspaceKey } from '@/lib/handle-backspace-key'
import { handleDeleteKey } from '@/lib/handle-delete-key'
import { handleEnterKey } from '@/lib/handle-enter-key'
import { handleNormalKey } from '@/lib/handle-normal-key'

export const useKeyHandler = () => {
  const context = useTerminalContext()

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault()
      const key = e.key

      switch (key) {
        case 'Enter': {
          handleEnterKey(context)
          break
        }
        case 'Backspace': {
          handleBackspaceKey(context)
          break
        }
        case 'Delete': {
          handleDeleteKey(context)
          break
        }
        case 'ArrowLeft': {
          handleArrowLeftKey(context)
          break
        }
        case 'ArrowRight': {
          handleArrowRightKey(context)
          break
        }
        case 'ArrowUp': {
          handleArrowUpKey(context)
          break
        }
        case 'ArrowDown': {
          handleArrowDownKey(context)
          break
        }
        default: {
          if (key.length === 1) {
            handleNormalKey(context, key)
          }
          break
        }
      }
    },
    [context]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('keydown', handleKey)
    }
  }, [handleKey])
}
