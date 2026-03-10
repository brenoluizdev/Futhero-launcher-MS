export type GameId = 'haxball' | 'bonk'

export type Game = {
  id: GameId
  name: string
  description: string
  url: string
  thumbnailSrc: string
  accent: 'neon' | 'cyan'
}

export const GAMES: readonly Game[] = [
  {
    id: 'haxball',
    name: 'Haxball',
    description: 'Physics-based multiplayer soccer game.',
    url: 'https://www.haxball.com/play',
    thumbnailSrc: '/thumbnails/haxball.svg',
    accent: 'neon',
  },
  {
    id: 'bonk',
    name: 'Bonk.io',
    description: 'Competitive physics platform battle game.',
    url: 'https://bonk.io',
    thumbnailSrc: '/thumbnails/bonk.svg',
    accent: 'cyan',
  },
] as const

export function getGameById(id: string | undefined): Game | undefined {
  if (!id) return undefined
  return GAMES.find((g) => g.id === id)
}
