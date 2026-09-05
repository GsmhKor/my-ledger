import { getCategory } from '../constants/categories'
import type { LedgerTransaction } from '../types/transaction'
import { formatSignedMoney } from '../utils/currency'
import { CategorySymbol } from './CategorySymbol'

interface Props {
  transaction: LedgerTransaction
  onClick: () => void
}

export function TransactionRow({ transaction, onClick }: Props) {
  const category = getCategory(transaction.category)
  return <button className="transaction-row" onClick={onClick}>
    <span className="category-icon" style={{ background: `${category.color}1c` }}><CategorySymbol category={category} /></span>
    <span className="transaction-copy">
      <strong>{transaction.note || category.label}</strong>
      <small>{category.label}</small>
    </span>
    <span className={`transaction-amount ${transaction.type}`}>
      {formatSignedMoney(transaction.amount, transaction.type, transaction.currency)}
    </span>
  </button>
}
