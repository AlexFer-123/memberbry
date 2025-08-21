<template>
  <div class="example-container">
    <h2>Exemplo de Uso - Login Microfrontend</h2>
    
    <div class="example-section">
      <h3>1. Configuração Básica</h3>
      <LoginMicrofrontend
        :api-base-url="apiUrl"
        @login-success="onLoginSuccess"
        @login-error="onLoginError"
      />
    </div>
    
    <div class="example-section">
      <h3>2. Customização Completa</h3>
      <LoginMicrofrontend
        v-bind="customConfig"
        @login-success="onCustomLoginSuccess"
        @register-click="onRegisterClick"
        @forgot-password-click="onForgotPasswordClick"
      />
    </div>
    
    <div class="example-section">
      <h3>3. Tema Minimal</h3>
      <LoginMicrofrontend
        v-bind="minimalConfig"
        @login-success="onMinimalLoginSuccess"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import LoginMicrofrontend from '../components/microfrontend/LoginMicrofrontend.vue'
import { createLoginConfig, MicrofrontendConfig } from '../components/microfrontend/index.js'

const apiUrl = ref('https://membry.onrender.com')

const customConfig = reactive(createLoginConfig({
  theme: 'default',
  apiConfig: {
    apiBaseUrl: 'https://membry.onrender.com',
    authTokenKey: 'customAuthToken'
  },
  texts: {
    title: 'Minha Aplicação',
    subtitle: 'Acesse sua conta personalizada',
    cardTitle: 'Login Personalizado',
    loginButtonText: 'Acessar Sistema'
  },
  features: {
    showRememberMe: true,
    showForgotPassword: true
  },
  validations: {
    email: MicrofrontendConfig.validations.email.format,
    password: MicrofrontendConfig.validations.password.minLength(8)
  },
  callbacks: {
    onSuccess: (authData) => {
      console.log('Custom login successful:', authData)
    },
    onError: (errorData) => {
      console.error('Custom login error:', errorData)
    }
  }
}))

const minimalConfig = reactive(createLoginConfig({
  theme: 'minimal',
  features: {
    showHeader: false,
    showCardFooter: false,
    showFooter: false
  },
  texts: {
    cardTitle: 'Acesso',
    cardDescription: 'Entre com suas credenciais'
  }
}))

const onLoginSuccess = (authData) => {
  console.log('Login básico bem-sucedido:', authData)
  alert(`Bem-vindo, ${authData.user?.name || authData.user?.email}!`)
}

const onLoginError = (errorData) => {
  console.error('Erro no login básico:', errorData)
  alert(`Erro: ${errorData.error}`)
}

const onCustomLoginSuccess = (authData) => {
  console.log('Login customizado bem-sucedido:', authData)
}

const onRegisterClick = (data) => {
  console.log('Clique no registro:', data)
  alert('Redirecionando para registro...')
}

const onForgotPasswordClick = (data) => {
  console.log('Clique em esqueci a senha:', data)
  alert('Redirecionando para recuperação de senha...')
}

const onMinimalLoginSuccess = (authData) => {
  console.log('Login minimal bem-sucedido:', authData)
}
</script>

<style scoped>
.example-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.example-section {
  margin-bottom: 3rem;
  padding: 2rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.example-section h3 {
  margin-bottom: 1rem;
  color: #374151;
}
</style>
