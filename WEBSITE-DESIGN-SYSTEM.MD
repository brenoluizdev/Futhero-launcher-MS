# Design System — FUTHERO

Este documento descreve os tokens e configurações de UI do projeto (cores, tipografia, raios, gradientes, sombras e animações), além de onde cada item está definido no código.

## Fonte de verdade (onde editar)

- Tokens em HSL, gradientes, sombras, utilitários e classes de efeito: [index.css](file:///c:/Users/breno/Desktop/FUTHERO/PROJECT%20NEW-WEBSITE-BACKEND/futhero-website/src/index.css)
- Configuração do Tailwind (mapeamento tokens → classes, container, radius, animações): [tailwind.config.ts](file:///c:/Users/breno/Desktop/FUTHERO/PROJECT%20NEW-WEBSITE-BACKEND/futhero-website/tailwind.config.ts)
- Estilos globais do App Router (fontes do next/font e animações específicas): [globals.css](file:///c:/Users/breno/Desktop/FUTHERO/PROJECT%20NEW-WEBSITE-BACKEND/futhero-website/src/app/globals.css) e [layout.tsx](file:///c:/Users/breno/Desktop/FUTHERO/PROJECT%20NEW-WEBSITE-BACKEND/futhero-website/src/app/layout.tsx)

## Stack de UI

- Next.js (App Router)
- Tailwind CSS (classes utilitárias + tokens via CSS variables)
- shadcn/ui + Radix UI (componentes em `src/components/ui`)
- `next-themes` (infra de tema, quando usado)

## Cores

### Tokens semânticos (HSL)

Os tokens abaixo vivem em `:root` e `.dark` no [index.css](file:///c:/Users/breno/Desktop/FUTHERO/PROJECT%20NEW-WEBSITE-BACKEND/futhero-website/src/index.css) e são consumidos pelo Tailwind via `hsl(var(--token))` em [tailwind.config.ts](file:///c:/Users/breno/Desktop/FUTHERO/PROJECT%20NEW-WEBSITE-BACKEND/futhero-website/tailwind.config.ts).

| Token | Valor (HSL) | Uso (Tailwind) |
|---|---:|---|
| `--background` | `20 15% 8%` | `bg-background` |
| `--foreground` | `30 100% 98%` | `text-foreground` |
| `--card` | `20 20% 10%` | `bg-card` |
| `--card-foreground` | `30 100% 98%` | `text-card-foreground` |
| `--popover` | `20 25% 12%` | `bg-popover` |
| `--popover-foreground` | `30 100% 98%` | `text-popover-foreground` |
| `--primary` | `24 100% 50%` | `bg-primary` / `text-primary` |
| `--primary-foreground` | `30 100% 98%` | `text-primary-foreground` |
| `--primary-glow` | `24 100% 60%` | `text-primary-glow` / `bg-primary-glow` |
| `--secondary` | `20 25% 15%` | `bg-secondary` |
| `--secondary-foreground` | `30 95% 90%` | `text-secondary-foreground` |
| `--muted` | `20 20% 18%` | `bg-muted` |
| `--muted-foreground` | `30 25% 60%` | `text-muted-foreground` |
| `--accent` | `30 100% 55%` | `bg-accent` |
| `--accent-foreground` | `20 15% 8%` | `text-accent-foreground` |
| `--destructive` | `0 84.2% 60.2%` (`:root`) / `0 62.8% 30.6%` (`.dark`) | `bg-destructive` |
| `--destructive-foreground` | `30 100% 98%` | `text-destructive-foreground` |
| `--border` | `20 25% 20%` | `border-border` |
| `--input` | `20 25% 15%` | `bg-input` / `border-input` |
| `--ring` | `24 100% 50%` | `ring-ring` |

### Escala “orange” (HSL)

Além dos tokens semânticos, existe uma escala `orange` customizada em [tailwind.config.ts](file:///c:/Users/breno/Desktop/FUTHERO/PROJECT%20NEW-WEBSITE-BACKEND/futhero-website/tailwind.config.ts):

| Classe | Valor (HSL) |
|---|---:|
| `orange-50` | `30 100% 98%` |
| `orange-100` | `30 100% 90%` |
| `orange-200` | `30 100% 80%` |
| `orange-300` | `30 100% 70%` |
| `orange-400` | `30 100% 60%` |
| `orange-500` | `24 100% 50%` |
| `orange-600` | `20 100% 45%` |
| `orange-700` | `18 100% 40%` |
| `orange-800` | `16 90% 35%` |
| `orange-900` | `14 80% 25%` |

## Tipografia

Fontes presentes no repositório:

- Rajdhani via `next/font` (variável `--font-rajdhani`): [layout.tsx](file:///c:/Users/breno/Desktop/FUTHERO/PROJECT%20NEW-WEBSITE-BACKEND/futhero-website/src/app/layout.tsx)
- Inter e Orbitron via Google Fonts importado no CSS: [index.css](file:///c:/Users/breno/Desktop/FUTHERO/PROJECT%20NEW-WEBSITE-BACKEND/futhero-website/src/index.css)

Padrões de uso já existentes:

- Fonte “gaming”: classe `.font-gaming` (Orbitron + tracking) no [index.css](file:///c:/Users/breno/Desktop/FUTHERO/PROJECT%20NEW-WEBSITE-BACKEND/futhero-website/src/index.css)

## Layout (container)

Configuração do container do Tailwind: [tailwind.config.ts](file:///c:/Users/breno/Desktop/FUTHERO/PROJECT%20NEW-WEBSITE-BACKEND/futhero-website/tailwind.config.ts)

- Centralizado
- Padding padrão: `2rem`
- Breakpoint `2xl`: `1400px`

## Raios e bordas

Token base:

- `--radius: 0.75rem` em [index.css](file:///c:/Users/breno/Desktop/FUTHERO/PROJECT%20NEW-WEBSITE-BACKEND/futhero-website/src/index.css)

Mapeamento no Tailwind:

- `rounded-lg`: `var(--radius)`
- `rounded-md`: `calc(var(--radius) - 2px)`
- `rounded-sm`: `calc(var(--radius) - 4px)`

## Gradientes, sombras e transições

### Gradientes (CSS variables)

Definidos em [index.css](file:///c:/Users/breno/Desktop/FUTHERO/PROJECT%20NEW-WEBSITE-BACKEND/futhero-website/src/index.css):

- `--gradient-hero`
- `--gradient-card`
- `--gradient-border`

Utilitários:

- `.bg-gradient-hero`
- `.bg-gradient-card`
- `.bg-gradient-border`

### Sombras / glow

Definidos em [index.css](file:///c:/Users/breno/Desktop/FUTHERO/PROJECT%20NEW-WEBSITE-BACKEND/futhero-website/src/index.css):

- `--shadow-glow-primary`
- `--shadow-glow-soft`
- `--shadow-elevated`

Utilitários:

- `.shadow-glow-primary`
- `.shadow-glow-soft`
- `.shadow-elevated`

### Transições

- `--transition-smooth: all 0.4s cubic-bezier(0.4, 0, 0.2, 1)` em [index.css](file:///c:/Users/breno/Desktop/FUTHERO/PROJECT%20NEW-WEBSITE-BACKEND/futhero-website/src/index.css)
- utilitário `.transition-smooth`

## Animações

### Tailwind (extend)

Em [tailwind.config.ts](file:///c:/Users/breno/Desktop/FUTHERO/PROJECT%20NEW-WEBSITE-BACKEND/futhero-website/tailwind.config.ts):

- `accordion-down`, `accordion-up`
- `spin-slow` (`spin 3s linear infinite`)

### CSS global (classes prontas)

Em [globals.css](file:///c:/Users/breno/Desktop/FUTHERO/PROJECT%20NEW-WEBSITE-BACKEND/futhero-website/src/app/globals.css):

- `animate-float`, `animate-float-delayed`, `animate-float-logo`
- `animate-fade-in`, `animate-fade-in-up`
- `animate-firework`
- `animate-bounce-slow`
- `animate-spin-slow`, `animate-reverse-spin-slow`
- `animate-pulse-glow`

Em [index.css](file:///c:/Users/breno/Desktop/FUTHERO/PROJECT%20NEW-WEBSITE-BACKEND/futhero-website/src/index.css):

- `animate-glow-pulse`, `animate-slide-up`, `animate-scale-in`, `animate-float`

## Tema (dark mode)

Configuração:

- Tailwind: `darkMode: "class"` em [tailwind.config.ts](file:///c:/Users/breno/Desktop/FUTHERO/PROJECT%20NEW-WEBSITE-BACKEND/futhero-website/tailwind.config.ts)
- Tokens: bloco `.dark { ... }` em [index.css](file:///c:/Users/breno/Desktop/FUTHERO/PROJECT%20NEW-WEBSITE-BACKEND/futhero-website/src/index.css)

## Convenções de uso

- Prefira cores semânticas (`bg-background`, `text-foreground`, `bg-card`, `border-border`, `bg-primary`) em vez de cores “fixas”, quando fizer sentido.
- Para efeitos de marca, use os utilitários de gradiente e glow definidos em [index.css](file:///c:/Users/breno/Desktop/FUTHERO/PROJECT%20NEW-WEBSITE-BACKEND/futhero-website/src/index.css).
- Componentes base (botão, input, alert, etc.) seguem o padrão shadcn/ui em `src/components/ui`.

