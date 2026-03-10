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
        <div className="rounded-xl2 border border-border/60 bg-gradient-card p-3 shadow-glow-soft">
          <div className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
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
                    'rounded-lg px-3 py-2 text-sm transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
                    isActive
                      ? 'bg-primary/15 text-foreground shadow-[0_0_0_1px_hsl(var(--primary)_/_0.25)]'
                      : 'text-muted-foreground hover:bg-secondary/55 hover:text-foreground'
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
