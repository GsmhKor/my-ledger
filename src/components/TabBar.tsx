import { Icon } from './Icon'
import catHome from '../assets/cat-tab-home.png'
import catBills from '../assets/cat-tab-bills.png'
import catStats from '../assets/cat-tab-stats.png'

export type Tab = 'home' | 'bills' | 'stats' | 'settings'

const tabs: { id: Tab; label: string; icon: Parameters<typeof Icon>[0]['name']; image?: string }[] = [
  { id: 'home', label: '首页', icon: 'home', image: catHome },
  { id: 'bills', label: '账单', icon: 'list', image: catBills },
  { id: 'stats', label: '统计', icon: 'chart', image: catStats },
  { id: 'settings', label: '设置', icon: 'settings' },
]

export function TabBar({ active, onChange }: { active: Tab; onChange: (tab: Tab) => void }) {
  return <nav className="tab-bar" aria-label="主导航">
    {tabs.map((tab) => <button key={tab.id} className={active === tab.id ? 'active' : ''} onClick={() => onChange(tab.id)}>
      {tab.image
        ? <img className="tab-cat" src={tab.image} alt="" width={34} height={34} />
        : <Icon name={tab.icon} size={23} />}
      <span>{tab.label}</span>
    </button>)}
  </nav>
}
