<template>
  <div :key="key" class="mx-auto max-w-5xl px-2 sm:px-6 lg:px-8">
    <div  v-if="user">
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
    <div class="flex justify-center items-center mt-16" v-else>
      <div role="status">
        <svg aria-hidden="true" class="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
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