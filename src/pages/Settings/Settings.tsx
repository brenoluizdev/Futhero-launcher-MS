import { motion } from 'framer-motion'

export function Settings() {
  return (
    <div className="mx-auto w-full max-w-[1400px]">
      <div className="mb-5">
        <div className="text-sm font-semibold tracking-wide text-muted-foreground">Settings</div>
        <h2 className="mt-1 text-2xl font-semibold text-foreground font-gaming">Personalize your hub</h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45 }}
        className="rounded-xl2 border border-border/60 bg-gradient-card p-5 shadow-glow-soft"
      >
        <div className="text-sm font-semibold text-foreground">Planned features</div>
        <div className="mt-2 grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
          <div className="rounded-lg border border-border/60 bg-secondary/45 px-3 py-2">Favorites</div>
          <div className="rounded-lg border border-border/60 bg-secondary/45 px-3 py-2">Game search</div>
          <div className="rounded-lg border border-border/60 bg-secondary/45 px-3 py-2">User profiles</div>
          <div className="rounded-lg border border-border/60 bg-secondary/45 px-3 py-2">Community hub</div>
        </div>
      </motion.div>
    </div>
  )
}
