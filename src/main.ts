// register vue composition api globally
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import { registerSW } from 'virtual:pwa-register'
import App from './App.vue'

// windicss layers
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import './styles/main.css'
import 'virtual:windi-utilities.css'
import { initSW } from './sw-helpers'

// if ('serviceWorker' in navigator) {
//   console.log('sw')
//   // && !/localhost/.test(window.location)) {
//   registerSW()
// }
if (import.meta.env.MODE !== 'development') initSW()
const app = createApp(App)
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) return { el: to.hash }
  },
})

app.use(router)
app.mount('#app')
