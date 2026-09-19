import { useEffect, useRef, useState } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'
import { activateAppUpdate, checkForAppUpdate } from '../services/appUpdate'

export function useAppUpdate(blocked: boolean) {
  const [registration, setRegistration] = useState<ServiceWorkerRegistration>()
  const [activatedUpdate, setActivatedUpdate] = useState(false)
  const [checking, setChecking] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [message, setMessage] = useState('')
  const [updateError, setUpdateError] = useState('')
  const checkPending = useRef(false)
  const updatePending = useRef(false)
  const { needRefresh: [needRefresh, setNeedRefresh] } = useRegisterSW({
    immediate: true,
    onRegisteredSW(_url, value) { setRegistration(value) },
    // Other windows may activate a worker; never discard an open editor.
    onNeedReload() { setActivatedUpdate(true) },
    onRegisterError() { setMessage('更新服务暂不可用，请联网后重新打开应用。') },
  })
  const available = needRefresh || activatedUpdate

  useEffect(() => {
    if (!registration) return
    const check = () => {
      if (document.hidden || checkPending.current || updatePending.current) return
      if (registration.waiting) setNeedRefresh(true)
      void registration.update().catch(() => {})
    }
    check()
    document.addEventListener('visibilitychange', check)
    window.addEventListener('pageshow', check)
    window.addEventListener('online', check)
    return () => {
      document.removeEventListener('visibilitychange', check)
      window.removeEventListener('pageshow', check)
      window.removeEventListener('online', check)
    }
  }, [registration, setNeedRefresh])

  async function checkUpdate() {
    if (checkPending.current || updatePending.current) return
    checkPending.current = true
    setChecking(true)
    setMessage('')
    try {
      if (available || await checkForAppUpdate(registration)) {
        setNeedRefresh(true)
        setUpdateError('')
        setMessage('新版本已就绪，请点击「更新应用」。')
      } else {
        setMessage('当前已是最新版本。')
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '检查更新失败，请稍后重试。')
    } finally {
      checkPending.current = false
      setChecking(false)
    }
  }

  async function applyUpdate() {
    if (blocked || !available || checkPending.current || updatePending.current) return
    updatePending.current = true
    setUpdating(true)
    setUpdateError('')
    try {
      await activateAppUpdate(registration)
      window.location.reload()
    } catch (error) {
      setUpdateError(error instanceof Error ? error.message : '更新失败，请重试。')
      updatePending.current = false
      setUpdating(false)
    }
  }

  return { ready: !!registration, available, checking, updating, updatePending, message, updateError, checkUpdate, applyUpdate }
}
