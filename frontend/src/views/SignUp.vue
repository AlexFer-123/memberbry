<template>
    <div class="mx-auto max-w-5xl px-2 py-4 sm:px-6 lg:px-8">
        <form>
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base font-semibold leading-7 text-gray-900">Cadastro</h2>
  
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-4">
              <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Nome da Empresa</label>
              <div class="mt-2">
                <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm">memberbry.com/</span>
                  <input v-model="newUser.company" type="text" name="username" id="username" autocomplete="username" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="janesmith" />
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base font-semibold leading-7 text-gray-900 mt-4">Informações pessoais</h2>
  
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Primeiro nome</label>
              <div class="mt-2">
                <input v-model="newUser.name" type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
  
            <div class="sm:col-span-3">
              <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Último nome</label>
              <div class="mt-2">
                <input v-model="newUser.surname" type="text" name="surname" id="surname" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
  
            <div class="sm:col-span-6">
              <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Endereço de e-mail</label>
              <div class="mt-2">
                <input v-model="newUser.email" id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Digite uma senha</label>
              <div class="mt-2">
                <input v-model="newUser.password" id="password" name="password" type="password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Digite a senha novamente</label>
              <div class="mt-2">
                <input v-model="newUser.confirmPassword" id="confirmPassword" name="confirmPassword" type="password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
        </div>
      </div>

      <div :class="registerStatus.isDone ?  'sm:col-span-6  bg-green-500 py-4 px-6 rounded-md' : 'sm:col-span-6  bg-red-500 py-4 px-6 rounded-md'" >
        <p class="text-white">{{ registerStatus.text }}</p>
      </div>
  
      <div class="mt-6 flex items-center justify-end gap-x-6">
        <RouterLink to="/" type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</RouterLink>
        <button @click.prevent="register()" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Cadastrar</button>
      </div>
    </form>
    </div>

</template>
  
<script setup>
import { ref } from "vue"
import http from '@/services/http'

const newUser = ref({})
const registerStatus = ref({})

const register = async () => {

  try {
    const registerUser = await http.post('/auth/register', newUser.value)
    if(registerUser.status === 201) {
      registerStatus.value = {
        text: "Usuário criado com sucesso",
        isDone: true
      } 
    } else if (registerUser.status === 400) {
        registerStatus.value = {
        text: registerUser.data.msg,
        isDone: false
      }
    }
  } catch (error) {
    console.log(error)
  }
}

</script>

<style>

</style>