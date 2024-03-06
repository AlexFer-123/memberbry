<template>
    <Listbox as="div" v-model="selected">
      <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">Selecione um vídeo</ListboxLabel>
      <div class="relative mt-2">
        <ListboxButton class="relative max-w-3xl cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
          <span class="flex items-center">
            <span class="ml-3 block truncate">{{ selected.title }}</span>
          </span>
          <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </ListboxButton>
  
        <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
          <ListboxOptions class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <ListboxOption as="template" v-for="video in videos" :key="video" :value="video" v-slot="{ active, selected }">
              <div v-if="video.status !== 'FAILED'">
                <li :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                  <div class="flex items-center">
                    <span :class="[selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate']">{{ video.title }}</span>
                  </div>
    
                  <span v-if="selected" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
                </li>
              </div>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </template>
  
  <script setup>
  import { onMounted, ref, defineEmits, watch } from 'vue'
  import pandaApi from '@/services/pandaApi'
  import { useAuthStore } from '@/store/main'
  import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
  import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
  
  const videos = ref([])
  const selected = ref({})
  const authStore = useAuthStore()
  const accessToken = ref(null)
  const emit = defineEmits(['video-selected'])

  watch(() => selected.value, () => {
    emit('video-selected', selected.value)
  })
  
  onMounted(async () => {
    if (authStore?.user?.integrations[0]?.token) {
      accessToken.value = await authStore.user.integrations[0].token.tokenAcess
      
      if(accessToken.value != null) {
        try {
          const ret = await pandaApi.get('/videos',
          {
            headers: {
              "Authorization": `Bearer ${accessToken.value}`
            }
          })
          
          for(let video in ret.data.videos) {
            if(ret.data.videos[video].status !== 'FAILED') {
              videos.value.push(ret.data.videos[video])
              selected.value = videos.value[0]
            }
          }
          
          emit('video-selected', selected.value)
        } catch (error) {
          console.error(error)
        }
      }
    }
  })
  </script>