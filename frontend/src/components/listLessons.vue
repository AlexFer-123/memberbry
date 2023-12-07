<template>
    <ul role="list" class="divide-y divide-gray-100">
      <li v-for="lesson in lessons" :key="lesson" class="flex justify-between gap-x-6 py-5">
        <div class="flex min-w-0 gap-x-4">
          <img class="h-12 w-12 flex-none rounded-md bg-gray-50" :src="lesson.video.thumbnail" alt="" />
          <div class="flex justify-between">

            <div class="min-w-0 flex-auto">
              <p class="text-sm font-semibold leading-6 text-gray-900">{{ lesson.name }}</p>
              <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ lesson?.description }}</p>
            </div>
          </div>
        </div>
        <div class="w-12 flex align-center px-3.5 py-0.5 rounded-md cursor-pointer border-solid border-blue-800 border-2">
          <PencilIcon class="text-blue-800" :size="24"/>
        </div>
      </li>

    </ul>
  </template>
  
<script setup>
  import { PencilIcon  } from '@heroicons/vue/24/solid'
  import { defineProps } from 'vue';

  const props = defineProps(['lessons'])

  console.log(props.lessons)
</script>