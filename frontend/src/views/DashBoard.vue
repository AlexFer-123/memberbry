<template>
  <div :key="key" v-if="user" class="mx-auto max-w-5xl px-2 sm:px-6 lg:px-8">
    <h1 class="text-center my-6 text-lg font-semibold">Seja bem vindo <span class="capitalize text-purple-800">{{ user.name }}</span></h1>  
    <div v-if="user.integrations">

      <div class="my-10" v-if="user?.integrations.length > 0">
        <div class="flex justify-end gap-4">
          <button class="bg-purple-500 hover:bg-purple-700 text-white py-2 px-6 rounded-md" @click="openModalNewVideoFunction(openModalNewVideo)">Adicionar nova aula</button>
          <button class="bg-purple-500 hover:bg-purple-700 text-white py-2 px-6 rounded-md" @click="openModalUploadVideoFunction(openModalUploadVideo)">Subir vídeo</button>
        </div>
        <PopupNewVideo :show="openModalNewVideo" :user="user" @close-modal="closeModalNewVideo"/>
        <PopupUploadVideo :show="openModalUploadVideo" :user="user" @close-modal="closeModalUploadVideo"/>
      </div>
      <div v-if="user?.lessons.length > 0">
        <ul role="list" class="divide-y divide-gray-100">
          <li v-for="lesson in user.lessons" :key="lesson" class="flex justify-between gap-x-6 py-5">
            <div class="flex min-w-0 gap-x-4">
              <img class="h-12 w-12 flex-none rounded-md bg-gray-50" :src="lesson.video?.thumbnail" alt="" />
              <div class="flex justify-between">

                <div class="min-w-0 flex-auto">
                  <p class="text-sm font-semibold leading-6 text-gray-900">{{ lesson.name }}</p>
                  <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ lesson?.description }}</p>
                </div>
              </div>
            </div>
            <RouterLink :to="'/lessons/' + lesson.video?.id" class="flex">
              <div class="w-12 flex align-center px-4 mr-[auto] rounded-md cursor-pointer ">
                <PencilIcon class="text-purple-600 hover:text-purple-800" :size="24"/>
              </div>
            </RouterLink>
          </li>

        </ul>
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
import { PencilIcon  } from '@heroicons/vue/24/solid'

const authStore = useAuthStore()
const user = ref(authStore)
const openModalNewVideo = ref(false)
const openModalUploadVideo = ref(false)
const key = ref(0)

const loadUser = async () => {
  user.value = await authStore.user;
};

const openModalUploadVideoFunction = () => {
  openModalUploadVideo.value = !openModalUploadVideo.value
}

const closeModalUploadVideo = (open) => {
  openModalUploadVideo.value = open
  setTimeout(() => {
    key.value++
  }, 500)
}

const openModalNewVideoFunction = () => {
  openModalNewVideo.value = !openModalNewVideo.value
}

const closeModalNewVideo = (open) => {
  openModalNewVideo.value = open
  location.reload()
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
.uppy-c-btn-primary {
  @apply bg-purple-500 hover:bg-purple-700 !important;
}
</style>