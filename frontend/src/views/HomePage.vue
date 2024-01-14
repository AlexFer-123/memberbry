<template>
    <div>
      <div v-if="!logged.isAuthenticated">

        <div class="container mx-auto home">
          
          <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            
            <div v-if="error" class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
               <div class="text-center bg-red-400 py-2 px-4 my-6 text-white rounded-md">{{ error }}</div>
            </div>

            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Faça login.</h2>
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form class="space-y-6" action="#" method="POST">
                <div>
                  <label for="email" class="block text-sm font-medium leading-6 text-gray-900">E-mail</label>
                  <div class="mt-2">
                    <input v-model="user.email" id="email" name="email" type="email" autocomplete="email" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div>
                  <div class="flex items-center justify-between">
                    <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Senha</label>
                    <div class="text-sm">
                      <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Esqueceu a senha?</a>
                    </div>
                  </div>
                  <div class="mt-2">
                    <input v-model="user.password" id="password" name="password" type="password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div class="flex justify-center my-auto">
                  
                  <RouterLink @click="login()" to="/dashboard" class="bg-purple-600  hover:bg-purple-800 text-white py-2 px-6 rounded animate">Logar</RouterLink> 
                  <RouterLink class="bg-white hover:bg-gray-200 text-gray-900 mx-2 py-2 px-4 rounded cursor-pointe ease-in-out " to="/register">
                    Criar conta
                  </RouterLink>
                  
                </div>
              </form>
              
            </div>
          </div>
        </div>

      </div>

      <div v-else>
        <div class="container mx-auto home">

          <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm text-center">
              <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Você já está logado</h2>
              <div class="mt-6">
                <RouterLink to="/dashboard" class="bg-purple-600 py-2 px-4 my-6 text-white rounded-md">Ir para dashboard</RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  
</template>

<script setup>
import http from '@/services/http'
import { ref, reactive, onMounted } from 'vue';
import { router } from '@/router/index';
import { userAuthenticate } from '@/router/auth'
import { useAuthStore } from '@/store/main';

const user = reactive({
  email: '',
  password: '',
})

const error = ref(false)
const logged = useAuthStore()

onMounted( async () => {
  error.value = await logged.error
})

const login = async () => {

  try {
    const userToken = await http.post('/auth/login', user)
    
    if(userToken.data?.token) {
      localStorage.setItem('authMembry', userToken.data?.token)
    }

    await userAuthenticate()
    router.push('/dashboard')
    logged.setError(null)
  } catch (e) {
    router.push('/')
    error.value = e.response.data.error
    logged.setError(error.value)
  }
}

</script>

<style>

</style>