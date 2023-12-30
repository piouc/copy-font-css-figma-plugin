import {useEffect} from 'react'

export const useExternalCss = (url: string) => {
  useEffect(() => {
    const link = document.createElement('link')
    link.href = url
    link.rel = 'stylesheet'
    document.head.appendChild(link)
    return () => {
      document.head.removeChild(link)
    }
  }, [])
}