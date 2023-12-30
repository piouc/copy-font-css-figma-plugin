import { useEffect, useState } from 'react'

export const useBreakpoint = (breakpoint: string) => {
  const [match, setMatch] = useState(false)
  useEffect(() => {
    const matchMedia = window.matchMedia(`(max-width: ${breakpoint})`)
    const listener = () => {
      setMatch(matchMedia.matches)
    }
    matchMedia.addEventListener('change', listener)
    listener()
    return () => {
      matchMedia.removeEventListener('change', listener)
    }
  }, [])

  return match
}