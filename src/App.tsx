import { useMemo, useState } from 'react'
import { TabBar, type Tab } from './components/TabBar'
import { TransactionEditor } from './components/TransactionEditor'
import { useDarkMode } from './hooks/useDarkMode'
import { useLedger } from './hooks/useLedger'
import { BillsPage } from './pages/BillsPage'
import { HomePage } from './pages/HomePage'
import { SettingsPage } from './pages/SettingsPage'
import { StatsPage } from './pages/StatsPage'
import type { LedgerTransaction } from './types/transaction'
import { monthKey } from './utils/date'
import './App.css'

function App() {
  const { transactions, loading, save, remove, restore, clear } = useLedger()
  const { dark, setDark } = useDarkMode()
  const [tab, setTab] = useState<Tab>('home')
  const [month, setMonth] = useState(() => monthKey(new Date()))
  const [editorOpen, setEditorOpen] = useState(false)
  const [editing, setEditing] = useState<LedgerTransaction>()
  const [toast, setToast] = useState('')
  const monthTransactions = useMemo(() => transactions.filter((item) => item.date.startsWith(month)), [transactions, month])

  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2300)
  }
  const openNew = () => { setEditing(undefined); setEditorOpen(true) }
  const openEdit = (item: LedgerTransaction) => { setEditing(item); setEditorOpen(true) }

  return <div className="app-shell">
    {loading ? <div className="app-loading"><img className="mini-app-icon" src={`${import.meta.env.BASE_URL}pwa-192x192.png`} alt="" /><span>正在打开账本…</span></div> : <>
      {tab === 'home' && <HomePage month={month} onMonthChange={setMonth} transactions={monthTransactions} onEdit={openEdit} onSeeAll={() => setTab('bills')} />}
      {tab === 'bills' && <BillsPage month={month} onMonthChange={setMonth} transactions={monthTransactions} onEdit={openEdit} />}
      {tab === 'stats' && <StatsPage month={month} onMonthChange={setMonth} transactions={monthTransactions} />}
      {tab === 'settings' && <SettingsPage transactions={transactions} dark={dark} setDark={setDark} onRestore={restore} onClear={clear} notify={notify} />}
      <button className={`floating-add${tab === 'home' ? ' floating-add--picnic' : ''}`} onClick={openNew} aria-label="记一笔"></button>
      <TabBar active={tab} onChange={setTab} />
      {editorOpen && <TransactionEditor transaction={editing} onClose={() => setEditorOpen(false)} onSave={save} onDelete={remove} notify={notify} />}
      {toast && <div className="toast" role="status">{toast}</div>}
    </>}
  </div>
}

export default App
