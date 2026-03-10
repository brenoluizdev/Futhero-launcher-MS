import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Language = 'pt' | 'es' | 'en'

const STORAGE_KEY = 'webarena.language'

const translations = {
  pt: {
    'app.title': 'Futhero Launcher',

    'nav.home': 'Início',
    'nav.games': 'Jogos',
    'nav.settings': 'Configurações',
    'nav.about': 'Sobre',
    'nav.menu': 'Menu',

    'home.kicker': 'Hub de Jogos Web',
    'home.title': 'Futhero Launcher',
    'home.subtitle':
      'Escolha um jogo e abra dentro do app. Limpo, rápido e com visual de dashboard gamer.',
    'home.cta.browse': 'Ver jogos',
    'home.cta.learnMore': 'Saiba mais',
    'home.feature.instant.title': 'Abertura instantânea',
    'home.feature.instant.body': 'Abra sites oficiais de jogos dentro de um WebView controlado pelo app.',
    'home.feature.clean.title': 'UI limpa',
    'home.feature.clean.body': 'Tema escuro, glow sutil e animações suaves em todo o app.',
    'home.feature.future.title': 'Pronto para o futuro',
    'home.feature.future.body': 'Feito para evoluir: favoritos, busca, perfis e comunidade.',

    'games.kicker': 'Jogos',
    'games.title': 'Escolha sua arena',
    'games.subtitle': 'São sites oficiais abertos dentro do app. Sem hosting e sem redistribuição.',

    'game.badge.official': 'Oficial',
    'game.launchHint': 'Abrir dentro do WebView',
    'game.play': 'Jogar',
    'game.thumbnailAlt': 'Miniatura de {name}',
    'game.description.haxball': 'Jogo de futebol multiplayer com física.',
    'game.description.bonk': 'Jogo competitivo de plataforma com física.',

    'settings.kicker': 'Configurações',
    'settings.title': 'Personalize seu hub',
    'settings.language.title': 'Idioma',
    'settings.language.subtitle': 'Escolha o idioma da interface do launcher.',
    'settings.language.pt': 'Português',
    'settings.language.es': 'Español',
    'settings.language.en': 'English',
    'settings.planned.title': 'Recursos planejados',
    'settings.planned.favorites': 'Favoritos',
    'settings.planned.search': 'Busca de jogos',
    'settings.planned.profiles': 'Perfis de usuário',
    'settings.planned.community': 'Hub de comunidade',

    'about.kicker': 'Cabeçalho',
    'about.title': 'Sobre o Futhero Launcher',
    'about.subtitle':
      'Transparência e aviso legal sobre como este launcher interage com jogos de terceiros.',

    'about.s1.title': 'Seção 1 — O que é o Futhero Launcher?',
    'about.s1.body':
      'O Futhero Launcher é um aplicativo desktop, guiado pela comunidade, que oferece acesso conveniente a jogos de navegador por meio de uma interface unificada. Ele abre os sites oficiais dentro de uma janela do app para que jogadores iniciem jogos a partir de um só lugar.',
    'about.s1.examples': 'Exemplos de sites oficiais incluídos:',

    'about.s2.title': 'Seção 2 — Aviso de projeto não oficial',
    'about.s2.body':
      'Este projeto não é afiliado, endossado ou patrocinado pelos desenvolvedores de Haxball, Bonk.io, ou qualquer outro jogo disponível no launcher. O Futhero Launcher é um projeto comunitário não oficial criado para tornar o acesso mais conveniente.',

    'about.s3.title': 'Seção 3 — Propriedade dos jogos',
    'about.s3.body':
      'Todos os jogos acessados por este launcher permanecem propriedade intelectual de seus respectivos donos. Quaisquer marcas, logos, conteúdo do jogo e assets de marca pertencem aos seus criadores.',

    'about.s4.title': 'Seção 4 — Sem modificação de gameplay',
    'about.s4.body':
      'O launcher não modifica mecânicas, física ou sistemas de gameplay. Os jogos rodam exatamente como rodam em um navegador normal.',
    'about.s4.point1': 'Sem modificações de física',
    'about.s4.point2': 'Sem automação de gameplay',
    'about.s4.point3': 'Sem manipulação de servidores',
    'about.s4.point4': 'Sem sistemas de cheats',

    'about.s5.title': 'Seção 5 — Política de anúncios',
    'about.s5.body':
      'O launcher não bloqueia nem remove anúncios dos jogos. Os anúncios permanecem como aparecem nos sites oficiais.',

    'about.s6.title': 'Seção 6 — Customização visual via DOM',
    'about.s6.body':
      'Em alguns casos, o launcher pode aplicar mudanças visuais opcionais usando manipulação padrão de DOM, de forma semelhante a extensões de navegador que personalizam a aparência de páginas. Esses ajustes são puramente cosméticos e podem incluir temas de cores ou pequenos ajustes de interface.',
    'about.s6.tag1': 'Cores',
    'about.s6.tag2': 'Temas visuais',
    'about.s6.tag3': 'Estilo de UI',

    'about.s7.title': 'Seção 7 — Objetivo de comunidade',
    'about.s7.body':
      'O objetivo deste projeto é contribuir positivamente com as comunidades desses jogos, tornando-os mais fáceis de acessar e descobrir. Se você gosta desses jogos, apoie os sites oficiais e seus criadores.',

    'about.disclaimer.title': 'Aviso',
    'about.disclaimer.body1': 'Todos os jogos pertencem aos seus respectivos criadores.',
    'about.disclaimer.body2': 'Este launcher apenas fornece acesso aos sites oficiais.',

    'play.back': 'Voltar',
    'play.loading': 'Carregando…',
    'play.notFound.title': 'Jogo não encontrado',
    'play.notFound.body': 'O jogo selecionado não está disponível.',
    'play.notFound.home': 'Início',

    'footer.disclaimer':
      'Este aplicativo apenas fornece acesso a sites oficiais de jogos. Todos os jogos pertencem aos seus respectivos donos.',
  },
  es: {
    'app.title': 'Futhero Launcher',

    'nav.home': 'Inicio',
    'nav.games': 'Juegos',
    'nav.settings': 'Configuración',
    'nav.about': 'Acerca de',
    'nav.menu': 'Menú',

    'home.kicker': 'Hub de Juegos Web',
    'home.title': 'Futhero Launcher',
    'home.subtitle':
      'Elige un juego y ábrelo dentro de la app. Limpio, rápido y con estilo de dashboard gamer.',
    'home.cta.browse': 'Ver juegos',
    'home.cta.learnMore': 'Más información',
    'home.feature.instant.title': 'Inicio instantáneo',
    'home.feature.instant.body': 'Abre sitios oficiales de juegos dentro de un WebView controlado por la app.',
    'home.feature.clean.title': 'UI limpia',
    'home.feature.clean.body': 'Tema oscuro, glow sutil y animaciones suaves en toda la app.',
    'home.feature.future.title': 'Listo para el futuro',
    'home.feature.future.body': 'Hecho para evolucionar: favoritos, búsqueda, perfiles y comunidad.',

    'games.kicker': 'Juegos',
    'games.title': 'Elige tu arena',
    'games.subtitle': 'Son sitios oficiales abiertos dentro de la app. Sin hosting ni redistribución.',

    'game.badge.official': 'Oficial',
    'game.launchHint': 'Abrir dentro del WebView',
    'game.play': 'Jugar',
    'game.thumbnailAlt': 'Miniatura de {name}',
    'game.description.haxball': 'Juego multijugador de fútbol con física.',
    'game.description.bonk': 'Juego competitivo de plataformas con física.',

    'settings.kicker': 'Configuración',
    'settings.title': 'Personaliza tu hub',
    'settings.language.title': 'Idioma',
    'settings.language.subtitle': 'Elige el idioma de la interfaz del launcher.',
    'settings.language.pt': 'Português',
    'settings.language.es': 'Español',
    'settings.language.en': 'English',
    'settings.planned.title': 'Funciones planificadas',
    'settings.planned.favorites': 'Favoritos',
    'settings.planned.search': 'Búsqueda de juegos',
    'settings.planned.profiles': 'Perfiles de usuario',
    'settings.planned.community': 'Hub de comunidad',

    'about.kicker': 'Encabezado',
    'about.title': 'Acerca de Futhero Launcher',
    'about.subtitle':
      'Transparencia y aviso legal sobre cómo este launcher interactúa con juegos de terceros.',

    'about.s1.title': 'Sección 1 — ¿Qué es Futhero Launcher?',
    'about.s1.body':
      'Futhero Launcher es una aplicación de escritorio impulsada por la comunidad que ofrece acceso conveniente a juegos de navegador a través de una interfaz unificada. Abre los sitios oficiales dentro de una ventana para que los jugadores inicien juegos desde un solo lugar.',
    'about.s1.examples': 'Ejemplos de sitios oficiales incluidos:',

    'about.s2.title': 'Sección 2 — Aviso de proyecto no oficial',
    'about.s2.body':
      'Este proyecto no está afiliado, respaldado ni patrocinado por los desarrolladores de Haxball, Bonk.io o cualquier otro juego disponible en el launcher. Futhero Launcher es un proyecto comunitario no oficial creado para facilitar el acceso.',

    'about.s3.title': 'Sección 3 — Propiedad de los juegos',
    'about.s3.body':
      'Todos los juegos a los que se accede mediante este launcher siguen siendo propiedad intelectual de sus respectivos dueños. Cualquier marca, logotipo, contenido del juego y recursos de marca pertenecen a sus creadores.',

    'about.s4.title': 'Sección 4 — Sin modificación de gameplay',
    'about.s4.body':
      'El launcher no modifica mecánicas, física ni sistemas de juego. Los juegos se ejecutan exactamente como lo hacen en un navegador normal.',
    'about.s4.point1': 'Sin modificaciones de física',
    'about.s4.point2': 'Sin automatización de gameplay',
    'about.s4.point3': 'Sin manipulación de servidores',
    'about.s4.point4': 'Sin sistemas de cheats',

    'about.s5.title': 'Sección 5 — Política de anuncios',
    'about.s5.body':
      'El launcher no bloquea ni elimina anuncios de los juegos. Los anuncios permanecen tal como aparecen en los sitios oficiales.',

    'about.s6.title': 'Sección 6 — Personalización visual vía DOM',
    'about.s6.body':
      'En algunos casos, el launcher puede aplicar cambios visuales opcionales usando manipulación estándar del DOM, similar a cómo las extensiones del navegador personalizan la apariencia de páginas. Estos ajustes son puramente cosméticos y pueden incluir temas de color o pequeños ajustes de interfaz.',
    'about.s6.tag1': 'Colores',
    'about.s6.tag2': 'Temas visuales',
    'about.s6.tag3': 'Estilo de UI',

    'about.s7.title': 'Sección 7 — Objetivo comunitario',
    'about.s7.body':
      'El objetivo de este proyecto es contribuir positivamente a las comunidades de estos juegos haciéndolos más fáciles de acceder y descubrir. Si disfrutas de estos juegos, apoya los sitios oficiales y a sus creadores.',

    'about.disclaimer.title': 'Aviso',
    'about.disclaimer.body1': 'Todos los juegos pertenecen a sus respectivos creadores.',
    'about.disclaimer.body2': 'Este launcher solo proporciona acceso a los sitios oficiales.',

    'play.back': 'Volver',
    'play.loading': 'Cargando…',
    'play.notFound.title': 'Juego no encontrado',
    'play.notFound.body': 'El juego seleccionado no está disponible.',
    'play.notFound.home': 'Inicio',

    'footer.disclaimer':
      'Esta aplicación solo proporciona acceso a sitios oficiales de juegos. Todos los juegos pertenecen a sus respectivos dueños.',
  },
  en: {
    'app.title': 'Futhero Launcher',

    'nav.home': 'Home',
    'nav.games': 'Games',
    'nav.settings': 'Settings',
    'nav.about': 'About',
    'nav.menu': 'Menu',

    'home.kicker': 'Web Game Hub',
    'home.title': 'Futhero Launcher',
    'home.subtitle':
      'Pick a game and launch it inside the app. Clean, fast, and designed like a native gaming dashboard.',
    'home.cta.browse': 'Browse Games',
    'home.cta.learnMore': 'Learn More',
    'home.feature.instant.title': 'Instant launch',
    'home.feature.instant.body': 'Open official game websites inside an app-controlled WebView.',
    'home.feature.clean.title': 'Clean UI',
    'home.feature.clean.body': 'Dark theme, subtle glow, and smooth motion everywhere.',
    'home.feature.future.title': 'Future-ready',
    'home.feature.future.body': 'Built to evolve: favorites, search, profiles, and community.',

    'games.kicker': 'Games',
    'games.title': 'Choose your arena',
    'games.subtitle': 'These are official websites opened inside the app. No hosting, no redistribution.',

    'game.badge.official': 'Official',
    'game.launchHint': 'Launch inside WebView',
    'game.play': 'Play',
    'game.thumbnailAlt': '{name} thumbnail',
    'game.description.haxball': 'Physics-based multiplayer soccer game.',
    'game.description.bonk': 'Competitive physics platform battle game.',

    'settings.kicker': 'Settings',
    'settings.title': 'Personalize your hub',
    'settings.language.title': 'Language',
    'settings.language.subtitle': 'Choose the launcher interface language.',
    'settings.language.pt': 'Português',
    'settings.language.es': 'Español',
    'settings.language.en': 'English',
    'settings.planned.title': 'Planned features',
    'settings.planned.favorites': 'Favorites',
    'settings.planned.search': 'Game search',
    'settings.planned.profiles': 'User profiles',
    'settings.planned.community': 'Community hub',

    'about.kicker': 'Header',
    'about.title': 'About Futhero Launcher',
    'about.subtitle':
      'Transparency and legal disclaimer about how this launcher interacts with third-party games.',

    'about.s1.title': 'Section 1 — What is Futhero Launcher?',
    'about.s1.body':
      'Futhero Launcher is a community-driven desktop application that provides convenient access to popular browser games through a unified interface. It opens the official websites inside a desktop window so players can launch games from one place.',
    'about.s1.examples': 'Examples of official game websites included:',

    'about.s2.title': 'Section 2 — Unofficial Project Notice',
    'about.s2.body':
      'This project is not affiliated with, endorsed by, or sponsored by the developers of Haxball, Bonk.io, or any other game available in the launcher. Futhero Launcher is an unofficial community project built to make access more convenient.',

    'about.s3.title': 'Section 3 — Game Ownership',
    'about.s3.body':
      'All games accessed through this launcher remain the intellectual property of their respective owners. Any trademarks, logos, game content, and brand assets belong to their creators.',

    'about.s4.title': 'Section 4 — No Gameplay Modification',
    'about.s4.body':
      'The launcher does not modify game mechanics, physics, or gameplay systems. All games run exactly as they do in a normal web browser.',
    'about.s4.point1': 'No physics modifications',
    'about.s4.point2': 'No gameplay automation',
    'about.s4.point3': 'No server manipulation',
    'about.s4.point4': 'No cheat systems',

    'about.s5.title': 'Section 5 — Advertisement Policy',
    'about.s5.body':
      'The launcher does not block or remove advertisements from the games. Ads remain intact as they appear on the official websites.',

    'about.s6.title': 'Section 6 — Visual Customization via DOM',
    'about.s6.body':
      'In some cases, the launcher may apply optional visual styling changes using standard DOM manipulation, similar to how browser extensions customize webpage appearance. These adjustments are purely cosmetic and may include color themes or minor interface styling.',
    'about.s6.tag1': 'Colors',
    'about.s6.tag2': 'Visual themes',
    'about.s6.tag3': 'UI styling',

    'about.s7.title': 'Section 7 — Community Goal',
    'about.s7.body':
      'The goal of this project is to contribute positively to the communities around these games by making them easier to access and discover. If you enjoy these games, please support the official websites and their creators.',

    'about.disclaimer.title': 'Disclaimer',
    'about.disclaimer.body1': 'All games belong to their respective creators.',
    'about.disclaimer.body2': 'This launcher only provides access to the official websites.',

    'play.back': 'Back',
    'play.loading': 'Loading…',
    'play.notFound.title': 'Game not found',
    'play.notFound.body': 'The selected game is not available.',
    'play.notFound.home': 'Home',

    'footer.disclaimer':
      'This application only provides access to official game websites. All games belong to their respective owners.',
  },
} as const

type TranslationsByLanguage = typeof translations
export type TranslationKey = keyof TranslationsByLanguage['en']

function detectDefaultLanguage(): Language {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'pt' || stored === 'es' || stored === 'en') return stored

  const navLang = navigator.language.toLowerCase()
  if (navLang.startsWith('pt')) return 'pt'
  if (navLang.startsWith('es')) return 'es'
  return 'en'
}

type I18nValue = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string
}

const I18nContext = createContext<I18nValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => detectDefaultLanguage())

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language)
  }, [language])

  const value = useMemo<I18nValue>(() => {
    return {
      language,
      setLanguage,
      t: (key, vars) => {
        const raw = translations[language][key] ?? translations.en[key]
        if (!vars) return raw
        return raw.replace(/\{(\w+)\}/g, (_, name: string) => String(vars[name] ?? `{${name}}`))
      },
    }
  }, [language])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const value = useContext(I18nContext)
  if (!value) throw new Error('useI18n must be used within an I18nProvider')
  return value
}
