/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          950: '#070A12',
          900: '#0B1020',
          800: '#0F1733',
        },
        panel: {
          900: 'rgba(16, 24, 48, 0.72)',
          800: 'rgba(20, 30, 60, 0.72)',
        },
        neon: {
          500: '#7C5CFF',
          400: '#9C86FF',
          300: '#B8AAFF',
        },
        accent: {
          500: '#22D3EE',
          400: '#5EEAD4',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(124, 92, 255, 0.22), 0 20px 60px rgba(2, 6, 23, 0.65)',
        soft: '0 16px 40px rgba(2, 6, 23, 0.55)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
