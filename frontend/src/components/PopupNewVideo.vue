<template>
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-10" @click="closeModal()">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </TransitionChild>
  
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 md:translate-y-0 md:scale-95" enter-to="opacity-100 translate-y-0 md:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 md:scale-100" leave-to="opacity-0 translate-y-4 md:translate-y-0 md:scale-95">
              <DialogPanel class="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                <div class="relative flex w-full items-center rounded-md overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button type="button" class="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8" @click="closeModal()">
                    <span class="sr-only">Close</span>
                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                  </button> 
                          <div class="flex w-full justify-center items-center" v-if="!selectedVideoInfos">
                            <div role="status">
                              <svg aria-hidden="true" class="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                              </svg>
                              <span class="sr-only"><SelectVideo @video-selected="SelectedVideo"/></span>
                            </div>
                          </div>

                          <div v-else class="grid w-full grid-cols-1 items-start gap-x-7 gap-y-9 sm:grid-cols-12 lg:gap-x-12">
                            <div class="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                              <div class="iframe w-full">
                                <div style="position:relative;padding-top:56.25%;">
                                  <iframe id="panda-e5a39b22-230d-400c-8823-08db91f1f211" 
                                    :src="selectedVideoInfos.video_player" 
                                    style="border:none;position:absolute;top:0;left:0;" 
                                    allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture" 
                                    allowfullscreen=true width="100%" height="100%" fetchpriority="high">
                                  </iframe>
                                </div>
                              </div>
                            </div>
                            <div class="sm:col-span-8 lg:col-span-7">
                              <div class="mb-3">
                                <SelectVideo @video-selected="SelectedVideo"/>
                              </div>
                              <p class="text-sm text-gray-900 sm:pr-12 font-bold">Video status: <span class=" font-normal">{{ selectedVideoInfos.status }}</span></p>
                              <p class="text-sm text-gray-900 sm:pr-12 font-bold flex gap-2">Link: <a :href="selectedVideoInfos.video_player" target="_blank"  class="font-normal flex gap-2 items-center">Abrir vídeo <ArrowTopRightOnSquareIcon class="w-4 h-4"/></a></p>
  
                              <div class="my-4" :disabled="SelectedVideo.status === 'DRAFT' || SelectedVideo.status === 'CONVERTING'">
                                <button @click="createLesson" class="bg-blue-600 py-2 px-6 rounded-md text-white">Criar aula</button>
                              </div>
                            </div>
                          </div>
            
                        </div>
                      </DialogPanel>
                    </TransitionChild>
                  </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>
  
<script setup>
import { ref, defineEmits, defineProps } from 'vue'
import SelectVideo from './SelectVideo.vue';
import { useAuthStore } from '@/store/main';
import http from '@/services/http'
import {
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline'

const authStore = useAuthStore()
const open = ref(false)
const emit = defineEmits(['close-modal'])
const selectedVideoInfos = ref(false)
const props = defineProps(['user'])
const isLoading = ref(true)

const SelectedVideo = (video) => {
    selectedVideoInfos.value = video
    isLoading.value = false
}

const createLesson = async () => {
  console.log(selectedVideoInfos, props.user._id)

  try {
    
    await http.put(`/users/${props.user._id}/lessons`, {
        name: selectedVideoInfos.value.title,
        description: selectedVideoInfos.value.description,
        video: selectedVideoInfos.value
      },
      { 
          headers: {
            'Authorization': `Bearer ${authStore.token}`
          }
      }
    )
      
    authStore.setNewLesson(selectedVideoInfos.value)
    closeModal()
  } catch (error) {
    console.error(error)
  }
}


const closeModal = () => {
    if(!open.value) {
        open.value = false
        emit('close-modal', open.value)
    }
}

</script>