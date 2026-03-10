import { motion } from 'framer-motion'
import { useI18n } from '../../i18n'

export function About() {
  const { t } = useI18n()

  return (
    <div className="mx-auto w-full max-w-[1400px]">
      <div className="mb-6">
        <div className="text-sm font-semibold tracking-wide text-muted-foreground">{t('about.kicker')}</div>
        <h2 className="mt-1 text-2xl font-semibold text-foreground font-gaming">{t('about.title')}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {t('about.subtitle')}
        </p>
      </div>

      <div className="grid gap-4">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45 }}
          className="rounded-xl2 border border-border/60 bg-gradient-card p-5 shadow-glow-soft"
        >
          <div className="text-sm font-semibold text-foreground">{t('about.s1.title')}</div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {t('about.s1.body')}
          </p>
          <div className="mt-3 rounded-lg border border-border/60 bg-secondary/35 px-3 py-2 text-xs text-muted-foreground">
            {t('about.s1.examples')}{' '}
            <a
              className="text-foreground/85 hover:text-foreground"
              href="https://www.haxball.com"
              target="_blank"
              rel="noreferrer"
            >
              https://www.haxball.com
            </a>{' '}
            <span className="text-muted-foreground/70">•</span>{' '}
            <a
              className="text-foreground/85 hover:text-foreground"
              href="https://bonk.io"
              target="_blank"
              rel="noreferrer"
            >
              https://bonk.io
            </a>
            .
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, delay: 0.04 }}
          className="rounded-xl2 border border-border/60 bg-gradient-card p-5 shadow-glow-soft"
        >
          <div className="text-sm font-semibold text-foreground">{t('about.s2.title')}</div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {t('about.s2.body')}
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="rounded-xl2 border border-border/60 bg-gradient-card p-5 shadow-glow-soft"
        >
          <div className="text-sm font-semibold text-foreground">{t('about.s3.title')}</div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {t('about.s3.body')}
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, delay: 0.12 }}
          className="rounded-xl2 border border-border/60 bg-gradient-card p-5 shadow-glow-soft"
        >
          <div className="text-sm font-semibold text-foreground">{t('about.s4.title')}</div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {t('about.s4.body')}
          </p>
          <ul className="mt-3 grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
            <li className="rounded-lg border border-border/60 bg-secondary/35 px-3 py-2">{t('about.s4.point1')}</li>
            <li className="rounded-lg border border-border/60 bg-secondary/35 px-3 py-2">{t('about.s4.point2')}</li>
            <li className="rounded-lg border border-border/60 bg-secondary/35 px-3 py-2">{t('about.s4.point3')}</li>
            <li className="rounded-lg border border-border/60 bg-secondary/35 px-3 py-2">{t('about.s4.point4')}</li>
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, delay: 0.16 }}
          className="rounded-xl2 border border-border/60 bg-gradient-card p-5 shadow-glow-soft"
        >
          <div className="text-sm font-semibold text-foreground">{t('about.s5.title')}</div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {t('about.s5.body')}
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="rounded-xl2 border border-border/60 bg-gradient-card p-5 shadow-glow-soft"
        >
          <div className="text-sm font-semibold text-foreground">{t('about.s6.title')}</div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {t('about.s6.body')}
          </p>
          <div className="mt-3 grid gap-2 text-sm text-muted-foreground md:grid-cols-3">
            <div className="rounded-lg border border-border/60 bg-secondary/35 px-3 py-2">{t('about.s6.tag1')}</div>
            <div className="rounded-lg border border-border/60 bg-secondary/35 px-3 py-2">{t('about.s6.tag2')}</div>
            <div className="rounded-lg border border-border/60 bg-secondary/35 px-3 py-2">{t('about.s6.tag3')}</div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, delay: 0.24 }}
          className="rounded-xl2 border border-border/60 bg-gradient-card p-5 shadow-glow-soft"
        >
          <div className="text-sm font-semibold text-foreground">{t('about.s7.title')}</div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {t('about.s7.body')}
          </p>
        </motion.section>

        <div className="rounded-xl2 border border-border/60 bg-secondary/25 px-5 py-4">
          <div className="text-sm font-semibold text-foreground">{t('about.disclaimer.title')}</div>
          <div className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {t('about.disclaimer.body1')}
            <br />
            {t('about.disclaimer.body2')}
          </div>
        </div>
      </div>
    </div>
  )
}
