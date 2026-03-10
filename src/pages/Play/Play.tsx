import { useEffect, useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getGameById } from '../../utils/games'
import { isTauriApp } from '../../utils/tauri'

export function Play() {
  const { gameId } = useParams()
  const navigate = useNavigate()

  const game = useMemo(() => getGameById(gameId), [gameId])
  const gameKey = game?.id
  const gameUrl = game?.url

  useEffect(() => {
    if (!gameKey || !gameUrl || !isTauriApp()) return

    let unlistenResize: (() => void) | undefined
    let closed = false
    let contentLabel: string | undefined

    async function setupSplitWebviews() {
      const { WebviewWindow } = await import('@tauri-apps/api/webviewWindow')
      const currentWindow = WebviewWindow.getCurrent()
      if (!currentWindow.label.startsWith('game-')) return

      const [
        { getCurrentWindow },
        { getCurrentWebview, Webview },
        { LogicalPosition, LogicalSize, PhysicalSize },
      ] =
        await Promise.all([
          import('@tauri-apps/api/window'),
          import('@tauri-apps/api/webview'),
          import('@tauri-apps/api/dpi'),
        ])

      const headerHeight = 56
      const windowHandle = getCurrentWindow()
      const headerWebview = getCurrentWebview()
      contentLabel = `content-${gameKey}`

      type LogicalSizeLike = { width: number; height: number }
      type HasToLogical = { toLogical: (scaleFactor: number) => LogicalSizeLike }

      function hasToLogical(value: unknown): value is HasToLogical {
        return typeof (value as { toLogical?: unknown }).toLogical === 'function'
      }

      const factor = await windowHandle.scaleFactor()
      const physicalSize = await windowHandle.innerSize()
      const logicalSize =
        hasToLogical(physicalSize)
          ? physicalSize.toLogical(factor)
          : new PhysicalSize(physicalSize).toLogical(factor)

      const width = logicalSize.width
      const height = logicalSize.height

      await headerWebview.setAutoResize(false)
      await headerWebview.setPosition(new LogicalPosition(0, 0))
      await headerWebview.setSize(new LogicalSize(width, headerHeight))

      const existingContent = await Webview.getByLabel(contentLabel)
      await existingContent?.close()

      const contentWebview = new Webview(windowHandle, contentLabel, {
        url: gameUrl,
        x: 0,
        y: headerHeight,
        width,
        height: Math.max(0, height - headerHeight),
        focus: true,
      })

      unlistenResize = await windowHandle.onResized(async ({ payload }) => {
        if (closed) return
        const nextLogical =
          hasToLogical(payload)
            ? payload.toLogical(factor)
            : new PhysicalSize(payload).toLogical(factor)
        const nextWidth = nextLogical.width
        const nextHeight = nextLogical.height

        await headerWebview.setSize(new LogicalSize(nextWidth, headerHeight))
        await contentWebview.setPosition(new LogicalPosition(0, headerHeight))
        await contentWebview.setSize(new LogicalSize(nextWidth, Math.max(0, nextHeight - headerHeight)))
      })
    }

    setupSplitWebviews()

    return () => {
      closed = true
      unlistenResize?.()
      if (contentLabel) {
        import('@tauri-apps/api/webview').then(({ Webview }) =>
          Webview.getByLabel(contentLabel!).then((w) => w?.close())
        )
      }
    }
  }, [gameKey, gameUrl])

  async function handleBack() {
    if (isTauriApp()) {
      const { WebviewWindow } = await import('@tauri-apps/api/webviewWindow')
      const current = WebviewWindow.getCurrent()
      if (current.label !== 'main') {
        const main = await WebviewWindow.getByLabel('main')
        await main?.show()
        await main?.setFocus()
        await current.close()
        return
      }
    }

    navigate('/games')
  }

  if (!game) {
    return (
      <div className="grid min-h-screen place-items-center p-6">
        <div className="w-full max-w-lg rounded-xl2 border border-white/10 bg-panel-900 p-6 shadow-soft">
          <div className="text-lg font-semibold text-white">Game not found</div>
          <div className="mt-2 text-sm text-white/70">The selected game is not available.</div>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => navigate('/games')}
              className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Back
            </button>
            <Link
              to="/"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex h-14 items-center gap-3 border-b border-white/10 bg-bg-900/60 px-4 backdrop-blur">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10"
          >
            Back
          </button>
          <div className="text-sm font-semibold text-white">{game.name}</div>
        </div>
      </div>

      <div className="flex-1">
        {isTauriApp() ? (
          <div className="grid h-full w-full place-items-center text-sm text-white/60">
            Loading…
          </div>
        ) : (
          <iframe
            title={game.name}
            src={game.url}
            className="h-full w-full border-0"
            allow="fullscreen; autoplay; gamepad; clipboard-read; clipboard-write"
          />
        )}
      </div>
    </div>
  )
}
