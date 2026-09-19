import { useMemo, useRef, useState } from 'react'
import { TabBar, type Tab } from './components/TabBar'
import { TransactionEditor } from './components/TransactionEditor'
import { useDarkMode } from './hooks/useDarkMode'
import { useLedger } from './hooks/useLedger'
import { useAppUpdate } from './hooks/useAppUpdate'
import { BillsPage } from './pages/BillsPage'
import { HomePage } from './pages/HomePage'
import { SettingsPage } from './pages/SettingsPage'
import { StatsPage } from './pages/StatsPage'
import type { LedgerTransaction } from './types/transaction'
import { monthKey, toLocalDateString } from './utils/date'
import './App.css'

function App() {
  const { transactions, loading, save, remove, restore, clear } = useLedger()
  const { dark, setDark } = useDarkMode()
  const [tab, setTab] = useState<Tab>('home')
  const [month, setMonth] = useState(() => monthKey(new Date()))
  const [editorOpen, setEditorOpen] = useState(false)
  const [editing, setEditing] = useState<LedgerTransaction>()
  const [toast, setToast] = useState('')
  const [settingsWorking, setSettingsWorking] = useState(false)
  const [saving, setSaving] = useState(false)
  const pendingWrites = useRef(0)
  const updateBlocked = loading || editorOpen || settingsWorking || saving
  const appUpdate = useAppUpdate(updateBlocked)
  const monthTransactions = useMemo(() => transactions.filter((item) => item.date.startsWith(month)), [transactions, month])
  const today = toLocalDateString()
  const todayExpense = transactions.reduce((sum, item) => sum + (item.type === 'expense' && item.date === today ? item.amount : 0), 0)

  const write = async (operation: () => Promise<void>) => {
    if (appUpdate.updatePending.current) throw new Error('正在更新应用，请稍候。')
    pendingWrites.current += 1
    setSaving(true)
    try { await operation() }
    finally {
      pendingWrites.current -= 1
      setSaving(pendingWrites.current > 0)
    }
  }

  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2300)
  }
  const openNew = () => { setEditing(undefined); setEditorOpen(true) }
  const openEdit = (item: LedgerTransaction) => { setEditing(item); setEditorOpen(true) }

  return <div className="app-shell">
    <header className="app-update-toolbar">
      <button type="button" disabled={!appUpdate.ready || appUpdate.checking || appUpdate.updating} aria-busy={appUpdate.checking} onClick={() => void appUpdate.checkUpdate()}>{appUpdate.checking ? '检查中…' : '查看更新'}</button>
      {appUpdate.message && !appUpdate.available && <span role="status">{appUpdate.message}</span>}
    </header>
    {appUpdate.available && <section className="app-update-notice" aria-busy={appUpdate.updating}>
      <div role="status"><strong>{appUpdate.updateError || (appUpdate.updating ? '正在应用新版本…' : '新版本已就绪')}</strong><small>{editorOpen ? '完成记账并关闭编辑后即可更新' : updateBlocked ? '正在处理数据，请稍候…' : '桌面版也可直接更新，无需重新添加到桌面'}</small></div>
      <button type="button" disabled={updateBlocked || appUpdate.checking || appUpdate.updating} onClick={() => void appUpdate.applyUpdate()}>{appUpdate.updating ? '正在更新…' : appUpdate.updateError ? '重试更新' : '更新应用'}</button>
    </section>}
    <div inert={appUpdate.updating}>
    {loading ? <div className="app-loading"><img className="mini-app-icon" src={`${import.meta.env.BASE_URL}pwa-192x192.png`} alt="" /><span>正在打开账本…</span></div> : <>
      {tab === 'home' && <HomePage month={month} onMonthChange={setMonth} transactions={monthTransactions} onEdit={openEdit} onSeeAll={() => setTab('bills')} />}
      {tab === 'bills' && <BillsPage month={month} onMonthChange={setMonth} transactions={monthTransactions} onEdit={openEdit} />}
      {tab === 'stats' && <StatsPage month={month} onMonthChange={setMonth} transactions={monthTransactions} todayExpense={todayExpense} />}
      {tab === 'settings' && <SettingsPage transactions={transactions} dark={dark} setDark={setDark} onRestore={(items) => write(() => restore(items))} onClear={() => write(clear)} notify={notify} working={settingsWorking} setWorking={setSettingsWorking} />}
      {tab !== 'settings' && <button className="floating-add floating-add--picnic" onClick={openNew} aria-label="记一笔"></button>}
      <TabBar active={tab} onChange={setTab} />
      {editorOpen && <TransactionEditor transaction={editing} onClose={() => setEditorOpen(false)} onSave={(draft, id) => write(() => save(draft, id))} onDelete={(id) => write(() => remove(id))} notify={notify} />}
      {toast && <div className="toast" role="status">{toast}</div>}
    </>}
    </div>
  </div>
}

export default App
