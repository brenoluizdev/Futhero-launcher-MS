import { useEffect, useState } from 'react'
import { useI18n } from '../../i18n'
import { isTauriApp } from '../../utils/tauri'

type NavbarProps = {
  title: string
}

type ApiPing = {
  ok: boolean
  latency_ms: number
  url: string
}

type ApiStatus = 'checking' | 'online' | 'slow' | 'offline'

export function Navbar({ title }: NavbarProps) {
  const { t } = useI18n()
  const [apiStatus, setApiStatus] = useState<ApiStatus>('checking')
  const [apiLatencyMs, setApiLatencyMs] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    let scheduledId: number | undefined
    let inFlight = false
    let consecutiveFailures = 0

    const slowThresholdMs = 1200

    function scheduleNext(delayMs: number) {
      if (scheduledId) window.clearTimeout(scheduledId)
      const jitter = Math.round(delayMs * 0.15 * (Math.random() - 0.5) * 2)
      scheduledId = window.setTimeout(tick, Math.max(500, delayMs + jitter))
    }

    async function pingWeb(): Promise<ApiPing> {
      const controller = new AbortController()
      const timeoutId = window.setTimeout(() => controller.abort(), 4500)
      const candidates =
        window.location.hostname === 'localhost'
          ? (['http://localhost:3000/api/v1/', 'https://api.futhero.com.br/api/v1/'] as const)
          : (['https://api.futhero.com.br/api/v1/'] as const)

      try {
        for (const url of candidates) {
          const started = performance.now()
          try {
            const response = await fetch(url, {
              method: 'GET',
              cache: 'no-store',
              signal: controller.signal,
            })
            const latencyMs = Math.round(performance.now() - started)
            if (!response.ok) continue
            const json = (await response.json().catch(() => null)) as { status?: string } | null
            if (json?.status === 'ok') {
              return { ok: true, latency_ms: latencyMs, url }
            }
          } catch {
            const latencyMs = Math.round(performance.now() - started)
            return { ok: false, latency_ms: latencyMs, url }
          }
        }

        return { ok: false, latency_ms: 0, url: candidates[0] }
      } finally {
        window.clearTimeout(timeoutId)
      }
    }

    async function pingTauri(): Promise<ApiPing> {
      const { invoke } = await import('@tauri-apps/api/core')
      return invoke<ApiPing>('ping_api')
    }

    function computeBackoffMs() {
      const base = 5000
      const factor = Math.min(6, Math.max(0, consecutiveFailures - 1))
      return Math.min(60000, base * 2 ** factor)
    }

    async function tick() {
      if (cancelled) return
      if (inFlight) return

      if (document.visibilityState === 'hidden') {
        scheduleNext(60000)
        return
      }

      if (typeof navigator !== 'undefined' && 'onLine' in navigator && !navigator.onLine) {
        setApiStatus('offline')
        setApiLatencyMs(null)
        consecutiveFailures = Math.max(consecutiveFailures, 1) + 1
        scheduleNext(computeBackoffMs())
        return
      }

      inFlight = true
      try {
        const result = isTauriApp() ? await pingTauri() : await pingWeb()
        if (cancelled) return

        setApiLatencyMs(result.latency_ms || null)

        if (!result.ok) {
          consecutiveFailures += 1
          setApiStatus('offline')
          scheduleNext(computeBackoffMs())
          return
        }

        consecutiveFailures = 0
        if (result.latency_ms >= slowThresholdMs) {
          setApiStatus('slow')
          scheduleNext(8000)
          return
        }

        setApiStatus('online')
        scheduleNext(15000)
      } finally {
        inFlight = false
      }
    }

    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        scheduleNext(250)
      }
    }
    const onOnline = () => scheduleNext(250)
    const onOffline = () => scheduleNext(250)

    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('online', onOnline)
    window.addEventListener('offline', onOffline)

    scheduleNext(0)

    return () => {
      cancelled = true
      if (scheduledId) window.clearTimeout(scheduledId)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('online', onOnline)
      window.removeEventListener('offline', onOffline)
    }
  }, [])

  const apiTitleBase =
    apiStatus === 'checking'
      ? t('api.status.checking')
      : apiStatus === 'offline'
        ? t('api.status.disconnected')
        : apiStatus === 'slow'
          ? t('api.status.slow')
          : t('api.status.connected')

  const apiTitle =
    apiLatencyMs === null || apiStatus === 'checking'
      ? apiTitleBase
      : `${apiTitleBase} • ${t('api.status.latency', { ms: Math.round(apiLatencyMs) })}`

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
          <div
            title={apiTitle}
            className="flex items-center gap-2 rounded-lg border border-border/70 bg-secondary/55 px-3 py-2"
          >
            <div
              className={
                apiStatus === 'checking'
                  ? 'size-2.5 rounded-full bg-muted-foreground/40'
                  : apiStatus === 'online'
                    ? 'size-2.5 rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(52,211,153,0.18)]'
                    : apiStatus === 'slow'
                      ? 'size-2.5 rounded-full bg-amber-400 shadow-[0_0_0_3px_rgba(251,191,36,0.18)]'
                      : 'size-2.5 rounded-full bg-red-500/90 shadow-[0_0_0_3px_rgba(239,68,68,0.18)]'
              }
            />
            <div className="text-xs font-semibold text-foreground/80">API</div>
          </div>
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
