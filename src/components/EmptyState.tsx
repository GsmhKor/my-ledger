import catCloud from '../assets/cat-empty-cloud.webp'
import catStats from '../assets/cat-empty-stats.webp'
import catBills from '../assets/cat-empty-bills.webp'

export function EmptyState({
  title = '还没有记录',
  text = '点一下「记一笔」开始记录吧',
  illustration = 'bills',
}: {
  title?: string
  text?: string
  illustration?: 'home' | 'bills' | 'stats'
}) {
  return <div className="empty-state">
    <img src={illustration === 'home' ? catCloud : illustration === 'stats' ? catStats : catBills} alt="" />
    <strong>{title}</strong>
    <p>{text}</p>
  </div>
}
