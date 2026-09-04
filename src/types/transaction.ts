export type TransactionType = 'expense' | 'income'
export type Currency = 'JPY' | 'CNY'

export interface LedgerTransaction {
  id: string
  amount: number
  type: TransactionType
  category: string
  date: string
  note: string
  currency: Currency
  createdAt: string
  updatedAt: string
}

export type TransactionDraft = Pick<
  LedgerTransaction,
  'amount' | 'type' | 'category' | 'date' | 'note' | 'currency'
>

export interface BackupFile {
  app: 'my-ledger'
  schemaVersion: 1
  exportedAt: string
  transactions: LedgerTransaction[]
}
