import { openDB, type DBSchema } from 'idb'
import type { LedgerTransaction, TransactionDraft } from '../types/transaction'

interface LedgerDB extends DBSchema {
  transactions: {
    key: string
    value: LedgerTransaction
    indexes: { date: string; type: string; category: string }
  }
}

const dbPromise = openDB<LedgerDB>('my-ledger-db', 1, {
  upgrade(db) {
    const store = db.createObjectStore('transactions', { keyPath: 'id' })
    store.createIndex('date', 'date')
    store.createIndex('type', 'type')
    store.createIndex('category', 'category')
  },
})

function createId() {
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  const random = crypto.getRandomValues(new Uint32Array(2)).join('')
  return `${Date.now()}-${random}`
}

export async function getAllTransactions() {
  const values = await (await dbPromise).getAll('transactions')
  return values.sort((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt))
}

export async function createTransaction(draft: TransactionDraft) {
  const now = new Date().toISOString()
  const transaction: LedgerTransaction = {
    ...draft,
    amount: Math.round(draft.amount),
    id: createId(),
    createdAt: now,
    updatedAt: now,
  }
  await (await dbPromise).add('transactions', transaction)
  return transaction
}

export async function updateTransaction(id: string, draft: TransactionDraft) {
  const db = await dbPromise
  const current = await db.get('transactions', id)
  if (!current) throw new Error('账单不存在')
  const transaction: LedgerTransaction = {
    ...current,
    ...draft,
    amount: Math.round(draft.amount),
    updatedAt: new Date().toISOString(),
  }
  await db.put('transactions', transaction)
  return transaction
}

export async function deleteTransaction(id: string) {
  await (await dbPromise).delete('transactions', id)
}

export async function replaceAllTransactions(transactions: LedgerTransaction[]) {
  const tx = (await dbPromise).transaction('transactions', 'readwrite')
  await tx.store.clear()
  for (const transaction of transactions) await tx.store.put(transaction)
  await tx.done
}

export async function clearAllTransactions() {
  await (await dbPromise).clear('transactions')
}
