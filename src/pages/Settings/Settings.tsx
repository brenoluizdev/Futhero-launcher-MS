import { motion } from 'framer-motion'
import { type Language, useI18n } from '../../i18n'

export function Settings() {
  const { language, setLanguage, t } = useI18n()

  return (
    <div className="mx-auto w-full max-w-[1400px]">
      <div className="mb-5">
        <div className="text-sm font-semibold tracking-wide text-muted-foreground">{t('settings.kicker')}</div>
        <h2 className="mt-1 text-2xl font-semibold text-foreground font-gaming">{t('settings.title')}</h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45 }}
        className="rounded-xl2 border border-border/60 bg-gradient-card p-5 shadow-glow-soft"
      >
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold text-foreground">{t('settings.language.title')}</div>
            <div className="mt-1 text-sm text-muted-foreground">{t('settings.language.subtitle')}</div>
          </div>

          <div className="mt-3 md:mt-0">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm text-foreground shadow-elevated outline-none transition-smooth focus-visible:ring-2 focus-visible:ring-ring/50 md:w-64"
            >
              <option value="pt">{t('settings.language.pt')}</option>
              <option value="es">{t('settings.language.es')}</option>
              <option value="en">{t('settings.language.en')}</option>
            </select>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45 }}
        className="mt-4 rounded-xl2 border border-border/60 bg-gradient-card p-5 shadow-glow-soft"
      >
        <div className="text-sm font-semibold text-foreground">{t('settings.planned.title')}</div>
        <div className="mt-2 grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
          <div className="rounded-lg border border-border/60 bg-secondary/45 px-3 py-2">{t('settings.planned.favorites')}</div>
          <div className="rounded-lg border border-border/60 bg-secondary/45 px-3 py-2">{t('settings.planned.search')}</div>
          <div className="rounded-lg border border-border/60 bg-secondary/45 px-3 py-2">{t('settings.planned.profiles')}</div>
          <div className="rounded-lg border border-border/60 bg-secondary/45 px-3 py-2">{t('settings.planned.community')}</div>
        </div>
      </motion.div>
    </div>
  )
}
