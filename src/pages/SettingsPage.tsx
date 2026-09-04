import { useRef, useState } from 'react'
import { exportCsv, exportJson, readBackup } from '../services/backup'
import type { LedgerTransaction } from '../types/transaction'
import { Icon } from '../components/Icon'
import catLaptop from '../assets/cat-laptop.webp'

interface Props {
  transactions: LedgerTransaction[]
  dark: boolean
  setDark: (dark: boolean) => void
  onRestore: (items: LedgerTransaction[]) => Promise<void>
  onClear: () => Promise<void>
  notify: (message: string) => void
}

export function SettingsPage({ transactions, dark, setDark, onRestore, onClear, notify }: Props) {
  const fileInput = useRef<HTMLInputElement>(null)
  const [working, setWorking] = useState(false)

  const importBackup = async (file?: File) => {
    if (!file) return
    setWorking(true)
    try {
      const items = await readBackup(file)
      if (window.confirm(`将用备份中的 ${items.length} 笔记录覆盖当前全部数据，确定继续吗？`)) {
        await onRestore(items)
        notify(`已恢复 ${items.length} 笔记录`)
      }
    } catch (error) {
      notify(error instanceof Error ? error.message : '导入失败')
    } finally {
      setWorking(false)
      if (fileInput.current) fileInput.current.value = ''
    }
  }

  const clear = async () => {
    if (!window.confirm('确定要清空全部账单吗？建议先导出 JSON 备份。')) return
    if (!window.confirm('再次确认：所有本地账单将被永久删除，且无法撤销。')) return
    await onClear()
    notify('全部账单已清空')
  }

  return <main className="page settings-page">
    <header className="simple-header"><h1>设置</h1><p>数据只保存在此设备的浏览器中</p></header>
    <section className="privacy-banner">
      <img src={catLaptop} alt="" />
      <div><strong>账单只住在这里</strong><span>不会上传云端，记得定期备份哦</span></div>
    </section>
    <h2 className="settings-section-title">数据与备份</h2>
    <section className="settings-card">
      <button onClick={() => exportCsv(transactions)} disabled={!transactions.length}><span className="settings-icon blue"><Icon name="download" size={20} /></span><span>导出 CSV<small>便于用 Excel 查看</small></span><Icon name="chevron-right" size={18} /></button>
      <button onClick={() => exportJson(transactions)} disabled={!transactions.length}><span className="settings-icon green"><Icon name="download" size={20} /></span><span>导出完整 JSON 备份<small>包含全部账单字段</small></span><Icon name="chevron-right" size={18} /></button>
      <button onClick={() => fileInput.current?.click()} disabled={working}><span className="settings-icon orange"><Icon name="upload" size={20} /></span><span>从 JSON 恢复<small>将覆盖当前数据</small></span><Icon name="chevron-right" size={18} /></button>
      <input ref={fileInput} hidden type="file" accept="application/json,.json" onChange={(e) => importBackup(e.target.files?.[0])} />
    </section>
    <h2 className="settings-section-title">外观</h2>
    <section className="settings-card">
      <div className="setting-row"><span className="settings-icon purple"><Icon name="moon" size={20} /></span><span>深色模式</span><label className="switch"><input type="checkbox" checked={dark} onChange={(e) => setDark(e.target.checked)} /><i /></label></div>
    </section>
    <h2 className="settings-section-title">危险操作</h2>
    <section className="settings-card danger-card"><button onClick={clear} disabled={!transactions.length}><span className="settings-icon red"><Icon name="trash" size={20} /></span><span>清空全部数据<small>删除此设备上的所有账单</small></span><Icon name="chevron-right" size={18} /></button></section>
    <section className="app-info"><img className="mini-app-icon" src={`${import.meta.env.BASE_URL}pwa-192x192.png`} alt="我的账本图标" /><strong>我的账本</strong><span>版本 1.0.0</span><p>纯本地 · 无账号 · 无追踪</p></section>
  </main>
}
