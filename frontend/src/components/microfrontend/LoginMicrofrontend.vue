<template>
  <div class="memberbry-login-microfrontend" :class="containerClass">
    <div class="login-container" :style="containerStyle">
      <div v-if="showHeader" class="login-header">
        <div v-if="showLogo" class="logo-container">
          <div class="logo-icon" :style="logoStyle">
            <svg class="logo-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 3v10a2 2 0 002 2h6a2 2 0 002-2V7m-8 0V5a1 1 0 011-1h6a1 1 0 011 1v2m-8 0h8"></path>
            </svg>
          </div>
          <h1 class="logo-title" :style="titleStyle">{{ title }}</h1>
        </div>
        <p v-if="subtitle" class="login-subtitle">{{ subtitle }}</p>
      </div>

      <Card class="login-card" :class="cardClass">
        <CardHeader v-if="showCardHeader" class="card-header-spacing">
          <CardTitle class="card-title">{{ cardTitle }}</CardTitle>
          <CardDescription v-if="cardDescription" class="card-description">
            {{ cardDescription }}
          </CardDescription>
        </CardHeader>

        <CardContent class="card-content-spacing">
          <Alert v-if="error" variant="destructive" class="error-alert">
            <AlertDescription>{{ error }}</AlertDescription>
          </Alert>

          <form @submit.prevent="handleLogin" class="login-form">
            <div class="field-container">
              <Label for="microfrontend-email" class="field-label">
                {{ emailLabel }}
              </Label>
              <Input
                id="microfrontend-email"
                v-model="credentials.email"
                type="email"
                :placeholder="emailPlaceholder"
                required
                class="field-input"
                :disabled="isLoading"
                @blur="validateEmail"
              />
              <span v-if="emailError" class="field-error">{{ emailError }}</span>
            </div>

            <div class="field-container">
              <div class="password-header">
                <Label for="microfrontend-password" class="field-label">
                  {{ passwordLabel }}
                </Label>
                <button 
                  v-if="showForgotPassword"
                  type="button"
                  @click="handleForgotPassword"
                  class="forgot-password-link"
                >
                  {{ forgotPasswordText }}
                </button>
              </div>
              <Input
                id="microfrontend-password"
                v-model="credentials.password"
                type="password"
                :placeholder="passwordPlaceholder"
                required
                class="field-input"
                :disabled="isLoading"
                @blur="validatePassword"
              />
              <span v-if="passwordError" class="field-error">{{ passwordError }}</span>
            </div>

            <div v-if="showRememberMe" class="remember-me-container">
              <label class="remember-me-label">
                <input 
                  v-model="rememberMe"
                  type="checkbox"
                  class="remember-me-checkbox"
                >
                <span class="remember-me-text">{{ rememberMeText }}</span>
              </label>
            </div>

            <Button 
              type="submit" 
              :disabled="isLoading || !isFormValid"
              class="login-button"
              :class="buttonClass"
              :style="buttonStyle"
            >
              <svg v-if="isLoading" class="loading-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isLoading ? loadingText : loginButtonText }}
            </Button>
          </form>
        </CardContent>

        <CardFooter v-if="showCardFooter" class="card-footer">
          <div v-if="showRegisterOption" class="register-section">
            <div class="divider">
              <div class="divider-line"></div>
              <div class="divider-text">
                <span>{{ dividerText }}</span>
              </div>
            </div>

            <Button
              variant="outline"
              class="register-button"
              @click="handleRegister"
              :disabled="isLoading"
            >
              {{ registerButtonText }}
            </Button>
          </div>

          <div v-if="customLinks.length > 0" class="custom-links">
            <button
              v-for="link in customLinks"
              :key="link.key"
              @click="handleCustomLink(link)"
              class="custom-link"
            >
              {{ link.text }}
            </button>
          </div>
        </CardFooter>
      </Card>

      <div v-if="showFooter" class="login-footer">
        <p class="footer-text">{{ footerText }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, inject, onMounted, watch } from 'vue'
import { jwtDecode } from 'jwt-decode'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardDescription from '@/components/ui/CardDescription.vue'
import CardContent from '@/components/ui/CardContent.vue'
import CardFooter from '@/components/ui/CardFooter.vue'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Label from '@/components/ui/Label.vue'
import Alert from '@/components/ui/Alert.vue'
import AlertDescription from '@/components/ui/AlertDescription.vue'

