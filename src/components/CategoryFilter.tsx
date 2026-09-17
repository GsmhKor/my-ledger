import { useEffect, useRef } from 'react'
import type { Category } from '../constants/categories'
import { CategorySymbol } from './CategorySymbol'

interface Props {
  categories: Category[]
  value: string
  onChange: (value: string) => void
}

export function CategoryFilter({ categories, value, onChange }: Props) {
  const details = useRef<HTMLDetailsElement>(null)
  const selected = categories.find((item) => item.id === value)
  const groups = [
    { label: '支出', items: categories.filter((item) => !item.retired && item.type === 'expense') },
    { label: '收入', items: categories.filter((item) => !item.retired && item.type === 'income') },
    { label: '历史分类', items: categories.filter((item) => item.retired) },
  ]

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (details.current && event.target instanceof Node && !details.current.contains(event.target)) {
        details.current.open = false
      }
    }
    document.addEventListener('pointerdown', closeOutside)
    return () => document.removeEventListener('pointerdown', closeOutside)
  }, [])

  const close = () => {
    if (details.current) {
      details.current.open = false
      details.current.querySelector('summary')?.focus()
    }
  }
  const select = (id: string) => { onChange(id); close() }

  return <details className="category-filter" ref={details} onKeyDown={(event) => {
    if (event.key === 'Escape') { event.preventDefault(); close() }
  }} onBlur={(event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false
  }}>
    <summary aria-label={`按分类筛选：${selected?.label ?? '全部分类'}`}>
      {selected && <CategorySymbol category={selected} />}
      <span className="category-filter-label">{selected?.label ?? '全部分类'}</span>
      <span className="category-filter-arrow" aria-hidden="true">⌄</span>
    </summary>
    <div className="category-filter-options" role="group" aria-label="按分类筛选">
      <button type="button" aria-pressed={value === 'all'} onClick={() => select('all')}>全部分类</button>
      {groups.filter((group) => group.items.length > 0).map((group) => <section key={group.label} aria-label={group.label}>
        <h2>{group.label}</h2>
        {group.items.map((item) => <button type="button" key={item.id} aria-pressed={value === item.id} onClick={() => select(item.id)}>
          <CategorySymbol category={item} /><span>{item.label}</span>
        </button>)}
      </section>)}
    </div>
  </details>
}
