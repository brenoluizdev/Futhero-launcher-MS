import type { Game } from '../utils/games'
import { isTauriApp } from '../utils/tauri'

export function useGameLauncher() {
  async function launchGame(game: Game) {
    const playHash = `/play/${game.id}`

    if (!isTauriApp()) {
      window.open(game.url, '_blank', 'noopener,noreferrer')
      return
    }

    try {
      const { WebviewWindow } = await import('@tauri-apps/api/webviewWindow')

      const label = `game-${game.id}`
      const existing = await WebviewWindow.getByLabel(label)
      if (existing) {
        await existing.show()
        await existing.setFocus()
        return
      }

      const webview = new WebviewWindow(label, {
        url: game.url,
        title: game.name,
        center: true,
        width: 1280,
        height: 760,
        minWidth: 960,
        minHeight: 600,
        resizable: true,
        visible: true,
        decorations: true,
      })

      webview.once('tauri://created', async () => {
        await webview.show()
        await webview.setFocus()
      })

      webview.once('tauri://error', () => {
        window.location.hash = playHash
      })
    } catch {
      window.location.hash = playHash
    }
  }

  return { launchGame }
}
