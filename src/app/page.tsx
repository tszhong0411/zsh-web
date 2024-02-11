'use client'

import { configure } from 'browserfs'
import { useEffect } from 'react'

import Terminal from '@/components/terminal'
import { fs } from '@/fs'

const Home = () => {
  useEffect(() => {
    configure(
      {
        fs: 'LocalStorage',
        options: undefined
      },
      () => 0
    )

    if (!localStorage.getItem('fs-initialized')) {
      fs.mkdir('/Users')
      fs.mkdir('/Users/user')

      localStorage.setItem('fs-initialized', 'true')
    }
  }, [])

  return <Terminal />
}

export default Home
