import type { LedgerTransaction } from '../types/transaction'
import { formatMoney } from '../utils/currency'
import { daysInMonth } from '../utils/date'
import { MonthSwitcher } from '../components/MonthSwitcher'
import { TransactionRow } from '../components/TransactionRow'
import { EmptyState } from '../components/EmptyState'
import balanceBackground from '../assets/balance-hydrangea.png'

interface Props {
  month: string
  onMonthChange: (month: string) => void
  transactions: LedgerTransaction[]
  today: string
  todayExpense: number
  onEdit: (transaction: LedgerTransaction) => void
  onSeeAll: () => void
}

export function HomePage({ month, onMonthChange, transactions, today, todayExpense, onEdit, onSeeAll }: Props) {
  const expenses = transactions.filter((item) => item.type === 'expense')
  const expense = expenses.reduce((sum, item) => sum + item.amount, 0)
  const currentMonth = today.slice(0, 7)
  const elapsedDays = month < currentMonth ? daysInMonth(month) : month === currentMonth ? Number(today.slice(8, 10)) : 0
  const elapsedExpense = expenses.filter((item) => item.date <= today).reduce((sum, item) => sum + item.amount, 0)
  const todayExpenseText = formatMoney(todayExpense)
  const expenseText = formatMoney(expense)
  const averageText = elapsedDays ? formatMoney(elapsedExpense / elapsedDays) : '—'
  return <main className="page home-page">
    <MonthSwitcher month={month} onChange={onMonthChange} />
    <section className="balance-card">
      <img className="balance-art" src={balanceBackground} alt="" aria-hidden="true" />
      <div className="balance-main"><span>本日支出</span><strong style={{ fontSize: `clamp(14px, ${130 / Math.max(todayExpenseText.length, 8)}cqw, 43px)` }}>{todayExpenseText}</strong></div>
      <div className="balance-grid">
        <div><span><i className="expense-dot" />本月支出</span><strong style={{ fontSize: `clamp(12px, ${58 / Math.max(expenseText.length, 6)}cqw, 20px)` }}>{expenseText}</strong></div>
        <div><span><i className="income-dot" />平均支出</span><strong style={{ fontSize: `clamp(12px, ${58 / Math.max(averageText.length, 6)}cqw, 20px)` }}>{averageText}</strong></div>
      </div>
    </section>
    <div className="section-heading"><h2>最近记录</h2>{transactions.length > 0 && <button onClick={onSeeAll}>查看全部</button>}</div>
    <section className="list-card">
      {transactions.length === 0 ? <EmptyState illustration="home" /> : transactions.slice(0, 5).map((item) => <TransactionRow key={item.id} transaction={item} onClick={() => onEdit(item)} />)}
    </section>
  </main>
}
