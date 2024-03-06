<template>
  <div>
    <NavBar class="z-[10] relative" />
    <div>
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
import { useAuthStore } from '@/store/main';
import { watch, onMounted, ref } from 'vue';
import { jwtDecode } from "jwt-decode";
import http from '@/services/http'

const authStore = useAuthStore()
const user = ref(false)
const isAuthenticated = ref(false)

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

watch(
  () => authStore.isAuthenticated,
  (authenticated) => {
    isAuthenticated.value = authenticated
  }
);

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
