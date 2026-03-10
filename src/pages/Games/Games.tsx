import { GameCard } from '../../components/GameCard/GameCard'
import { useGameLauncher } from '../../hooks/useGameLauncher'
import { useI18n } from '../../i18n'
import { GAMES } from '../../utils/games'

export function Games() {
  const { launchGame } = useGameLauncher()
  const { t } = useI18n()

  return (
    <div className="mx-auto w-full max-w-[1400px]">
      <div className="mb-5">
        <div className="text-sm font-semibold tracking-wide text-muted-foreground">{t('games.kicker')}</div>
        <h2 className="mt-1 text-2xl font-semibold text-foreground font-gaming">{t('games.title')}</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          {t('games.subtitle')}
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
