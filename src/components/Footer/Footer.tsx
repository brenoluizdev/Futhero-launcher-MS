import { useI18n } from '../../i18n'

export function Footer() {
  const { t } = useI18n()

  return (
    <div className="border-t border-border/60">
      <div className="w-full px-4 py-4 text-xs text-muted-foreground">
        {t('footer.disclaimer')}
      </div>
    </div>
  )
}
