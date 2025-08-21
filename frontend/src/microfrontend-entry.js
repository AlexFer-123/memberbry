import { createApp } from 'vue'
import LoginMicrofrontend from './components/microfrontend/LoginMicrofrontend.vue'
import './global.css'

export const bootstrapLogin = (config = {}) => {
  const {
    container = '#memberbry-login',
    ...loginProps
  } = config

  const app = createApp(LoginMicrofrontend, loginProps)
  
  if (!window.axios && !app.config.globalProperties.$axios) {
    import('axios').then(axios => {
      app.provide('axios', axios.default)
      window.axios = axios.default
    })
  }
  
  app.mount(container)
  return app
}

if (process.env.NODE_ENV === 'development' && !window.__MICROFRONTEND_HOST__) {
  const app = bootstrapLogin({
    container: '#app',
    apiBaseUrl: 'https://membry.onrender.com',
    showRememberMe: true,
    onLoginSuccess: (authData) => {
      console.log('Login successful:', authData)
      alert(`Bem-vindo, ${authData.user?.name || authData.user?.email}!`)
    },
    onLoginError: (errorData) => {
      console.error('Login error:', errorData)
    }
  })
}

export { default as LoginMicrofrontend } from './components/microfrontend/LoginMicrofrontend.vue'
export { createLoginConfig, MicrofrontendConfig } from './components/microfrontend/index.js'
