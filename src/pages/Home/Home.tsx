import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export function Home() {
  return (
    <div className="mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="rounded-xl2 border border-white/10 bg-panel-900 p-6 shadow-soft"
      >
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold tracking-wide text-neon-300">Web Game Hub</div>
            <h1 className="mt-2 text-3xl font-semibold text-white">Futhero Launcher</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
              Pick a game and launch it inside the app. Clean, fast, and designed like a native gaming dashboard.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/games"
              className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Browse Games
            </Link>
            <Link
              to="/about"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10"
            >
              Learn More
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="rounded-xl2 border border-white/10 bg-panel-900 p-5 shadow-soft"
        >
          <div className="text-sm font-semibold text-white">Instant launch</div>
          <div className="mt-1 text-sm text-white/65">Open official game websites inside an app-controlled WebView.</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="rounded-xl2 border border-white/10 bg-panel-900 p-5 shadow-soft"
        >
          <div className="text-sm font-semibold text-white">Clean UI</div>
          <div className="mt-1 text-sm text-white/65">Dark theme, subtle glow, and smooth motion everywhere.</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="rounded-xl2 border border-white/10 bg-panel-900 p-5 shadow-soft"
        >
          <div className="text-sm font-semibold text-white">Future-ready</div>
          <div className="mt-1 text-sm text-white/65">Built to evolve: favorites, search, profiles, and community.</div>
        </motion.div>
      </div>
    </div>
  )
}

