<template>
  <div v-if="user" class="mx-auto max-w-5xl px-2 sm:px-6 lg:px-8">
    <h1 class="text-center my-6 text-lg font-semibold">Seja bem vindo <span class="capitalize text-purple-800">{{ user.name }}</span></h1>  
    <span class="mt-10">
      <div v-if="user.integrations" class="flex justify-end">
        <SelectVideo />
        
      </div>
    </span>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useAuthStore } from '@/store/main';
import SelectVideo from '@/components/SelectVideo.vue'

const authStore = useAuthStore()
const user = ref(authStore)

const loadUser = async () => {
  user.value = await authStore.user;
};

onMounted( () => {
  loadUser()
});

watch(() => authStore.user, () => {
  loadUser();
});

watch(() => authStore.isAuthenticated, () => {
  loadUser();
});

</script>

<style>

</style>