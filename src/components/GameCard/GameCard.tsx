import { motion } from 'framer-motion'
import type { Game } from '../../utils/games'

type GameCardProps = {
  game: Game
  onPlay: (game: Game) => void
}

export function GameCard({ game, onPlay }: GameCardProps) {
  const accent =
    game.accent === 'cyan'
      ? 'from-accent-500/25 to-white/0'
      : 'from-neon-500/25 to-white/0'

  const chip =
    game.accent === 'cyan'
      ? 'bg-accent-500/15 text-accent-400 ring-1 ring-accent-500/20'
      : 'bg-neon-500/15 text-neon-300 ring-1 ring-neon-500/25'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-xl2 border border-white/10 bg-panel-900 shadow-soft"
    >
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent}`} />
      <div className="relative p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-20 overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10">
              <img
                src={game.thumbnailSrc}
                alt={`${game.name} thumbnail`}
                className="h-full w-full object-cover opacity-85 transition group-hover:opacity-100"
                loading="lazy"
              />
            </div>

            <div>
              <div className="text-base font-semibold text-white">{game.name}</div>
              <div className="mt-1 text-xs text-white/60">{game.url}</div>
            </div>
          </div>

          <div className={`rounded-full px-2.5 py-1 text-xs font-medium ${chip}`}>
            Official
          </div>
        </div>

        <div className="mt-4 text-sm leading-relaxed text-white/75">{game.description}</div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="text-xs text-white/50">Launch inside WebView</div>
          <button
            type="button"
            onClick={() => onPlay(game)}
            className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15 active:translate-y-px"
          >
            Play
          </button>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition group-hover:opacity-100" />
    </motion.div>
  )
}
