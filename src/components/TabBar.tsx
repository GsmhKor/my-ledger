import { Icon } from './Icon'

export type Tab = 'home' | 'bills' | 'stats' | 'settings'

const tabs: { id: Tab; label: string; icon: Parameters<typeof Icon>[0]['name'] }[] = [
  { id: 'home', label: '首页', icon: 'home' },
  { id: 'bills', label: '账单', icon: 'list' },
  { id: 'stats', label: '统计', icon: 'chart' },
  { id: 'settings', label: '设置', icon: 'settings' },
]

export function TabBar({ active, onChange }: { active: Tab; onChange: (tab: Tab) => void }) {
  return <nav className="tab-bar" aria-label="主导航">
    {tabs.map((tab) => <button key={tab.id} className={active === tab.id ? 'active' : ''} onClick={() => onChange(tab.id)}>
      <Icon name={tab.icon} size={23} />
      <span>{tab.label}</span>
    </button>)}
  </nav>
}
