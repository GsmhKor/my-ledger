import { getCategory } from '../constants/categories'
import type { LedgerTransaction } from '../types/transaction'
import { formatMoney } from '../utils/currency'
import { daysInMonth } from '../utils/date'
import { EmptyState } from '../components/EmptyState'
import { MonthSwitcher } from '../components/MonthSwitcher'

interface Props {
  month: string
  onMonthChange: (month: string) => void
  transactions: LedgerTransaction[]
}

export function StatsPage({ month, onMonthChange, transactions }: Props) {
  const expenses = transactions.filter((item) => item.type === 'expense')
  const total = expenses.reduce((sum, item) => sum + item.amount, 0)
  const totals = new Map<string, number>()
  expenses.forEach((item) => totals.set(item.category, (totals.get(item.category) ?? 0) + item.amount))
  const categoryStats = [...totals].map(([id, amount]) => ({ category: getCategory(id), amount })).sort((a, b) => b.amount - a.amount)
  const gradient = categoryStats.length ? categoryStats.reduce<{ parts: string[]; cursor: number }>((acc, item) => {
    const end = acc.cursor + item.amount / total * 100
    acc.parts.push(`${item.category.color} ${acc.cursor}% ${end}%`)
    acc.cursor = end
    return acc
  }, { parts: [], cursor: 0 }).parts.join(',') : 'var(--fill) 0 100%'
  const daily = Array.from({ length: daysInMonth(month) }, (_, index) => {
    const day = index + 1
    const amount = expenses.filter((item) => Number(item.date.slice(8, 10)) === day).reduce((sum, item) => sum + item.amount, 0)
    return { day, amount }
  })
  const maxDaily = Math.max(...daily.map((item) => item.amount), 1)

  return <main className="page stats-page">
    <MonthSwitcher month={month} onChange={onMonthChange} />
    {expenses.length === 0 ? <section className="list-card"><EmptyState title="本月还没有支出" text="有记录后，这里会展示消费构成和趋势" /></section> : <>
      <section className="chart-card">
        <div className="section-heading"><h2>支出分类</h2><span>共 {formatMoney(total)}</span></div>
        <div className="donut-wrap">
          <div className="donut" style={{ background: `conic-gradient(${gradient})` }}><div><small>本月支出</small><strong>{formatMoney(total)}</strong></div></div>
        </div>
        <div className="legend-list">{categoryStats.map((item) => <div key={item.category.id}>
          <i style={{ background: item.category.color }} /><span>{item.category.emoji} {item.category.label}</span><strong>{formatMoney(item.amount)}</strong><small>{Math.round(item.amount / total * 100)}%</small>
        </div>)}</div>
      </section>
      <section className="chart-card trend-card">
        <div className="section-heading"><h2>每日支出</h2><span>峰值 {formatMoney(maxDaily)}</span></div>
        <div className="bar-chart" aria-label="本月每日支出柱状图">
          {daily.map((item) => <div className="bar-column" key={item.day} title={`${item.day}日 ${formatMoney(item.amount)}`}>
            <i style={{ height: `${Math.max(item.amount / maxDaily * 100, item.amount ? 5 : 1)}%` }} />
            {(item.day === 1 || item.day % 5 === 0 || item.day === daily.length) && <small>{item.day}</small>}
          </div>)}
        </div>
      </section>
    </>}
  </main>
}
