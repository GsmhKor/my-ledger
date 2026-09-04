import { getCategory } from '../constants/categories'
import type { BackupFile, LedgerTransaction } from '../types/transaction'

function downloadFile(name: string, contents: string, type: string) {
  const url = URL.createObjectURL(new Blob([contents], { type }))
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = name
  anchor.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

function escapeCsv(value: string | number) {
  const text = String(value)
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text
}

export function exportCsv(transactions: LedgerTransaction[]) {
  const rows = [
    ['日期', '类型', '分类', '金额', '币种', '备注'],
    ...transactions.map((item) => [
      item.date,
      item.type === 'expense' ? '支出' : '收入',
      getCategory(item.category).label,
      item.amount,
      item.currency,
      item.note,
    ]),
  ]
  const csv = `\uFEFF${rows.map((row) => row.map(escapeCsv).join(',')).join('\r\n')}`
  downloadFile(`我的账本-${new Date().toISOString().slice(0, 10)}.csv`, csv, 'text/csv;charset=utf-8')
}

export function exportJson(transactions: LedgerTransaction[]) {
  const backup: BackupFile = {
    app: 'my-ledger',
    schemaVersion: 1,
    exportedAt: new Date().toISOString(),
    transactions,
  }
  downloadFile(
    `我的账本-完整备份-${new Date().toISOString().slice(0, 10)}.json`,
    JSON.stringify(backup, null, 2),
    'application/json',
  )
}

function isTransaction(value: unknown): value is LedgerTransaction {
  if (!value || typeof value !== 'object') return false
  const item = value as Record<string, unknown>
  return (
    typeof item.id === 'string' &&
    Number.isSafeInteger(item.amount) && Number(item.amount) > 0 &&
    (item.type === 'expense' || item.type === 'income') &&
    typeof item.category === 'string' &&
    typeof item.date === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(item.date) &&
    typeof item.note === 'string' &&
    (item.currency === 'JPY' || item.currency === 'CNY') &&
    typeof item.createdAt === 'string' &&
    typeof item.updatedAt === 'string'
  )
}

export async function readBackup(file: File) {
  const parsed: unknown = JSON.parse(await file.text())
  if (!parsed || typeof parsed !== 'object') throw new Error('备份文件格式不正确')
  const backup = parsed as Partial<BackupFile>
  if (backup.app !== 'my-ledger' || backup.schemaVersion !== 1 || !Array.isArray(backup.transactions)) {
    throw new Error('这不是有效的「我的账本」备份')
  }
  if (!backup.transactions.every(isTransaction)) throw new Error('备份中包含无效账单')
  return backup.transactions
}
