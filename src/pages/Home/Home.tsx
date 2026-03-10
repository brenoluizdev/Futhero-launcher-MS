import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export function Home() {
  return (
    <div className="mx-auto w-full max-w-[1400px]">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="rounded-xl2 border border-border/60 bg-gradient-card p-6 shadow-glow-soft"
      >
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold tracking-wide text-primary">Web Game Hub</div>
            <h1 className="mt-2 text-3xl font-semibold text-foreground font-gaming">Futhero Launcher</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Pick a game and launch it inside the app. Clean, fast, and designed like a native gaming dashboard.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/games"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-smooth hover:bg-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              Browse Games
            </Link>
            <Link
              to="/about"
              className="rounded-lg border border-border/70 bg-secondary/55 px-4 py-2 text-sm font-semibold text-foreground/85 transition-smooth hover:bg-secondary/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
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
          className="rounded-xl2 border border-border/60 bg-gradient-card p-5 shadow-glow-soft"
        >
          <div className="text-sm font-semibold text-foreground">Instant launch</div>
          <div className="mt-1 text-sm text-muted-foreground">Open official game websites inside an app-controlled WebView.</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="rounded-xl2 border border-border/60 bg-gradient-card p-5 shadow-glow-soft"
        >
          <div className="text-sm font-semibold text-foreground">Clean UI</div>
          <div className="mt-1 text-sm text-muted-foreground">Dark theme, subtle glow, and smooth motion everywhere.</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="rounded-xl2 border border-border/60 bg-gradient-card p-5 shadow-glow-soft"
        >
          <div className="text-sm font-semibold text-foreground">Future-ready</div>
          <div className="mt-1 text-sm text-muted-foreground">Built to evolve: favorites, search, profiles, and community.</div>
        </motion.div>
      </div>
    </div>
  )
}
