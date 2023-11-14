<template>
    <div class="absolute top-0 left-0 sidebar bg-white shadow">
        <div class="content-title">
            <h1 class=" font-medium text-center mx-autos">{{props.title}}</h1>
        </div>
        <div class="mt-10 px-3">
            
            <div  v-for="item in props.navigation" :key="item">
                <div v-if="props.logged && item.name != 'Cadastro'" :class="item.href == router.currentRoute.value.href ? 'bg-slate-400 hover:bg-slate-600 text-white': 'bg-white hover:bg-slate-100' +  ' duration-100 my-2 '">
                    <RouterLink :to="item.href">
                        <div class="py-2 px-4 rounded-md">
                            {{ item.name }}
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div>

    </div>
</template>
  
<script setup>
import { router } from '@/router';
import defineProps from 'vue'


const props = defineProps(['title', 'navigation', 'logged'])

</script>


<style scoped>
    .sidebar {
        height: 100vh;
        padding: 1.7rem 0;
        width: 250px;
        background-color: white;       
    }
    .content-title {
        font-size: 1.5rem;
        font-family: var(--font-montserrat);
    }
</style>