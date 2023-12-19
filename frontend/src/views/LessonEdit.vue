<template>
    <div v-if="user" class="mx-auto max-w-5xl px-2 sm:px-6 lg:px-8">
        <div v-for="lesson in user.lessons" :key="lesson">
            <div v-if="lesson.video.id === $route.params.id" class="px-12 mt-8">
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
</template>

<script setup>
    import { useAuthStore } from '@/store/main';
    import { ref, watch } from 'vue';

    const authStore = useAuthStore()
    const user = ref(authStore.user)
    const videoConfigs = ref({autoplay: false})   
    const keyVideo = ref(0)

    watch(
        () => videoConfigs.value,
        (modifiedVideo) => {
            console.log(modifiedVideo)
            keyVideo.value++
        }
    );

</script>

<style>

</style>