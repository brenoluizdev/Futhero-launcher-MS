import { GameCard } from '../../components/GameCard/GameCard'
import { useGameLauncher } from '../../hooks/useGameLauncher'
import { GAMES } from '../../utils/games'

export function Games() {
  const { launchGame } = useGameLauncher()

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-5">
        <div className="text-sm font-semibold tracking-wide text-white/70">Games</div>
        <h2 className="mt-1 text-2xl font-semibold text-white">Choose your arena</h2>
        <p className="mt-2 max-w-3xl text-sm text-white/65">
          These are official websites opened inside the app. No hosting, no redistribution.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {GAMES.map((game) => (
          <GameCard key={game.id} game={game} onPlay={launchGame} />
        ))}
      </div>
    </div>
  )
}

