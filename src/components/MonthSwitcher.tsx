import { Icon } from './Icon'
import { formatMonth, shiftMonth } from '../utils/date'

interface Props {
  month: string
  onChange: (month: string) => void
}

export function MonthSwitcher({ month, onChange }: Props) {
  return <div className="month-switcher">
    <button className="icon-button" onClick={() => onChange(shiftMonth(month, -1))} aria-label="上个月"><Icon name="chevron-left" /></button>
    <h1>{formatMonth(month)}</h1>
    <button className="icon-button" onClick={() => onChange(shiftMonth(month, 1))} aria-label="下个月"><Icon name="chevron-right" /></button>
  </div>
}
