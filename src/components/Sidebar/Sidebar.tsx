import { NavLink } from 'react-router-dom'
import { cn } from '../../utils/cn'

type SidebarItem = {
  label: string
  to: string
}

const ITEMS: readonly SidebarItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Games', to: '/games' },
  { label: 'Settings', to: '/settings' },
  { label: 'About', to: '/about' },
]

export function Sidebar() {
  return (
    <aside className="w-64 shrink-0">
      <div className="sticky top-16 h-[calc(100vh-4rem)] px-4 py-6">
        <div className="rounded-xl2 border border-white/10 bg-panel-900 p-3 shadow-soft">
          <div className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-white/60">
            Menu
          </div>

          <nav className="flex flex-col gap-1">
            {ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'rounded-xl px-3 py-2 text-sm transition',
                    isActive
                      ? 'bg-white/10 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12)]'
                      : 'text-white/75 hover:bg-white/5 hover:text-white'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  )
}

