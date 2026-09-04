import type { Currency } from '../types/transaction'

const formatters: Record<Currency, Intl.NumberFormat> = {
  JPY: new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY', maximumFractionDigits: 0 }),
  CNY: new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY', maximumFractionDigits: 0 }),
}

export function formatMoney(amount: number, currency: Currency = 'JPY') {
  return formatters[currency].format(amount)
}

export function formatSignedMoney(amount: number, type: 'expense' | 'income', currency: Currency = 'JPY') {
  return `${type === 'expense' ? '-' : '+'}${formatMoney(amount, currency)}`
}
