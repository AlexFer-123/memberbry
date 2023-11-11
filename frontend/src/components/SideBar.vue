<template>
    <div class="absolute top-0 left-0 sidebar bg-white shadow">
        <div class="content-title">
            <h1 class=" font-medium text-center mx-auto">{{props.title}}</h1>
        </div>
        <div class="mt-10 px-3">
        </div>

    </div>
</template>
  
<script setup>
import defineProps from 'vue'

const props = defineProps(['title', 'navigation'])
</script>

<style lang="scss" scoped>
    .sidebar {
        height: 100vh;
        padding: 1.7rem 0;
        width: 250px;
        
        .content-title {
            font-size: 1.5rem;
            font-family: var(--font-montserrat);
            @apply text-gray-700
        }
    }
</style>