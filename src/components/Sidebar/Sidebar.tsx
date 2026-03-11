import { NavLink } from 'react-router-dom'
import { useI18n } from '../../i18n'
import { cn } from '../../utils/cn'

type SidebarItem = {
  labelKey: 'nav.home' | 'nav.games' | 'nav.settings' | 'nav.about'
  to: string
}

const ITEMS: readonly SidebarItem[] = [
  { labelKey: 'nav.home', to: '/' },
  { labelKey: 'nav.games', to: '/games' },
  { labelKey: 'nav.settings', to: '/settings' },
  { labelKey: 'nav.about', to: '/about' },
]

export function Sidebar() {
  const { t } = useI18n()

  return (
    <aside className="w-64 shrink-0">
      <div className="sticky top-16 h-[calc(100vh-4rem)] px-4 py-6">
        <div className="flex h-full w-full flex-col rounded-xl2 border border-border/60 bg-gradient-card p-3 shadow-glow-soft">
          <div className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t('nav.menu')}</div>

          <nav className="flex flex-1 flex-col gap-1">
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
                {t(item.labelKey)}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  )
}
