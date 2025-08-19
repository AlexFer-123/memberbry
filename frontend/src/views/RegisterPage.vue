<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
    <div class="w-full max-w-2xl">
      <!-- Logo e Header -->
      <div class="text-center mb-8">
        <div class="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Criar Conta</h1>
        <p class="text-gray-600">Junte-se ao Memberbry e comece sua jornada hoje!</p>
      </div>

      <!-- Card de Registro -->
      <Card class="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader class="space-y-1">
          <CardTitle class="text-2xl text-center">Cadastro</CardTitle>
          <CardDescription class="text-center">
            Preencha os dados abaixo para criar sua conta
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form @submit.prevent="register" class="space-y-6">
            <!-- Informações da Empresa -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-gray-900 border-b pb-2">Informações da Empresa</h3>
              
              <div class="space-y-2">
                <Label for="company">Nome da Empresa</Label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
                    memberbry.com/
                  </span>
                  <Input
                    id="company"
                    v-model="newUser.company"
                    type="text"
                    placeholder="suaempresa"
                    required
                    class="pl-32 transition-all duration-200 focus:scale-105"
                    :disabled="isLoading"
                  />
                </div>
              </div>
            </div>

            <!-- Informações Pessoais -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-gray-900 border-b pb-2">Informações Pessoais</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <Label for="name">Primeiro Nome</Label>
                  <Input
                    id="name"
                    v-model="newUser.name"
                    type="text"
                    placeholder="João"
                    required
                    class="transition-all duration-200 focus:scale-105"
                    :disabled="isLoading"
                  />
                </div>
                
                <div class="space-y-2">
                  <Label for="surname">Último Nome</Label>
                  <Input
                    id="surname"
                    v-model="newUser.surname"
                    type="text"
                    placeholder="Silva"
                    required
                    class="transition-all duration-200 focus:scale-105"
                    :disabled="isLoading"
                  />
                </div>
              </div>

              <div class="space-y-2">
                <Label for="email">E-mail</Label>
                <Input
                  id="email"
                  v-model="newUser.email"
                  type="email"
                  placeholder="joao@suaempresa.com"
                  required
                  class="transition-all duration-200 focus:scale-105"
                  :disabled="isLoading"
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <Label for="password">Senha</Label>
                  <Input
                    id="password"
                    v-model="newUser.password"
                    type="password"
                    placeholder="••••••••"
                    required
                    class="transition-all duration-200 focus:scale-105"
                    :disabled="isLoading"
                  />
                </div>
                
                <div class="space-y-2">
                  <Label for="confirmPassword">Confirmar Senha</Label>
                  <Input
                    id="confirmPassword"
                    v-model="newUser.confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    required
                    class="transition-all duration-200 focus:scale-105"
                    :disabled="isLoading"
                  />
                </div>
              </div>
            </div>

            <!-- Alertas -->
            <Alert v-if="registerStatus.isDone === 'created'" variant="success" class="animate-in slide-in-from-top-2">
              <AlertDescription>
                {{ registerStatus.text }}
              </AlertDescription>
            </Alert>

            <Alert v-if="registerStatus.isDone === 'error'" variant="destructive" class="animate-in slide-in-from-top-2">
              <AlertDescription>
                {{ registerStatus.text }}
              </AlertDescription>
            </Alert>

            <!-- Botões -->
            <div class="flex flex-col sm:flex-row gap-4">
              <Button
                type="button"
                variant="outline"
                class="flex-1 transition-all duration-200 hover:scale-105"
                @click="$router.push('/login')"
                :disabled="isLoading"
              >
                Voltar ao Login
              </Button>
              
              <Button 
                type="submit" 
                class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                :disabled="isLoading"
              >
                <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isLoading ? 'Cadastrando...' : 'Criar Conta' }}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <!-- Footer -->
      <div class="mt-8 text-center text-sm text-gray-600">
        <p>© 2024 Memberbry. Todos os direitos reservados.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import http from '@/services/http'

// Componentes UI
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardDescription from '@/components/ui/CardDescription.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Label from '@/components/ui/Label.vue'
import Alert from '@/components/ui/Alert.vue'
import AlertDescription from '@/components/ui/AlertDescription.vue'

const router = useRouter()

const isLoading = ref(false)
const newUser = reactive({
  company: '',
  name: '',
  surname: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const registerStatus = ref({
  text: '',
  isDone: false
})

const register = async () => {
  if (isLoading.value) return
  
  // Validar senhas
  if (newUser.password !== newUser.confirmPassword) {
    registerStatus.value = {
      text: "As senhas não coincidem",
      isDone: 'error'
    }
    return
  }

  isLoading.value = true
  registerStatus.value = { text: '', isDone: false }

  try {
    await http.post('/auth/register', newUser)
    
    registerStatus.value = {
      text: "Usuário criado com sucesso! Redirecionando para login...",
      isDone: 'created'
    }
    
    setTimeout(() => {
      router.push('/login')
    }, 2000)
    
  } catch (error) {
    console.error('Erro no registro:', error)
    registerStatus.value = {
      text: error.response?.data?.error || 'Erro interno do servidor. Tente novamente.',
      isDone: 'error'
    }
  } finally {
    isLoading.value = false
  }
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
