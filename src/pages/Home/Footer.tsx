import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <div className="bg-[var(--features-background)] px-5 pb-16 pt-20 font-[Arial,sans-serif] sm:px-8 lg:pb-[85px] lg:pt-[115px]">
      <div className="mx-auto max-w-[1160px]">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.8fr] lg:gap-10">
          <div>
            <NavLink to="/" className="text-[26px] font-bold tracking-[-1px] text-[var(--text-primary)]">Adl 5:8</NavLink>
            <p className="mt-8 max-w-[330px] text-[18px] leading-[1.7] text-[var(--features-muted)]">{t('footer.description')}</p>
          </div>
          <div>
            <h3 className="text-[15px] font-bold tracking-[1.5px] text-[var(--text-muted)]">{t('footer.product')}</h3>
            <div className="mt-7 flex flex-col items-start gap-6 text-[18px] text-[var(--text-muted)]">
              <NavLink to="/#features" className="transition-colors hover:text-[var(--text-primary)]">{t('footer.features')}</NavLink>
              <NavLink to="/dashboard" className="transition-colors hover:text-[var(--text-primary)]">{t('footer.dashboard')}</NavLink>
              <NavLink to="/analytics" className="transition-colors hover:text-[var(--text-primary)]">{t('footer.analytics')}</NavLink>
              <NavLink to="/contacts" className="transition-colors hover:text-[var(--text-primary)]">{t('footer.contacts')}</NavLink>
            </div>
          </div>
          <div>
            <h3 className="text-[15px] font-bold tracking-[1.5px] text-[var(--text-muted)]">{t('footer.company')}</h3>
            <div className="mt-7 flex flex-col items-start gap-6 text-[18px] text-[var(--text-muted)]">
              <NavLink to="/about" className="transition-colors hover:text-[var(--text-primary)]">{t('footer.about')}</NavLink>
              <NavLink to="/blog" className="transition-colors hover:text-[var(--text-primary)]">{t('footer.blog')}</NavLink>
              <NavLink to="/careers" className="transition-colors hover:text-[var(--text-primary)]">{t('footer.careers')}</NavLink>
              <NavLink to="/press" className="transition-colors hover:text-[var(--text-primary)]">{t('footer.press')}</NavLink>
            </div>
          </div>
          <div>
            <h3 className="text-[15px] font-bold tracking-[1.5px] text-[var(--text-muted)]">{t('footer.support')}</h3>
            <div className="mt-7 flex flex-col items-start gap-6 text-[18px] text-[var(--text-muted)]">
              <NavLink to="/docs" className="transition-colors hover:text-[var(--text-primary)]">{t('footer.docs')}</NavLink>
              <NavLink to="/help" className="transition-colors hover:text-[var(--text-primary)]">{t('footer.help')}</NavLink>
              <NavLink to="/contact" className="transition-colors hover:text-[var(--text-primary)]">{t('footer.contact')}</NavLink>
              <NavLink to="/status" className="transition-colors hover:text-[var(--text-primary)]">{t('footer.status')}</NavLink>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-[var(--features-border)] pt-8 text-[15px] text-[var(--features-muted)] sm:flex-row sm:items-center sm:justify-between lg:mt-[75px]">
          <p>{t('footer.copyright')}</p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <NavLink to="/privacy" className="transition-colors hover:text-[var(--text-primary)]">{t('footer.privacy')}</NavLink>
            <NavLink to="/terms" className="transition-colors hover:text-[var(--text-primary)]">{t('footer.terms')}</NavLink>
            <NavLink to="/cookies" className="transition-colors hover:text-[var(--text-primary)]">{t('footer.cookies')}</NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}
