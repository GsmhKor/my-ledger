import { useMemo, useState } from 'react'
import { ALL_CATEGORIES } from '../constants/categories'
import type { LedgerTransaction, TransactionType } from '../types/transaction'
import { formatGroupDate } from '../utils/date'
import { EmptyState } from '../components/EmptyState'
import { Icon } from '../components/Icon'
import { MonthSwitcher } from '../components/MonthSwitcher'
import { TransactionRow } from '../components/TransactionRow'

interface Props {
  month: string
  onMonthChange: (month: string) => void
  transactions: LedgerTransaction[]
  onEdit: (transaction: LedgerTransaction) => void
}

export function BillsPage({ month, onMonthChange, transactions, onEdit }: Props) {
  const [search, setSearch] = useState('')
  const [type, setType] = useState<'all' | TransactionType>('all')
  const [category, setCategory] = useState('all')

  const filtered = useMemo(() => transactions.filter((item) => {
    return (type === 'all' || item.type === type) && (category === 'all' || item.category === category) && item.note.toLowerCase().includes(search.trim().toLowerCase())
  }), [transactions, search, type, category])

  const groups = useMemo(() => {
    const grouped = new Map<string, LedgerTransaction[]>()
    for (const item of filtered) grouped.set(item.date, [...(grouped.get(item.date) ?? []), item])
    return [...grouped.entries()].sort(([a], [b]) => b.localeCompare(a))
  }, [filtered])

  return <main className="page bills-page">
    <MonthSwitcher month={month} onChange={onMonthChange} />
    <label className="search-field"><Icon name="search" size={19} /><input type="search" placeholder="搜索备注" value={search} onChange={(e) => setSearch(e.target.value)} /></label>
    <div className="filter-row">
      <div className="compact-segmented">
        <button className={type === 'all' ? 'active' : ''} onClick={() => setType('all')}>全部</button>
        <button className={type === 'expense' ? 'active' : ''} onClick={() => setType('expense')}>支出</button>
        <button className={type === 'income' ? 'active' : ''} onClick={() => setType('income')}>收入</button>
      </div>
      <select aria-label="按分类筛选" value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">全部分类</option>
        {ALL_CATEGORIES.map((item) => <option key={item.id} value={item.id}>{item.emoji} {item.label}</option>)}
      </select>
    </div>
    {groups.length === 0 ? <section className="list-card"><EmptyState title="没有符合条件的账单" text="试试调整筛选条件或记一笔新账" /></section> : groups.map(([date, items]) => <section className="date-group" key={date}>
      <h2>{formatGroupDate(date)}</h2>
      <div className="list-card">{items.map((item) => <TransactionRow key={item.id} transaction={item} onClick={() => onEdit(item)} />)}</div>
    </section>)}
  </main>
}
