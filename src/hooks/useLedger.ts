import { useCallback, useEffect, useState } from 'react'
import {
  clearAllTransactions,
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  replaceAllTransactions,
  updateTransaction,
} from '../services/database'
import type { LedgerTransaction, TransactionDraft } from '../types/transaction'

export function useLedger() {
  const [transactions, setTransactions] = useState<LedgerTransaction[]>([])
  const [loading, setLoading] = useState(true)

  const reload = useCallback(async () => {
    setTransactions(await getAllTransactions())
    setLoading(false)
  }, [])

  useEffect(() => {
    let cancelled = false
    getAllTransactions()
      .then((items) => {
        if (!cancelled) setTransactions(items)
      })
      .catch(() => {
        if (!cancelled) setTransactions([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  const save = async (draft: TransactionDraft, id?: string) => {
    if (id) await updateTransaction(id, draft)
    else await createTransaction(draft)
    await reload()
  }

  const remove = async (id: string) => {
    await deleteTransaction(id)
    await reload()
  }

  const restore = async (items: LedgerTransaction[]) => {
    await replaceAllTransactions(items)
    await reload()
  }

  const clear = async () => {
    await clearAllTransactions()
    await reload()
  }

  return { transactions, loading, save, remove, restore, clear }
}
