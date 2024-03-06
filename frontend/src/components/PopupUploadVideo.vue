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
                        <Dashboard  
                        @drop="handleDrop"
                        class="w-full flex justify-center" 
                        :uppy="uppy"/>
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
    import {
        Dialog,
        DialogPanel,
        TransitionChild,
        TransitionRoot,
    } from '@headlessui/vue'
    import { XMarkIcon } from '@heroicons/vue/24/outline';
    import { Dashboard } from '@uppy/vue';
    import { useAuthStore } from '@/store/main';
	import Uppy from '@uppy/core';
    import Tus from '@uppy/tus'
	import '@uppy/core/dist/style.css';
	import '@uppy/dashboard/dist/style.css';
    import Portuguese from '@uppy/locales/lib/pt_BR'
    import { v4 as uuidv4 } from 'uuid';
  
    const authStore = useAuthStore()
    const open = ref(false)
    const emit = defineEmits(['close-modal'])
    const closeModal = () => {
        if(!open.value) {
            open.value = false
            emit('close-modal', open.value)
        }
    }

	const uppy = new Uppy({
        debug: true,
        locale: Portuguese,
        restrictions: {
            maxNumberOfFiles: 1,
            allowedFileTypes: ['.mp4']
        }
    });

    uppy.use(Tus, {
        endpoint: 'https://uploader-us01.pandavideo.com.br/files/',
        resume: true,
        limit: 1
    })

    uppy.on('file-added', (file) => {
        const video_id = uuidv4();
        uppy.setFileMeta(file.id, {
          authorization: authStore.user.integrations[0].token.tokenAcess,
          video_id
        });
    });

    

</script>

<style>

</style>