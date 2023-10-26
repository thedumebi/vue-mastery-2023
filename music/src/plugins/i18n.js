import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import fr from '@/locales/fr.json'

/**
 * Load locale messages
 *
 * The loaded `JSON` locale messages is pre-compiled by `@intlify/vue-i18n-loader`, which is integrated into `vue-cli-plugin-i18n`.
 * See: https://github.com/intlify/vue-i18n-loader#rocket-i18n-resource-pre-compilation
 */
// function loadLocaleMessages() {
//   const locales = require.context('../locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
//   const messages = {}
//   locales.keys().forEach((key) => {
//     const matched = key.match(/([A-Za-z0-9-_]+)\./i)
//     if (matched && matched.length > 1) {
//       const locale = matched[1]
//       messages[locale] = locales(key).default
//     }
//   })
//   return messages
// }

// export default createI18n({
//   locale: process.env.VUE_APP_I18N_LOCALE || 'en', // https://www.science.co.il/language/Locale-codes.php <= view list of locales
//   fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
//   messages: loadLocaleMessages(),
//   numberFormats: {
//     en: {
//       currency: { style: 'currency', currency: 'USD' }
//     },
//     ja: {
//       currency: { style: 'currency', currency: 'JPY' }
//     }
//   }
// })

export default createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  // messages option contains a list of translations for our locale. property names must be the locale
  messages: {
    en,
    fr
  },
  // you can also outsource this to its on=w file. number translations are separate from messages
  // https://vue-i18n.intlify.dev/guide/essentials/number.html
  numberFormats: {
    en: {
      /**
       * instead of setting translation to a string you need to create an object
       * the objevct would hold the setting for how the library should translate the string
       */
      currency: { style: 'currency', currency: 'USD' },
      dmb: { style: 'decimal', maximumFractionDigits: 2 }
    },
    ja: {
      currency: { style: 'currency', currency: 'JPY' },
      dmb: { style: 'decimal', maximumFractionDigits: 3 }
    }
  }
})
