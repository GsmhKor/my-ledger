import { useEffect, useState } from 'react'
import { toLocalDateString } from '../utils/date'

export function useLocalDate() {
  const [today, setToday] = useState(() => toLocalDateString())

  useEffect(() => {
    let timer: number | undefined
    const refresh = () => {
      window.clearTimeout(timer)
      const now = new Date()
      setToday(toLocalDateString(now))
      // Use the next local midnight, including days with daylight-saving changes.
      const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
      timer = window.setTimeout(refresh, midnight.getTime() - now.getTime() + 50)
    }
    const onVisibilityChange = () => {
      if (!document.hidden) refresh()
    }

    refresh()
    document.addEventListener('visibilitychange', onVisibilityChange)
    window.addEventListener('pageshow', refresh)
    window.addEventListener('focus', refresh)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('pageshow', refresh)
      window.removeEventListener('focus', refresh)
    }
  }, [])

  return today
}
