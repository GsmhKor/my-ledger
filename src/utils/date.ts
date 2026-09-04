export function toLocalDateString(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function monthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

export function parseMonth(key: string) {
  const [year, month] = key.split('-').map(Number)
  return new Date(year, month - 1, 1)
}

export function shiftMonth(key: string, amount: number) {
  const date = parseMonth(key)
  date.setMonth(date.getMonth() + amount)
  return monthKey(date)
}

export function formatMonth(key: string) {
  const [year, month] = key.split('-').map(Number)
  return `${year}年${month}月`
}

export function formatGroupDate(date: string) {
  const [, month, day] = date.split('-').map(Number)
  const parsed = new Date(`${date}T00:00:00`)
  const weekdays = ['日', '一', '二', '三', '四', '五', '六']
  return `${month}月${day}日 · 周${weekdays[parsed.getDay()]}`
}

export function daysInMonth(key: string) {
  const [year, month] = key.split('-').map(Number)
  return new Date(year, month, 0).getDate()
}
