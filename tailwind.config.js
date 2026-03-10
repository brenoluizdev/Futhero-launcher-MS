/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
          glow: 'hsl(var(--primary-glow) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
          500: 'hsl(var(--accent) / <alpha-value>)',
          400: 'hsl(var(--primary-glow) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
        orange: {
          50: 'hsl(30 100% 98% / <alpha-value>)',
          100: 'hsl(30 100% 90% / <alpha-value>)',
          200: 'hsl(30 100% 80% / <alpha-value>)',
          300: 'hsl(30 100% 70% / <alpha-value>)',
          400: 'hsl(30 100% 60% / <alpha-value>)',
          500: 'hsl(24 100% 50% / <alpha-value>)',
          600: 'hsl(20 100% 45% / <alpha-value>)',
          700: 'hsl(18 100% 40% / <alpha-value>)',
          800: 'hsl(16 90% 35% / <alpha-value>)',
          900: 'hsl(14 80% 25% / <alpha-value>)',
        },
        bg: {
          950: 'hsl(var(--background) / <alpha-value>)',
          900: 'hsl(var(--background) / <alpha-value>)',
          800: 'hsl(var(--card) / <alpha-value>)',
        },
        panel: {
          900: 'hsl(var(--card) / 0.72)',
          800: 'hsl(var(--popover) / 0.72)',
        },
        neon: {
          500: 'hsl(var(--primary) / <alpha-value>)',
          400: 'hsl(var(--primary-glow) / <alpha-value>)',
          300: 'hsl(30 100% 70% / <alpha-value>)',
        },
      },
      boxShadow: {
        glow: 'var(--shadow-glow-primary)',
        soft: 'var(--shadow-glow-soft)',
        elevated: 'var(--shadow-elevated)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl2: 'calc(var(--radius) + 0.5rem)',
      },
    },
  },
  plugins: [],
}
