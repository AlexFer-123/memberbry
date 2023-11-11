<template>
  <div class="mx-auto max-w-5xl px-2 sm:px-6 lg:px-8">
    <h1 class="capitalize text-center my-6 text-lg font-semibold">Seja bem vindo, <span class="capitalize text-bold text-purple-600">{{ user.name }}</span></h1>  
    <span class="mt-10">

    </span>
  </div>
</template>

<script setup>
import { router } from '@/router';
import { useAuthStore } from '@/store/main';
import { onMounted, ref } from 'vue';
import { jwtDecode } from "jwt-decode";
import http from '@/services/http'

const authStore = useAuthStore()
const user = ref(false)

const getUserApi = async (token) => {
  const userId = jwtDecode(token)
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  
  user.value = await http.get(`/users/${userId.id}`, config)
  user.value = user.value.data.user

  authStore.setToken(token)
  authStore.setUser(user.value)
}



onMounted(() => {
  const token = localStorage.getItem('authMembry') 
  console.log(token)
  if(!token) {
    router.push('/')
  } else {
    getUserApi(token)
    router.push('/dashboard')
  }
})

</script>

<style>

</style>