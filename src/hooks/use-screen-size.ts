import { useEffect, useState } from 'react'

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: 0,
    height: 0
  })

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return screenSize
}
