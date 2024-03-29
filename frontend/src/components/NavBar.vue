<template>
  <div :key="keyAddiction" class="nav">
    <div v-if="logged">
      <Disclosure as="nav" class="shadow-sm sticky top-0 bg-white" v-slot="{ open }">
        <div class="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
          <div class="flex h-16 items-center justify-between">
            
            <div :class=" !open ? 'hidden opacity-0' : 'flex opacity-100' + 'hidden sm:ml-0 sm:block ease-in duration-150 absolute left-0 top-0'">
              <div class="flex space-x-4">
                <SideBar :title="router.currentRoute.value.name" :navigation="navigation" :logged="logged"/>
              </div>
            </div>
            <div class="absolute inset-y-0 left-0 flex items-center z-50">
              <!-- Mobile menu button-->
              <DisclosureButton :class="!open ? 'left-10 ' : ' ' + 'relative inline-flex items-center justify-center absolute top-0 left-56 ease-in-out duration-150 bg-white rounded-full text-gray-400 hover:bg-gray-700 hover:text-white '">
                <ChevronRightIcon v-if="!open" class="flex ml-4 h-10 w-10 rounded-full shadow-md p-2" aria-hidden="true" />
                <ChevronLeftIcon v-else class="flex h-10 w-10 rounded-full shadow-md p-2" aria-hidden="true" />
              </DisclosureButton>
            </div>
            <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-center">
              <RouterLink :to="logged ?  '/dashboard' : '/'" class="flex items-center justify-center">
                <div class="flex items-center mx-auto justify-center translate-x-1/2 absolute ">
                  <img src="../assets/logo.png" width="100">
                </div>
              </RouterLink>
            </div>
            
            <div>
              <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button type="button" class="relative rounded-full bg-white p-1 text-blue-600 hover:text-white hover:bg-blue-600">
                  <span class="absolute -inset-1.5" />
                  <span class="sr-only">View notifications</span>
                  <BellIcon class="h-6 w-6" aria-hidden="true" />
                </button>
      
                <!-- Profile dropdown -->
                <Menu as="div" class="relative ml-3">
                  <div>
                    <MenuButton class="relative flex rounded-full px-3 bg-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span class="absolute -inset-1.5" />
                      <span class="sr-only">Open user menu</span>
                      <span class="text-lg uppercase font-semibold">{{ authStore?.user?.name[0] }}{{ authStore?.user?.surname[0] }}</span>
                    </MenuButton>
                  </div>
                  <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                    <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 focus:outline-none">
                      <MenuItem v-slot="{ active }">
                        <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Seu perfil</a>
                      </MenuItem>
                      <MenuItem v-slot="{ active }">
                        <RouterLink to="/configs" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Configurações</RouterLink>
                      </MenuItem>
                      <MenuItem v-slot="{ active }">
                        <a @click="logout" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Deslogar</a>
                      </MenuItem>
                    </MenuItems>
                  </transition>
                </Menu>
              </div>
            </div>
          </div>
        </div>

      </Disclosure>


    </div>

    <div v-else>
      
      <Disclosure as="nav" class="shadow-sm sticky top-0 bg-white">
        <div class="mx-auto max-w-5xl px-2 sm:px-6 lg:px-8">
          <div class="relative flex h-16 items-center justify-between">
            <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <!-- Mobile menu button-->
              <DisclosureButton class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span class="absolute -inset-0.5" />
                <span class="sr-only">Open main menu</span>
                <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
              </DisclosureButton>
            </div>
            <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-center">
              <RouterLink to="/" class="flex items-center">
                <div class="flex flex-shrink-0 items-center">
                  <img src="../assets/logo.png" width="100">
                </div>
              </RouterLink>
            </div>
            
          </div>
        </div>

      </Disclosure>
    </div>
  </div>
</template>

<script setup>
import { Disclosure, DisclosureButton, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { ChevronRightIcon, BellIcon, ChevronLeftIcon } from '@heroicons/vue/24/outline';
import { useAuthStore } from '@/store/main';
import { ref, watch } from 'vue';
import { router } from '@/router/index';

import SideBar from './SideBar.vue';


const navigation = ref([
  {
    name: 'Vídeos',
    current: router.currentRoute.value.href === '/dashboard',
    href: '/dashboard',
  },
  {
    name: 'Configurações',
    current: router.currentRoute.value.href === '/configs',
    href: '/configs'
  },
  {
    name: 'Cadastro',
    href: '/register'
  },
])

const logout = () => {
  console.log(authStore.isAuthenticated)
  localStorage.removeItem('authMembry')
  logged.value = false
  keyAddiction.value += 1
  authStore.setToken('')
  authStore.setUser('')
  router.push('/')
}

const open = ref(true)
const logged = ref(false)
const authStore = useAuthStore()
const isAuthenticated = ref(authStore.isAuthenticated);
const keyAddiction = ref(0)

watch(
  () => authStore.isAuthenticated,
  (authenticated) => {
    logged.value = true
    keyAddiction.value += 1
    isAuthenticated.value = authenticated;
  }
);
</script>

<style scoped>
 .nav{
  z-index: 99999;
 }
</style>