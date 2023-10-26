import './assets/main.css'
import './assets/tailwind.css'
import 'nprogress/nprogress.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from './plugins/i18n'
import Icon from './directives/icon'
import { auth } from './includes/firebase'
import ProgressBar from './plugins/progress-bar'
import GlobalComponents from './includes/_globals'
import VeeValidationPlugin from './plugins/validation'

ProgressBar(router)

let app

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)

    app.use(createPinia())
    app.use(router)
    app.use(VeeValidationPlugin, { foo: 100 })
    app.use(i18n)
    app.use(GlobalComponents)

    app.directive('icon', Icon)

    app.mount('#app')
  }
})
