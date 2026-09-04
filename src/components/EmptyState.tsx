export function EmptyState({ title = '还没有记录', text = '点一下「记一笔」开始记录吧' }: { title?: string; text?: string }) {
  return <div className="empty-state">
    <span>🧾</span>
    <strong>{title}</strong>
    <p>{text}</p>
  </div>
}
