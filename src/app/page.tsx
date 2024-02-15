'use client'

import { FileSystem, initialize } from 'browserfs'
import { useEffect } from 'react'

import Terminal from '@/components/terminal'
import { fs } from '@/lib/fs'

const Home = () => {
  useEffect(() => {
    initialize(new FileSystem.LocalStorage())

    if (!localStorage.getItem('fs-initialized')) {
      fs.mkdir('/Users')
      fs.mkdir('/Users/user')

      localStorage.setItem('fs-initialized', 'true')
    }
  }, [])

  return <Terminal />
}

export default Home
