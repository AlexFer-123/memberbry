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

                  
                  <div class="grid w-full grid-cols-1 items-start gap-x-7 gap-y-9 sm:grid-cols-12 lg:gap-x-12">
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
                        <h2 class="text-2xl font-bold text-gray-900 sm:pr-12">{{ selectedVideoInfos.title }}</h2>
  
                        <div class="my-4">
                            <button class="bg-blue-600 py-2 px-6 rounded-md text-white">Criar aula</button>
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
import { ref, defineEmits } from 'vue'
import SelectVideo from './SelectVideo.vue';
import {
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const open = ref(false)
const emit = defineEmits(['close-modal'])
const selectedVideoInfos = ref({})

const SelectedVideo = (video) => {
    selectedVideoInfos.value = video

}

const closeModal = () => {
    if(!open.value) {
        open.value = false
        emit('close-modal', open.value)
    }
}

</script>