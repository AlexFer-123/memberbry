<template>
  <div class="mx-auto max-w-5xl px-2 sm:px-6 lg:px-8">
    <h1>{{ user.name }} {{ user.email }}</h1>  
  </div>
</template>

<script setup>
import { router } from '@/router';
// import { useAuthStore } from '@/store/main';
import { onMounted, ref } from 'vue';
import { jwtDecode } from "jwt-decode";
import http from '@/services/http'

// const authStore = useAuthStore()
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