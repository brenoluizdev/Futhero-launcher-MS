import { useI18n } from '../../i18n'

type NavbarProps = {
  title: string
}

export function Navbar({ title }: NavbarProps) {
  const { t } = useI18n()

  return (
    <div className="sticky top-0 z-20 border-b border-border/60 bg-background/70 backdrop-blur shadow-elevated">
      <div className="flex h-16 w-full items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <img src={`${import.meta.env.BASE_URL}futhero-icon.png`} alt="Futhero" className="size-6" />
          <div className="leading-tight">
            <div className="text-sm text-muted-foreground font-gaming">{title}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/#/settings"
            className="rounded-lg border border-border/70 bg-secondary/55 px-3 py-2 text-sm text-foreground/85 transition-smooth hover:bg-secondary/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            {t('nav.settings')}
          </a>
          <a
            href="/#/about"
            className="rounded-lg border border-border/70 bg-secondary/55 px-3 py-2 text-sm text-foreground/85 transition-smooth hover:bg-secondary/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            {t('nav.about')}
          </a>
        </div>
      </div>
    </div>
  )
}
