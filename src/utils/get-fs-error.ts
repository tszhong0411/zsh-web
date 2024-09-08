import { ErrnoError } from '@zenfs/core'

export const getFsError = (error: unknown): ErrnoError | undefined => {
  if (error instanceof ErrnoError) {
    return error
  }

  return undefined
}
