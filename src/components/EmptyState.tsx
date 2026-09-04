import catLaptop from '../assets/cat-laptop.webp'
import catSleeping from '../assets/cat-sleeping.webp'

export function EmptyState({
  title = '还没有记录',
  text = '点一下「记一笔」开始记录吧',
  illustration = 'sleep',
}: {
  title?: string
  text?: string
  illustration?: 'sleep' | 'laptop'
}) {
  return <div className="empty-state">
    <img src={illustration === 'sleep' ? catSleeping : catLaptop} alt="" />
    <strong>{title}</strong>
    <p>{text}</p>
  </div>
}
