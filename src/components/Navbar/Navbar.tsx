type NavbarProps = {
  title: string
}

export function Navbar({ title }: NavbarProps) {
  return (
    <div className="sticky top-0 z-20 border-b border-white/10 bg-bg-900/60 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <img src={`${import.meta.env.BASE_URL}futhero-icon.png`} alt="Futhero" className="size-6" />
          <div className="leading-tight">
            <div className="text-sm text-white/70">{title}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/#/settings"
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10"
          >
            Settings
          </a>
          <a
            href="/#/about"
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10"
          >
            About
          </a>
        </div>
      </div>
    </div>
  )
}