const props = defineProps({
  apiBaseUrl: {
    type: String,
    default: 'https://membry.onrender.com'
  },
  loginEndpoint: {
    type: String,
    default: '/auth/login'
  },
  userEndpoint: {
    type: String,
    default: '/users'
  },
  authTokenKey: {
    type: String,
    default: 'authMembry'
  },
  title: {
    type: String,
    default: 'Memberbry'
  },
  subtitle: {
    type: String,
    default: 'Bem-vindo de volta! Faça login em sua conta.'
  },
  cardTitle: {
    type: String,
    default: 'Entrar'
  },
  cardDescription: {
    type: String,
    default: 'Digite seu e-mail e senha para acessar sua conta'
  },
  emailLabel: {
    type: String,
    default: 'E-mail'
  },
  emailPlaceholder: {
    type: String,
    default: 'seu@email.com'
  },
  passwordLabel: {
    type: String,
    default: 'Senha'
  },
  passwordPlaceholder: {
    type: String,
    default: '••••••••'
  },
  loginButtonText: {
    type: String,
    default: 'Entrar'
  },
  loadingText: {
    type: String,
    default: 'Entrando...'
  },
  registerButtonText: {
    type: String,
    default: 'Criar nova conta'
  },
  forgotPasswordText: {
    type: String,
    default: 'Esqueceu a senha?'
  },
  rememberMeText: {
    type: String,
    default: 'Lembrar-me'
  },
  dividerText: {
    type: String,
    default: 'Ou'
  },
  footerText: {
    type: String,
    default: '© 2024 Memberbry. Todos os direitos reservados.'
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  showLogo: {
    type: Boolean,
    default: true
  },
  showCardHeader: {
    type: Boolean,
    default: true
  },
  showCardFooter: {
    type: Boolean,
    default: true
  },
  showRegisterOption: {
    type: Boolean,
    default: true
  },
  showForgotPassword: {
    type: Boolean,
    default: true
  },
  showRememberMe: {
    type: Boolean,
    default: false
  },
  showFooter: {
    type: Boolean,
    default: true
  },
  containerClass: {
    type: String,
    default: 'min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4'
  },
  cardClass: {
    type: String,
    default: 'shadow-xl border-0 bg-white/80 backdrop-blur-sm'
  },
  buttonClass: {
    type: String,
    default: 'w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg'
  },
  containerStyle: {
    type: Object,
    default: () => ({})
  },
  logoStyle: {
    type: Object,
    default: () => ({})
  },
  titleStyle: {
    type: Object,
    default: () => ({})
  },
  buttonStyle: {
    type: Object,
    default: () => ({})
  },
  emailValidation: {
    type: Function,
    default: null
  },
  passwordValidation: {
    type: Function,
    default: null
  },
  formValidation: {
    type: Function,
    default: null
  },
  customLinks: {
    type: Array,
    default: () => []
  },
  onLoginSuccess: {
    type: Function,
    default: null
  },
  onLoginError: {
    type: Function,
    default: null
  },
  onRegister: {
    type: Function,
    default: null
  },
  onForgotPassword: {
    type: Function,
    default: null
  },
  autoRedirect: {
    type: Boolean,
    default: true
  },
  persistSession: {
    type: Boolean,
    default: true
  },
  validateTokenOnMount: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits([
  'login-success',
  'login-error', 
  'register-click',
  'forgot-password-click',
  'custom-link-click',
  'validation-error',
  'auth-state-change'
])

const credentials = reactive({
  email: '',
  password: ''
})

const isLoading = ref(false)
const error = ref('')
const emailError = ref('')
const passwordError = ref('')
const rememberMe = ref(false)

const injectedConfig = inject('microfrontendConfig', {})

const finalConfig = computed(() => ({
  apiBaseUrl: props.apiBaseUrl || injectedConfig.apiBaseUrl || 'https://membry.onrender.com',
  authTokenKey: props.authTokenKey || injectedConfig.authTokenKey || 'authMembry'
}))

const isFormValid = computed(() => {
  if (props.formValidation) {
    return props.formValidation(credentials)
  }
  
  return credentials.email && 
         credentials.password && 
         !emailError.value && 
         !passwordError.value
})

const validateEmail = () => {
  emailError.value = ''
  
  if (props.emailValidation) {
    const result = props.emailValidation(credentials.email)
    if (!result.isValid) {
      emailError.value = result.message
    }
    return result.isValid
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(credentials.email)) {
    emailError.value = 'E-mail inválido'
    return false
  }
  
  return true
}

const validatePassword = () => {
  passwordError.value = ''
  
  if (props.passwordValidation) {
    const result = props.passwordValidation(credentials.password)
    if (!result.isValid) {
      passwordError.value = result.message
    }
    return result.isValid
  }
  
  if (credentials.password.length < 6) {
    passwordError.value = 'Senha deve ter pelo menos 6 caracteres'
    return false
  }
  
  return true
}

const createHttpClient = () => {
  const axios = inject('axios') || window.axios
  
  if (!axios) {
    throw new Error('Axios is not available. Please inject axios or include in window.')
  }
  
  return axios.create({
    baseURL: finalConfig.value.apiBaseUrl,
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 10000
  })
}

const handleLogin = async () => {
  if (isLoading.value || !isFormValid.value) return
  
  if (!validateEmail() || !validatePassword()) {
    emit('validation-error', { emailError: emailError.value, passwordError: passwordError.value })
    return
  }
  
  isLoading.value = true
  error.value = ''

  try {
    const httpClient = createHttpClient()
    const response = await httpClient.post(props.loginEndpoint, credentials)
    
    if (response.data?.token) {
      const { token, user: userData } = response.data
      
      if (props.persistSession) {
        localStorage.setItem(finalConfig.value.authTokenKey, token)
        
        if (rememberMe.value) {
          localStorage.setItem(`${finalConfig.value.authTokenKey}_remember`, 'true')
        }
      }
      
      let fullUserData = userData
      if (!userData && token) {
        try {
          const decoded = jwtDecode(token)
          const userResponse = await httpClient.get(`${props.userEndpoint}/${decoded.id}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          fullUserData = userResponse.data.user || userResponse.data
        } catch (e) {
          console.warn('Unable to fetch user data:', e)
          fullUserData = jwtDecode(token)
        }
      }
      
      const authData = {
        isAuthenticated: true,
        token,
        user: fullUserData,
        rememberMe: rememberMe.value
      }
      
      emit('login-success', authData)
      emit('auth-state-change', authData)
      
      if (props.onLoginSuccess) {
        props.onLoginSuccess(authData)
      }
      
      if (!rememberMe.value) {
        clearForm()
      }
      
    } else {
      throw new Error('Token not received from server')
    }
    
  } catch (e) {
    console.error('Login error:', e)
    const errorMessage = e.response?.data?.error || 
                        e.response?.data?.message || 
                        e.message || 
                        'Erro interno do servidor. Tente novamente.'
    
    error.value = errorMessage
    
    const errorData = {
      error: errorMessage,
      originalError: e,
      credentials: { email: credentials.email }
    }
    
    emit('login-error', errorData)
    
    if (props.onLoginError) {
      props.onLoginError(errorData)
    }
    
  } finally {
    isLoading.value = false
  }
}

const handleRegister = () => {
  emit('register-click', { email: credentials.email })
  
  if (props.onRegister) {
    props.onRegister({ email: credentials.email })
  }
}

const handleForgotPassword = () => {
  emit('forgot-password-click', { email: credentials.email })
  
  if (props.onForgotPassword) {
    props.onForgotPassword({ email: credentials.email })
  }
}

const handleCustomLink = (link) => {
  emit('custom-link-click', { link, credentials })
  
  if (link.onClick) {
    link.onClick({ link, credentials })
  }
}

const clearForm = () => {
  credentials.email = ''
  credentials.password = ''
  error.value = ''
  emailError.value = ''
  passwordError.value = ''
}

const setCredentials = (newCredentials) => {
  Object.assign(credentials, newCredentials)
}

const focusEmailField = () => {
  document.getElementById('microfrontend-email')?.focus()
}

onMounted(async () => {
  if (props.validateTokenOnMount) {
    const token = localStorage.getItem(finalConfig.value.authTokenKey)
    const remember = localStorage.getItem(`${finalConfig.value.authTokenKey}_remember`)
    
    if (token) {
      try {
        const decoded = jwtDecode(token)
        const now = Date.now() / 1000
        
        if (decoded.exp > now) {
          const authData = {
            isAuthenticated: true,
            token,
            user: decoded,
            fromStorage: true
          }
          
          emit('auth-state-change', authData)
          
          if (props.onLoginSuccess) {
            props.onLoginSuccess(authData)
          }
        } else {
          localStorage.removeItem(finalConfig.value.authTokenKey)
          localStorage.removeItem(`${finalConfig.value.authTokenKey}_remember`)
        }
      } catch (e) {
        console.error('Invalid token:', e)
        localStorage.removeItem(finalConfig.value.authTokenKey)
      }
    }
    
    if (remember) {
      rememberMe.value = true
      const savedEmail = localStorage.getItem(`${finalConfig.value.authTokenKey}_email`)
      if (savedEmail) {
        credentials.email = savedEmail
      }
    }
  }
})

watch([rememberMe, () => credentials.email], ([remember, email]) => {
  if (remember && email) {
    localStorage.setItem(`${finalConfig.value.authTokenKey}_email`, email)
  } else if (!remember) {
    localStorage.removeItem(`${finalConfig.value.authTokenKey}_email`)
  }
})

defineExpose({
  login: handleLogin,
  clearForm,
  setCredentials,
  focusEmailField,
  isFormValid,
  getCredentials: () => ({ ...credentials }),
  getAuthConfig: () => finalConfig.value
})
</script>

<style scoped>
.memberbry-login-microfrontend {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  --color-primary: #8b5cf6;
  --color-primary-hover: #7c3aed;
  --color-secondary: #3b82f6;
  --color-error: #ef4444;
  --color-success: #10b981;
  --border-radius: 0.75rem;
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.login-container {
  width: 100%;
  max-width: 28rem;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.logo-container {
  margin-bottom: 1rem;
}

.logo-icon {
  margin: 0 auto 1rem auto;
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.logo-svg {
  width: 2rem;
  height: 2rem;
}

.logo-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.login-subtitle {
  color: #6b7280;
  margin: 0;
}

.login-card {
  box-shadow: var(--shadow-lg);
}

.card-header-spacing {
  padding-bottom: 1rem;
}

.card-content-spacing {
  padding-top: 0;
}

.card-title {
  font-size: 1.5rem;
  text-align: center;
  margin: 0;
}

.card-description {
  text-align: center;
  color: #6b7280;
}

.error-alert {
  margin-bottom: 1rem;
  animation: slideInFromTop 0.3s ease-out;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field-label {
  font-weight: 500;
  color: #374151;
}

.field-input {
  transition: all 0.2s ease;
}

.field-input:focus {
  transform: scale(1.02);
}

.field-error {
  font-size: 0.875rem;
  color: var(--color-error);
  margin-top: 0.25rem;
}

.password-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.forgot-password-link {
  font-size: 0.875rem;
  color: var(--color-primary);
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.forgot-password-link:hover {
  text-decoration: underline;
}

.remember-me-container {
  display: flex;
  align-items: center;
}

.remember-me-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: #374151;
}

.remember-me-checkbox {
  width: 1rem;
  height: 1rem;
  accent-color: var(--color-primary);
}

.login-button {
  margin-top: 0.5rem;
}

.loading-spinner {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.75rem;
  animation: spin 1s linear infinite;
}

.card-footer {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.register-section {
  width: 100%;
}

.divider {
  position: relative;
  margin: 1rem 0;
}

.divider-line {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
}

.divider-line::before {
  content: '';
  width: 100%;
  border-top: 1px solid #e5e7eb;
}

.divider-text {
  position: relative;
  display: flex;
  justify-content: center;
  font-size: 0.75rem;
  text-transform: uppercase;
}

.divider-text span {
  background: white;
  padding: 0 0.5rem;
  color: #6b7280;
}

.register-button {
  width: 100%;
  transition: all 0.2s ease;
}

.register-button:hover {
  transform: scale(1.02);
}

.custom-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.custom-link {
  background: none;
  border: none;
  color: var(--color-primary);
  text-decoration: none;
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0;
}

.custom-link:hover {
  text-decoration: underline;
}

.login-footer {
  margin-top: 2rem;
  text-align: center;
}

.footer-text {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

@keyframes slideInFromTop {
  from {
    transform: translateY(-8px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 640px) {
  .login-container {
    padding: 1rem;
  }
  
  .logo-title {
    font-size: 1.5rem;
  }
  
  .card-title {
    font-size: 1.25rem;
  }
}

@media (prefers-color-scheme: dark) {
  .memberbry-login-microfrontend {
    --color-text: #f9fafb;
    --color-background: #111827;
    --color-card: #1f2937;
  }
}
</style>
