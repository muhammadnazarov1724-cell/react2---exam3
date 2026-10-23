import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ru from '../public/locales/ru/translation.json'
import tj from '../public/locales/tj/translation.json'
import en from '../public/locales/en/translation.json'

void i18n.use(initReactI18next).init({
  resources: { ru: { translation: ru }, tj: { translation: tj }, en: { translation: en } },
  lng: localStorage.getItem('language') || 'ru',
  fallbackLng: 'ru',
  supportedLngs: ['ru', 'tj', 'en'],
  interpolation: { escapeValue: false },
})

i18n.on('languageChanged', (language) => {
  localStorage.setItem('language', language)
  document.documentElement.lang = language
})
document.documentElement.lang = i18n.language

export default i18n
