<template>
  <div>
    <NavBar />
    <RouterView />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
// import { router } from '@/router';
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


  if(!token) {
    return
  } else {
    getUserApi(token)
  }
})
</script>

<style>

.home {
  height: 80vh;
}
</style>
