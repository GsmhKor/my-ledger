import { useEffect, useState } from 'react'

export function useDarkMode() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('my-ledger-theme')
    return saved === 'dark'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
    localStorage.setItem('my-ledger-theme', dark ? 'dark' : 'light')
  }, [dark])

  return { dark, setDark }
}
