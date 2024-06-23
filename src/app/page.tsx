'use client'

import Debug from '@/components/debug'
import Terminal from '@/components/terminal'
import { CurrentDirProvider } from '@/contexts/current-dir'

const Page = () => {
  return (
    <CurrentDirProvider value={{ dir: '/Users/user' }}>
      <Terminal />
      {process.env.NODE_ENV === 'development' ? <Debug /> : null}
    </CurrentDirProvider>
  )
}

export default Page
