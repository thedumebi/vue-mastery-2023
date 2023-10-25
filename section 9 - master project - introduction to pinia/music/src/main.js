import './assets/main.css'
import './assets/tailwind.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from './plugins/i18n'
import Icon from './directives/icon'
import { auth } from './includes/firebase'
import VeeValidationPlugin from './plugins/validation'

let app

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)

    app.use(createPinia())
    app.use(router)
    app.use(VeeValidationPlugin, { foo: 100 })
    app.use(i18n)
    app.directive('icon', Icon)

    app.mount('#app')
  }
})
