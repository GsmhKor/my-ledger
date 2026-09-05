import { useEffect, useState } from 'react'
import { categoriesFor } from '../constants/categories'
import type { LedgerTransaction, TransactionDraft, TransactionType } from '../types/transaction'
import { toLocalDateString } from '../utils/date'
import { Icon } from './Icon'
import { CategorySymbol } from './CategorySymbol'

interface Props {
  transaction?: LedgerTransaction
  onClose: () => void
  onSave: (draft: TransactionDraft, id?: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
  notify: (message: string) => void
}

export function TransactionEditor({ transaction, onClose, onSave, onDelete, notify }: Props) {
  const initialType = transaction?.type ?? 'expense'
  const [type, setType] = useState<TransactionType>(initialType)
  const [amount, setAmount] = useState(transaction ? String(transaction.amount) : '')
  const [category, setCategory] = useState(transaction?.category ?? categoriesFor(initialType)[0].id)
  const [date, setDate] = useState(transaction?.date ?? toLocalDateString())
  const [note, setNote] = useState(transaction?.note ?? '')
  const [saving, setSaving] = useState(false)
  const availableCategories = categoriesFor(type, transaction?.category)

  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => document.body.classList.remove('modal-open')
  }, [])

  const changeType = (next: TransactionType) => {
    if (next === type) return
    setType(next)
    setCategory(categoriesFor(next)[0].id)
  }

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    const numericAmount = Number(amount)
    if (!Number.isSafeInteger(numericAmount) || numericAmount <= 0) {
      notify('请输入大于 0 的整数金额')
      return
    }
    setSaving(true)
    try {
      await onSave({ amount: numericAmount, type, category, date, note: note.trim(), currency: 'JPY' }, transaction?.id)
      notify(transaction ? '账单已更新' : '已记一笔')
      onClose()
    } catch {
      notify('保存失败，请重试')
      setSaving(false)
    }
  }

  const remove = async () => {
    if (!transaction || !window.confirm('确定删除这笔账单吗？此操作无法撤销。')) return
    await onDelete(transaction.id)
    notify('账单已删除')
    onClose()
  }

  return <div className="sheet-backdrop" role="presentation">
    <section className="editor-sheet" role="dialog" aria-modal="true" aria-labelledby="editor-title">
      <header className="sheet-header">
        <button className="icon-button" onClick={onClose} aria-label="关闭"><Icon name="close" /></button>
        <h2 id="editor-title">{transaction ? '编辑账单' : '记一笔'}</h2>
        <button className="save-text" form="transaction-form" type="submit" disabled={saving}>{saving ? '保存中' : '保存'}</button>
      </header>
      <form id="transaction-form" onSubmit={submit}>
        <div className="type-segmented">
          <button type="button" className={type === 'expense' ? 'active expense' : ''} onClick={() => changeType('expense')}>支出</button>
          <button type="button" className={type === 'income' ? 'active income' : ''} onClick={() => changeType('income')}>收入</button>
        </div>
        <label className="amount-field">
          <span>金额</span>
          <div><b>¥</b><input autoFocus inputMode="numeric" pattern="[0-9]*" placeholder="0" value={amount} onChange={(e) => setAmount(e.target.value.replace(/\D/g, '').replace(/^0+(?=\d)/, ''))} /></div>
        </label>
        <fieldset className="category-fieldset">
          <legend>分类</legend>
          <div className="category-grid">
            {availableCategories.map((item) => <button key={item.id} type="button" className={category === item.id ? 'selected' : ''} aria-pressed={category === item.id} onClick={() => setCategory(item.id)}>
              <CategorySymbol category={item} /><small>{item.label}</small>
            </button>)}
          </div>
        </fieldset>
        <div className="form-card">
          <label><span>日期</span><input type="date" required value={date} onChange={(e) => setDate(e.target.value)} /></label>
          <label><span>备注</span><input type="text" maxLength={100} placeholder="写点什么（可选）" value={note} onChange={(e) => setNote(e.target.value)} /></label>
        </div>
        <button className="primary-button" disabled={saving}>{transaction ? '保存修改' : '记下这笔'}</button>
        {transaction && <button className="danger-text-button" type="button" onClick={remove}><Icon name="trash" size={19} />删除这笔账单</button>}
      </form>
    </section>
  </div>
}
