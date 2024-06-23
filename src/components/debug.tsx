'use client'

import { DB_NAME } from '@/lib/constants'

const deleteIndexedDB = () => {
  indexedDB.deleteDatabase(DB_NAME)
}

const Debug = () => {
  return (
    <div className='fixed bottom-2 right-2 z-50'>
      <button type='button' onClick={deleteIndexedDB}>
        Delete IndexedDB
      </button>
    </div>
  )
}

export default Debug
