<template>
    <div v-if="user" class="mx-auto max-w-6xl px-2 sm:px-6 lg:px-8 flex gap-11">

        <div class="video-section w-full">
            <div v-for="lesson in user.lessons" :key="lesson">
                <div v-if="lesson.video.id === $route.params.id" class="my-8">

                    <h3 class="subtitle my-8">Edição de vídeo</h3>
                    <div style="position:relative;padding-top:56.25%;">
                        <iframe :key="keyVideo" :id="'panda-' + lesson.video.id" 
                            :src="lesson.video.video_player" 
                            style="border:none;position:absolute;top:0;left:0;" 
                            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture" 
                            allowfullscreen=true width="100%" height="100%" fetchpriority="high"
                        ></iframe>
                    </div>
    
                    gostaria de adicionar autoplay no vídeo?
                    <input v-model="videoConfigs.autoplay" type="checkbox">
                </div>
            </div>
        </div>
        <div class="quick-change w-80">

            <h3 class="subtitle my-8">Aulas</h3>
            <div v-for="lesson in user.lessons" :key="lesson">
                <RouterLink v-if="CheckHostPanda(lesson.video)" class="quick-change__card flex mb-4 divide-y divide-gray-200 p-2 border-2 rounded-md hover:bg-slate-100 cursor-pointer" :to="'/lessons/' + lesson.video.id">
                    <div class="flex gap-4">
                        <div>
                            <img :src="lesson.video.thumbnail" class="quick-change__image h-16 w-32 ">
                        </div>
                        <p>{{lesson.name}}</p>
                    </div>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useAuthStore } from '@/store/main';
    import { ref, watch } from 'vue';

    const authStore = useAuthStore()
    const user = ref(authStore.user)
    const videoConfigs = ref({autoplay: false})   
    const keyVideo = ref(0)
    const IsPandaVideo = ref(null)

    const CheckHostPanda = lesson => {
        if(lesson.storage_size !== 0) {
         IsPandaVideo.value = true
        } else {
         IsPandaVideo.value = false
        }
        return IsPandaVideo.value 
    }

    watch(
        () => videoConfigs.value,
        (modifiedVideo) => {
            console.log(modifiedVideo)
            keyVideo.value++
        }
    );

</script>

<style scoped>
.card {
  
}
h3.subtitle {
    @apply text-3xl;
    @apply text-purple-600;
    
    font-weight: 600;
}
</style>