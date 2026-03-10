import { motion } from 'framer-motion'
import type { Game } from '../../utils/games'

type GameCardProps = {
  game: Game
  onPlay: (game: Game) => void
}

export function GameCard({ game, onPlay }: GameCardProps) {
  const accent =
    game.accent === 'cyan'
      ? 'from-primary-glow/25 to-white/0'
      : 'from-primary/25 to-white/0'

  const chip =
    game.accent === 'cyan'
      ? 'bg-primary-glow/15 text-primary-glow ring-1 ring-primary-glow/25'
      : 'bg-primary/15 text-primary ring-1 ring-primary/25'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-xl2 border border-border/60 bg-gradient-card shadow-glow-soft"
    >
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent}`} />
      <div className="relative p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-20 overflow-hidden rounded-2xl bg-secondary/40 ring-1 ring-border/60">
              <img
                src={game.thumbnailSrc}
                alt={`${game.name} thumbnail`}
                className="h-full w-full object-cover opacity-85 transition-smooth group-hover:opacity-100"
                loading="lazy"
              />
            </div>

            <div>
              <div className="text-base font-semibold text-foreground">{game.name}</div>
              <div className="mt-1 text-xs text-muted-foreground">{game.url}</div>
            </div>
          </div>

          <div className={`rounded-full px-2.5 py-1 text-xs font-medium ${chip}`}>
            Official
          </div>
        </div>

        <div className="mt-4 text-sm leading-relaxed text-foreground/80">{game.description}</div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="text-xs text-muted-foreground">Launch inside WebView</div>
          <button
            type="button"
            onClick={() => onPlay(game)}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-smooth hover:bg-orange-400 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            Play
          </button>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-border opacity-0 transition-smooth group-hover:opacity-100" />
    </motion.div>
  )
}
