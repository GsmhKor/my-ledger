import type { LedgerTransaction } from '../types/transaction'
import { formatMoney } from '../utils/currency'
import { MonthSwitcher } from '../components/MonthSwitcher'
import { TransactionRow } from '../components/TransactionRow'
import { EmptyState } from '../components/EmptyState'
import balanceBackground from '../assets/balance-hydrangea.png'

interface Props {
  month: string
  onMonthChange: (month: string) => void
  transactions: LedgerTransaction[]
  onEdit: (transaction: LedgerTransaction) => void
  onSeeAll: () => void
}

export function HomePage({ month, onMonthChange, transactions, onEdit, onSeeAll }: Props) {
  const expense = transactions.filter((item) => item.type === 'expense').reduce((sum, item) => sum + item.amount, 0)
  const income = transactions.filter((item) => item.type === 'income').reduce((sum, item) => sum + item.amount, 0)
  const balanceText = formatMoney(income - expense)
  const expenseText = formatMoney(expense)
  const incomeText = formatMoney(income)
  return <main className="page home-page">
    <MonthSwitcher month={month} onChange={onMonthChange} />
    <section className="balance-card">
      <img className="balance-art" src={balanceBackground} alt="" aria-hidden="true" />
      <div className="balance-main"><span>本月结余</span><strong style={{ fontSize: `clamp(14px, ${130 / Math.max(balanceText.length, 8)}cqw, 43px)` }}>{balanceText}</strong></div>
      <div className="balance-grid">
        <div><span><i className="expense-dot" />本月支出</span><strong style={{ fontSize: `clamp(12px, ${58 / Math.max(expenseText.length, 6)}cqw, 20px)` }}>{expenseText}</strong></div>
        <div><span><i className="income-dot" />本月收入</span><strong style={{ fontSize: `clamp(12px, ${58 / Math.max(incomeText.length, 6)}cqw, 20px)` }}>{incomeText}</strong></div>
      </div>
    </section>
    <div className="section-heading"><h2>最近记录</h2>{transactions.length > 0 && <button onClick={onSeeAll}>查看全部</button>}</div>
    <section className="list-card">
      {transactions.length === 0 ? <EmptyState /> : transactions.slice(0, 5).map((item) => <TransactionRow key={item.id} transaction={item} onClick={() => onEdit(item)} />)}
    </section>
  </main>
}
