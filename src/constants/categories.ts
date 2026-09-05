import type { TransactionType } from '../types/transaction'

export interface Category {
  id: string
  label: string
  emoji: string
  color: string
  type: TransactionType
  retired?: boolean
}

export const EXPENSE_CATEGORIES: Category[] = [
  { id: 'food', label: '餐饮', emoji: '🍜', color: '#ff8a65', type: 'expense' },
  { id: 'grocery', label: '超市', emoji: '🛒', color: '#66bb6a', type: 'expense' },
  { id: 'transport', label: '交通', emoji: '🚃', color: '#42a5f5', type: 'expense' },
  { id: 'shopping', label: '购物', emoji: '🛍️', color: '#ab7bea', type: 'expense' },
  { id: 'rent', label: '房租', emoji: '🏠', color: '#ef6c75', type: 'expense', retired: true },
  { id: 'utilities', label: '水电煤', emoji: '💡', color: '#f5b942', type: 'expense', retired: true },
  { id: 'phone', label: '通讯', emoji: '📱', color: '#26a69a', type: 'expense', retired: true },
  { id: 'entertainment', label: '娱乐', emoji: '🎮', color: '#7e8ce0', type: 'expense', retired: true },
  { id: 'medical', label: '医疗', emoji: '💊', color: '#ec6f91', type: 'expense', retired: true },
  { id: 'daily', label: '日用品', emoji: '🧻', color: '#8d9c75', type: 'expense' },
  { id: 'pet', label: '宠物', emoji: '🐱', color: '#d9955e', type: 'expense' },
  { id: 'travel', label: '旅行', emoji: '✈️', color: '#3bb7ad', type: 'expense', retired: true },
  { id: 'other-expense', label: '其他', emoji: '📦', color: '#8e8e93', type: 'expense' },
]

export const INCOME_CATEGORIES: Category[] = [
  { id: 'salary', label: '工资', emoji: '💼', color: '#34c759', type: 'income' },
  { id: 'bonus', label: '奖金', emoji: '🎁', color: '#30b0c7', type: 'income' },
  { id: 'refund', label: '退款', emoji: '↩️', color: '#5ac8fa', type: 'income' },
  { id: 'investment', label: '投资收益', emoji: '📈', color: '#62b06f', type: 'income' },
  { id: 'other-income', label: '其他收入', emoji: '💰', color: '#8e8e93', type: 'income' },
]

export const ALL_CATEGORIES = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES]

// Keep retired definitions for existing records, filters and backup labels.
// An existing record may retain its own retired category while being edited.
export function categoriesFor(type: TransactionType, existingCategory?: string) {
  const categories = type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES
  return categories.filter((category) => !category.retired || category.id === existingCategory)
}

export function getCategory(id: string) {
  return ALL_CATEGORIES.find((category) => category.id === id) ?? {
    id,
    label: '其他',
    emoji: '📦',
    color: '#8e8e93',
    type: 'expense' as const,
  }
}
