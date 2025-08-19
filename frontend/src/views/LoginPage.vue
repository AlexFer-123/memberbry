<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4">
    <div class="w-full max-w-md">
      <!-- Logo e Header -->
      <div class="text-center mb-8">
        <div class="mx-auto w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 3v10a2 2 0 002 2h6a2 2 0 002-2V7m-8 0V5a1 1 0 011-1h6a1 1 0 011 1v2m-8 0h8"></path>
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Memberbry</h1>
        <p class="text-gray-600">Bem-vindo de volta! Faça login em sua conta.</p>
      </div>

      <!-- Card de Login -->
      <Card class="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader class="space-y-1">
          <CardTitle class="text-2xl text-center">Entrar</CardTitle>
          <CardDescription class="text-center">
            Digite seu e-mail e senha para acessar sua conta
          </CardDescription>
        </CardHeader>

        <CardContent class="space-y-4">
          <form @submit.prevent="login" class="space-y-4">
            <!-- Campo de E-mail -->
            <div class="space-y-2">
              <Label for="email">E-mail</Label>
              <Input
                id="email"
                v-model="user.email"
                type="email"
                placeholder="seu@email.com"
                required
                class="transition-all duration-200 focus:scale-105"
                :disabled="isLoading"
              />
            </div>

            <!-- Campo de Senha -->
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <Label for="password">Senha</Label>
                <a href="#" class="text-sm text-primary hover:underline">
                  Esqueceu a senha?
                </a>
              </div>
              <Input
                id="password"
                v-model="user.password"
                type="password"
                placeholder="••••••••"
                required
                class="transition-all duration-200 focus:scale-105"
                :disabled="isLoading"
              />
            </div>

            <!-- Alert de Erro -->
            <Alert v-if="error" variant="destructive" class="animate-in slide-in-from-top-2">
              <AlertDescription>
                {{ error }}
              </AlertDescription>
            </Alert>

            <!-- Botão de Login -->
            <Button 
              type="submit" 
              class="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              :disabled="isLoading"
            >
              <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isLoading ? 'Entrando...' : 'Entrar' }}
            </Button>
          </form>
        </CardContent>

        <CardFooter class="flex flex-col space-y-4">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t" />
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-background px-2 text-muted-foreground">
                Ou
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            class="w-full transition-all duration-200 hover:scale-105"
            @click="$router.push('/register')"
            :disabled="isLoading"
          >
            Criar nova conta
          </Button>
        </CardFooter>
      </Card>

      <!-- Footer -->
      <div class="mt-8 text-center text-sm text-gray-600">
        <p>© 2024 Memberbry. Todos os direitos reservados.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/main'
import { jwtDecode } from "jwt-decode"
import http from '@/services/http'

// Componentes UI
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

const router = useRouter()
const authStore = useAuthStore()

const user = reactive({
  email: '',
  password: '',
})

const isLoading = ref(false)
const error = ref('')

onMounted(async () => {
  // Se já estiver logado, redirecionar para dashboard
  if (authStore.isAuthenticated) {
    router.push('/dashboard')
    return
  }
  
  // Verificar se há erro no store
  error.value = await authStore.error || ''
})

const login = async () => {
  if (isLoading.value) return
  
  isLoading.value = true
  error.value = ''

  try {
    const userToken = await http.post('/auth/login', user)
    
    if (userToken.data?.token) {
      localStorage.setItem('authMembry', userToken.data?.token)
      
      const authenticationToken = userToken.data.token
      await getUserApi(authenticationToken)
      
      // Redirecionar para dashboard
      router.push('/dashboard')
    }
  } catch (e) {
    console.error('Erro no login:', e)
    error.value = e.response?.data?.error || 'Erro interno do servidor. Tente novamente.'
    authStore.setError(error.value)
  } finally {
    isLoading.value = false
  }
}

const getUserApi = async (token) => {
  const userId = jwtDecode(token)
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  
  const loggedInUser = await http.get(`/users/${userId.id}`, config)
  
  authStore.setToken(token)
  authStore.setUser(loggedInUser.data.user)
  
  return loggedInUser.data.user
}
</script>

<style scoped>
@keyframes animate-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-in {
  animation: animate-in 0.3s ease-out;
}

.slide-in-from-top-2 {
  animation: slide-in-from-top-2 0.3s ease-out;
}

@keyframes slide-in-from-top-2 {
  from {
    transform: translateY(-8px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
