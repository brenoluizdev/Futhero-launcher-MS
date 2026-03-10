import { motion } from 'framer-motion'

export function About() {
  return (
    <div className="mx-auto w-full max-w-[1400px]">
      <div className="mb-5">
        <div className="text-sm font-semibold tracking-wide text-muted-foreground">About</div>
        <h2 className="mt-1 text-2xl font-semibold text-foreground font-gaming">Futhero Launcher</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          A desktop launcher built with Tauri + React to access browser games in a clean, native-feeling hub.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45 }}
        className="rounded-xl2 border border-border/60 bg-gradient-card p-5 shadow-glow-soft"
      >
        <div className="text-sm font-semibold text-foreground">Legal notice</div>
        <div className="mt-2 text-sm leading-relaxed text-muted-foreground">
          This application only provides access to official game websites. All games belong to their respective owners.
        </div>
      </motion.div>
    </div>
  )
}
