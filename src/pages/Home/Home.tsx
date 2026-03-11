import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useI18n } from '../../i18n'
import mascoteSrc from '../../assets/mascote.png'
import { isTauriApp } from '../../utils/tauri'

type Room = {
  id: string
  name: string
  mode: string
  is_active: boolean
  is_public: boolean
  max_players: number
  players_online: number
  room_link?: string | null
}

type RoomsPayload = {
  ok: boolean
  latency_ms: number
  url: string
  rooms: Room[]
}

export function Home() {
  const { t } = useI18n()
  const [roomsPayload, setRoomsPayload] = useState<RoomsPayload | null>(null)
  const [roomsLoading, setRoomsLoading] = useState(false)
  const [roomsUpdatedAt, setRoomsUpdatedAt] = useState<number | null>(null)

  const roomsMeta = useMemo(() => {
    if (!roomsPayload?.ok || roomsUpdatedAt === null) return null
    const time = new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' }).format(
      new Date(roomsUpdatedAt)
    )
    return t('home.rooms.meta', { time, ms: Math.round(roomsPayload.latency_ms) })
  }, [roomsPayload?.latency_ms, roomsPayload?.ok, roomsUpdatedAt, t])

  const roomsSorted = useMemo(() => {
    const rooms = roomsPayload?.rooms ?? []
    return [...rooms].sort((a, b) => {
      if (a.is_active !== b.is_active) return a.is_active ? -1 : 1
      return (b.players_online ?? 0) - (a.players_online ?? 0)
    })
  }, [roomsPayload?.rooms])

  useEffect(() => {
    let cancelled = false
    let scheduledId: number | undefined
    let inFlight = false
    let hasLoaded = false

    function scheduleNext(delayMs: number) {
      if (scheduledId) window.clearTimeout(scheduledId)
      const jitter = Math.round(delayMs * 0.12 * (Math.random() - 0.5) * 2)
      scheduledId = window.setTimeout(tick, Math.max(500, delayMs + jitter))
    }

    async function fetchRooms(silent: boolean) {
      if (inFlight) return
      inFlight = true
      if (!silent) setRoomsLoading(true)

      try {
        if (isTauriApp()) {
          const { invoke } = await import('@tauri-apps/api/core')
          const payload = await invoke<RoomsPayload>('list_rooms')
          if (cancelled) return
          setRoomsPayload(payload)
          setRoomsUpdatedAt(Date.now())
          return
        }

        const controller = new AbortController()
        const timeoutId = window.setTimeout(() => controller.abort(), 6500)
        const candidates =
          window.location.hostname === 'localhost'
            ? (['http://localhost:3000/api/v1/rooms', 'https://api.futhero.com.br/api/v1/rooms'] as const)
            : (['https://api.futhero.com.br/api/v1/rooms'] as const)

        try {
          for (const url of candidates) {
            const started = performance.now()
            try {
              const response = await fetch(url, { method: 'GET', cache: 'no-store', signal: controller.signal })
              const latencyMs = Math.round(performance.now() - started)
              if (!response.ok) continue
              const json = (await response.json().catch(() => null)) as { data?: Room[] } | null
              const rooms = Array.isArray(json?.data) ? json!.data! : []
              if (cancelled) return
              setRoomsPayload({ ok: true, latency_ms: latencyMs, url, rooms })
              setRoomsUpdatedAt(Date.now())
              return
            } catch {
              const latencyMs = Math.round(performance.now() - started)
              if (cancelled) return
              setRoomsPayload({ ok: false, latency_ms: latencyMs, url, rooms: [] })
              setRoomsUpdatedAt(Date.now())
              return
            }
          }

          if (cancelled) return
          setRoomsPayload({ ok: false, latency_ms: 0, url: candidates[0], rooms: [] })
          setRoomsUpdatedAt(Date.now())
        } finally {
          window.clearTimeout(timeoutId)
        }
      } finally {
        inFlight = false
        if (!silent) setRoomsLoading(false)
      }
    }

    async function tick() {
      if (cancelled) return
      if (document.visibilityState === 'hidden') {
        scheduleNext(45000)
        return
      }
      await fetchRooms(hasLoaded)
      hasLoaded = true
      scheduleNext(20000)
    }

    const onVisibility = () => {
      if (document.visibilityState === 'visible') scheduleNext(250)
    }

    document.addEventListener('visibilitychange', onVisibility)
    scheduleNext(0)

    return () => {
      cancelled = true
      if (scheduledId) window.clearTimeout(scheduledId)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  async function handleRefreshRooms() {
    setRoomsLoading(true)
    try {
      if (isTauriApp()) {
        const { invoke } = await import('@tauri-apps/api/core')
        const payload = await invoke<RoomsPayload>('list_rooms')
        setRoomsPayload(payload)
        setRoomsUpdatedAt(Date.now())
        return
      }

      const controller = new AbortController()
      const timeoutId = window.setTimeout(() => controller.abort(), 6500)
      const candidates =
        window.location.hostname === 'localhost'
          ? (['http://localhost:3000/api/v1/rooms', 'https://api.futhero.com.br/api/v1/rooms'] as const)
          : (['https://api.futhero.com.br/api/v1/rooms'] as const)

      try {
        for (const url of candidates) {
          const started = performance.now()
          const response = await fetch(url, { method: 'GET', cache: 'no-store', signal: controller.signal })
          const latencyMs = Math.round(performance.now() - started)
          if (!response.ok) continue
          const json = (await response.json().catch(() => null)) as { data?: Room[] } | null
          const rooms = Array.isArray(json?.data) ? json!.data! : []
          setRoomsPayload({ ok: true, latency_ms: latencyMs, url, rooms })
          setRoomsUpdatedAt(Date.now())
          return
        }
        setRoomsPayload({ ok: false, latency_ms: 0, url: candidates[0], rooms: [] })
        setRoomsUpdatedAt(Date.now())
      } finally {
        window.clearTimeout(timeoutId)
      }
    } catch {
      setRoomsPayload((prev) => prev ?? { ok: false, latency_ms: 0, url: '', rooms: [] })
      setRoomsUpdatedAt(Date.now())
    } finally {
      setRoomsLoading(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-[1400px]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="rounded-xl2 border border-border/60 bg-gradient-card p-6 shadow-glow-soft"
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm font-semibold tracking-wide text-primary">{t('home.kicker')}</div>
                <h1 className="mt-2 text-3xl font-semibold text-foreground font-gaming">{t('home.title')}</h1>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {t('home.subtitle')}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to="/games"
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-smooth hover:bg-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                >
                  {t('home.cta.browse')}
                </Link>
                <Link
                  to="/about"
                  className="rounded-lg border border-border/70 bg-secondary/55 px-4 py-2 text-sm font-semibold text-foreground/85 transition-smooth hover:bg-secondary/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                >
                  {t('home.cta.learnMore')}
                </Link>
              </div>
            </div>
          </motion.div>

          <div className="mt-6">
            <div className="text-sm font-semibold tracking-wide text-muted-foreground">{t('home.section.quick.kicker')}</div>
            <h2 className="mt-1 text-2xl font-semibold text-foreground font-gaming">{t('home.section.quick.title')}</h2>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground">{t('home.section.quick.subtitle')}</p>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <Link to="/games" className="block">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45 }}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-xl2 border border-border/60 bg-gradient-card p-5 shadow-glow-soft"
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/20 to-white/0" />
                  <div className="relative">
                    <div className="text-sm font-semibold text-foreground">{t('home.quick.games.title')}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{t('home.quick.games.body')}</div>
                    <div className="mt-4 inline-flex items-center rounded-full bg-primary/15 px-2.5 py-1 text-xs font-medium text-primary ring-1 ring-primary/25">
                      {t('home.quick.games.cta')}
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-border opacity-0 transition-smooth group-hover:opacity-100" />
                </motion.div>
              </Link>

              <Link to="/settings" className="block">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: 0.05 }}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-xl2 border border-border/60 bg-gradient-card p-5 shadow-glow-soft"
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-glow/16 to-white/0" />
                  <div className="relative">
                    <div className="text-sm font-semibold text-foreground">{t('home.quick.settings.title')}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{t('home.quick.settings.body')}</div>
                    <div className="mt-4 inline-flex items-center rounded-full bg-secondary/45 px-2.5 py-1 text-xs font-medium text-foreground/80 ring-1 ring-border/70">
                      {t('home.quick.settings.cta')}
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-border opacity-0 transition-smooth group-hover:opacity-100" />
                </motion.div>
              </Link>

              <Link to="/about" className="block">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-xl2 border border-border/60 bg-gradient-card p-5 shadow-glow-soft"
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/0 to-primary/10" />
                  <div className="relative">
                    <div className="text-sm font-semibold text-foreground">{t('home.quick.about.title')}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{t('home.quick.about.body')}</div>
                    <div className="mt-4 inline-flex items-center rounded-full bg-secondary/45 px-2.5 py-1 text-xs font-medium text-foreground/80 ring-1 ring-border/70">
                      {t('home.quick.about.cta')}
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-border opacity-0 transition-smooth group-hover:opacity-100" />
                </motion.div>
              </Link>
            </div>
          </div>

          <div className="mt-6 grid gap-4 xl:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45 }}
              className="relative overflow-hidden rounded-xl2 border border-border/60 bg-gradient-card p-5 shadow-glow-soft xl:col-span-2"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold tracking-wide text-muted-foreground">{t('home.rooms.kicker')}</div>
                  <div className="mt-1 text-lg font-semibold text-foreground">{t('home.rooms.title')}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{t('home.rooms.subtitle')}</div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <button
                    type="button"
                    onClick={handleRefreshRooms}
                    className="rounded-lg border border-border/70 bg-secondary/55 px-3 py-2 text-sm font-semibold text-foreground/85 transition-smooth hover:bg-secondary/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:opacity-60"
                    disabled={roomsLoading}
                  >
                    {roomsLoading ? t('home.rooms.loading') : t('home.rooms.refresh')}
                  </button>
                  {roomsMeta ? <div className="text-xs text-muted-foreground">{roomsMeta}</div> : null}
                </div>
              </div>

              <div className="mt-4 grid gap-2 md:grid-cols-2">
                {roomsPayload === null ? (
                  <div className="text-sm text-muted-foreground">{t('home.rooms.loading')}</div>
                ) : roomsPayload.ok ? (
                  roomsSorted.length === 0 ? (
                    <div className="text-sm text-muted-foreground">{t('home.rooms.empty')}</div>
                  ) : (
                    roomsSorted.slice(0, 6).map((room) => (
                      <div
                        key={room.id}
                        className="flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-secondary/25 px-3 py-2 transition-smooth hover:bg-secondary/35"
                      >
                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold text-foreground">{room.name}</div>
                          <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                            <span>{t('home.rooms.players', { online: room.players_online, max: room.max_players })}</span>
                            <span className="text-muted-foreground/60">•</span>
                            <span>{room.mode}</span>
                            <span className="text-muted-foreground/60">•</span>
                            <span>{room.is_public ? t('home.rooms.public') : t('home.rooms.private')}</span>
                            <span className="text-muted-foreground/60">•</span>
                            <span>{room.is_active ? t('home.rooms.active') : t('home.rooms.inactive')}</span>
                          </div>
                        </div>

                        {room.room_link ? (
                          <a
                            href={room.room_link}
                            target="_blank"
                            rel="noreferrer"
                            className="shrink-0 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-smooth hover:bg-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                          >
                            {t('home.rooms.join')}
                          </a>
                        ) : null}
                      </div>
                    ))
                  )
                ) : (
                  <div className="text-sm text-muted-foreground">{t('home.rooms.offline')}</div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="rounded-xl2 border border-border/60 bg-gradient-card p-5 shadow-glow-soft"
            >
              <div className="text-sm font-semibold tracking-wide text-muted-foreground">{t('home.section.features.kicker')}</div>
              <div className="mt-1 text-lg font-semibold text-foreground">{t('home.section.features.title')}</div>

              <div className="mt-4 grid gap-3">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="rounded-lg border border-border/60 bg-secondary/25 px-3 py-3 transition-smooth hover:bg-secondary/35"
                >
                  <div className="text-sm font-semibold text-foreground">{t('home.feature.instant.title')}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{t('home.feature.instant.body')}</div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="rounded-lg border border-border/60 bg-secondary/25 px-3 py-3 transition-smooth hover:bg-secondary/35"
                >
                  <div className="text-sm font-semibold text-foreground">{t('home.feature.clean.title')}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{t('home.feature.clean.body')}</div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="rounded-lg border border-border/60 bg-secondary/25 px-3 py-3 transition-smooth hover:bg-secondary/35"
                >
                  <div className="text-sm font-semibold text-foreground">{t('home.feature.future.title')}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{t('home.feature.future.body')}</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="hidden shrink-0 lg:block lg:w-[clamp(360px,30vw,560px)]">
          <div className="sticky top-20 flex h-[calc(100vh-5rem)] items-end">
            <motion.img
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              src={mascoteSrc}
              alt="Mascote Futhero"
              className="h-full w-full select-none object-contain opacity-95 drop-shadow-[0_26px_90px_rgba(249,115,22,0.22)]"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
