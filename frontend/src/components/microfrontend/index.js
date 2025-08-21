export { default as LoginMicrofrontend } from './LoginMicrofrontend.vue'

export const MicrofrontendConfig = {
  defaultConfig: {
    apiBaseUrl: 'https://membry.onrender.com',
    authTokenKey: 'authMembry',
    loginEndpoint: '/auth/login',
    userEndpoint: '/users'
  },
  
  themes: {
    default: {
      containerClass: 'min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4',
      cardClass: 'shadow-xl border-0 bg-white/80 backdrop-blur-sm',
      buttonClass: 'w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg'
    },
    minimal: {
      containerClass: 'min-h-screen flex items-center justify-center bg-gray-50 p-4',
      cardClass: 'shadow-md border border-gray-200',
      buttonClass: 'w-full bg-blue-600 hover:bg-blue-700 transition-colors'
    },
    dark: {
      containerClass: 'min-h-screen flex items-center justify-center bg-gray-900 p-4',
      cardClass: 'shadow-xl bg-gray-800 border-gray-700',
      buttonClass: 'w-full bg-purple-600 hover:bg-purple-700 transition-colors'
    }
  },
  
  validations: {
    email: {
      required: (email) => ({
        isValid: !!email,
        message: 'E-mail é obrigatório'
      }),
      format: (email) => ({
        isValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
        message: 'Formato de e-mail inválido'
      }),
      domain: (allowedDomains) => (email) => ({
        isValid: allowedDomains.some(domain => email.endsWith(domain)),
        message: `E-mail deve ser de um dos domínios: ${allowedDomains.join(', ')}`
      })
    },
    password: {
      minLength: (min) => (password) => ({
        isValid: password.length >= min,
        message: `Senha deve ter pelo menos ${min} caracteres`
      }),
      strength: (password) => {
        const hasUpper = /[A-Z]/.test(password)
        const hasLower = /[a-z]/.test(password)
        const hasNumber = /\d/.test(password)
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password)
        
        return {
          isValid: hasUpper && hasLower && hasNumber && hasSpecial,
          message: 'Senha deve conter maiúscula, minúscula, número e caractere especial'
        }
      }
    }
  }
}

export const createLoginConfig = (options = {}) => {
  const {
    theme = 'default',
    apiConfig = {},
    texts = {},
    validations = {},
    features = {},
    callbacks = {}
  } = options
  
  return {
    ...MicrofrontendConfig.defaultConfig,
    ...apiConfig,
    ...MicrofrontendConfig.themes[theme],
    title: 'Memberbry',
    subtitle: 'Bem-vindo de volta! Faça login em sua conta.',
    cardTitle: 'Entrar',
    cardDescription: 'Digite seu e-mail e senha para acessar sua conta',
    emailLabel: 'E-mail',
    emailPlaceholder: 'seu@email.com',
    passwordLabel: 'Senha',
    passwordPlaceholder: '••••••••',
    loginButtonText: 'Entrar',
    loadingText: 'Entrando...',
    registerButtonText: 'Criar nova conta',
    forgotPasswordText: 'Esqueceu a senha?',
    rememberMeText: 'Lembrar-me',
    dividerText: 'Ou',
    footerText: '© 2024 Memberbry. Todos os direitos reservados.',
    ...texts,
    showHeader: true,
    showLogo: true,
    showCardHeader: true,
    showCardFooter: true,
    showRegisterOption: true,
    showForgotPassword: true,
    showRememberMe: false,
    showFooter: true,
    autoRedirect: true,
    persistSession: true,
    validateTokenOnMount: true,
    ...features,
    emailValidation: validations.email || null,
    passwordValidation: validations.password || null,
    formValidation: validations.form || null,
    onLoginSuccess: callbacks.onSuccess || null,
    onLoginError: callbacks.onError || null,
    onRegister: callbacks.onRegister || null,
    onForgotPassword: callbacks.onForgotPassword || null
  }
}
