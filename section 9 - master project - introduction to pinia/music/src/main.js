import './assets/main.css'
import './assets/tailwind.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
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
    app.directive('icon', Icon)

    app.mount('#app')
  }
})
