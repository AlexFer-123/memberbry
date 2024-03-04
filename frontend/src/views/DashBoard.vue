<template>
  <div v-if="user" class="mx-auto max-w-5xl px-2 sm:px-6 lg:px-8">
    <h1 class="text-center my-6 text-lg font-semibold">Seja bem vindo <span class="capitalize text-purple-800">{{ user.name }}</span></h1>  
    <div v-if="user.integrations">

      <div class="my-10">
        <div class="flex justify-end gap-4">
          <button class="bg-blue-300 hover:bg-blue-500 text-white py-2 px-6 rounded-md" @click="openModalNewVideoFunction(openModalNewVideo)">Adicionar nova aula</button>
          <button class="bg-blue-300 hover:bg-blue-500 text-white py-2 px-6 rounded-md" @click="openModalUploadVideoFunction(openModalUploadVideo)">Subir vídeo</button>
        </div>
        <PopupNewVideo :show="openModalNewVideo" :user="user" @close-modal="closeModalNewVideo"/>
        <PopupUploadVideo :show="openModalUploadVideo" :user="user" @close-modal="closeModalUploadVideo"/>
      </div>
      <div v-if="user?.lessons.length > 0">
        <listLessons :lessons="user.lessons" />
      </div>
      <div id="drag-drop"></div>
    </div>
  </div>
  
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useAuthStore } from '@/store/main';
import PopupNewVideo from '@/components/PopupNewVideo.vue'
import PopupUploadVideo from '@/components/PopupUploadVideo.vue'
import listLessons from '@/components/listLessons.vue';

const authStore = useAuthStore()
const user = ref(authStore)
const openModalNewVideo = ref(false)
const openModalUploadVideo = ref(false)

const loadUser = async () => {
  user.value = await authStore.user;
};

const openModalUploadVideoFunction = () => {
  openModalUploadVideo.value = !openModalUploadVideo.value
}

const closeModalUploadVideo = (open) => {
  openModalUploadVideo.value = open
}

const openModalNewVideoFunction = () => {
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