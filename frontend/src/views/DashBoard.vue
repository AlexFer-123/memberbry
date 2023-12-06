<template>
  <div v-if="user" class="mx-auto max-w-5xl px-2 sm:px-6 lg:px-8">
    <h1 class="text-center my-6 text-lg font-semibold">Seja bem vindo <span class="capitalize text-purple-800">{{ user.name }}</span></h1>  
    <div v-if="user.integrations">

      <div class="my-10">
        <div class="flex justify-end">
          <button class="bg-blue-600 text-white py-2 px-6 rounded-md" @click="openModal(openModalNewVideo)">Adicionar nova aula</button>
          <PopupNewVideo :show="openModalNewVideo" :user="user" @close-modal="closeModalNewVideo"/>
        </div>
      </div>
      <div v-if="user?.lessons.length > 0">
        
        <listLessons :lessons="user.lessons" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useAuthStore } from '@/store/main';
import PopupNewVideo from '@/components/PopupNewVideo.vue'
import listLessons from '@/components/listLessons.vue';

const authStore = useAuthStore()
const user = ref(authStore)
const openModalNewVideo = ref(false)

const loadUser = async () => {
  user.value = await authStore.user;
};

const openModal = () => {
  openModalNewVideo.value = !openModalNewVideo.value
}

const closeModalNewVideo = (open) => {
  openModalNewVideo.value = open
}

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