<template>
    <div v-if="user" class="mx-auto max-w-6xl px-2 sm:px-6 lg:px-8 flex gap-11">

        <div class="video-section w-full">
            <div v-for="lesson in user.lessons" :key="lesson">
                <div v-if="lesson.video.id === $route.params.id" class="my-8">

                    <h3 class="subtitle my-8">Edição de vídeo</h3>
                    <div style="position:relative;padding-top:56.25%;z-index: -10">
                        <iframe :key="keyVideo" :id="'panda-' + lesson.video.id" 
                            :src="getLessonConfig(lesson.video.video_player)" 
                            style="border:none;position:absolute;top:0;left:0;" 
                            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture" 
                            allowfullscreen=true width="100%" height="100%" fetchpriority="high"
                        ></iframe>
                    </div>
    
                    <div class="feat-player col-12 col-lg-6 my-4 d-flex">
                        <h4 class="text-base text-[#262626] font-semibold">Autoplay</h4>
                        <Switch
                            v-model="videoConfigs[0].status"
                            :class="videoConfigs[0].status ? 'bg-teal-900' : 'bg-teal-700'"
                            class="relative inline-flex h-[20px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                            >
                            <span class="sr-only">Use setting</span>
                            <span
                                aria-hidden="true"
                                :class="videoConfigs[0].status ? 'translate-x-5' : 'translate-x-0'"
                                class="pointer-events-none inline-block h-[15px] w-[15px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                            />
                        </Switch>
                    </div>
                    <div class="feat-player col-12 col-lg-6 my-4 d-flex">
                        <h4 class="text-base text-[#262626] font-semibold">Barra de Progresso Fictícia</h4>
                        <Switch
                            v-model="videoConfigs[1].status"
                            :class="videoConfigs[1].status ? 'bg-teal-900' : 'bg-teal-700'"
                            class="relative inline-flex h-[20px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                            >
                            <span class="sr-only">Use setting</span>
                            <span
                                aria-hidden="true"
                                :class="videoConfigs[1].status ? 'translate-x-5' : 'translate-x-0'"
                                class="pointer-events-none inline-block h-[15px] w-[15px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                            />
                        </Switch>
                    </div>
                    <div class="feat-player col-12 col-lg-6 my-4 d-flex">
                        <h4 class="text-base text-[#262626] font-semibold">Salvar progresso do vídeo</h4>
                        <Switch
                            v-model="videoConfigs[2].status"
                            :class="videoConfigs[2].status ? 'bg-teal-900' : 'bg-teal-700'"
                            class="relative inline-flex h-[20px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                            >
                            <span class="sr-only">Use setting</span>
                            <span
                                aria-hidden="true"
                                :class="videoConfigs[2].status ? 'translate-x-5' : 'translate-x-0'"
                                class="pointer-events-none inline-block h-[15px] w-[15px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                            />
                        </Switch>
                    </div>
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
    import { Switch } from '@headlessui/vue'

    const authStore = useAuthStore()
    const user = ref(authStore.user)
    const keyVideo = ref(0)
    const videoURLEmbed = ref(false)
    const IsPandaVideo = ref(null)
    const videoConfigs = ref([
        {
            name: 'autoplay',
            status: false
        },
        {
            name: 'alternativeProgress',
            status: false
        },
        {
            name: 'saveProgress',
            status: false
        }
    ])   

    const CheckHostPanda = lesson => {
        if(lesson.storage_size !== 0) {
         IsPandaVideo.value = true
        } else {
         IsPandaVideo.value = false
        }
        return IsPandaVideo.value 
    }

    const getLessonConfig = (videoURL) => {
        videoURLEmbed.value = videoURL
        for(let i = 0; i < videoConfigs.value.length; i++) {

            let config = videoConfigs.value[i]
            if(videoConfigs.value[i].status) {
                videoURLEmbed.value += `&${config.name}=${config.status}&alternativeProgressHeight=4`
                console.log(videoURLEmbed.value)
            }

        }
        return videoURLEmbed.value
    }

    watch(
        () => videoConfigs.value[0].status || videoConfigs.value[1].status || videoConfigs.value[2].status,
        (modifiedVideo) => {
            console.log(videoURLEmbed.value, modifiedVideo)
            getLessonConfig(videoURLEmbed.value)
            keyVideo.value++
        }
    );

</script>

<style scoped>
.card {
  
}
h3.subtitle {
    @apply text-3xl;
    @apply text-[#262626];
    
    font-weight: 600;
}

.feat-player {
    display: flex;
    flex-direction: row-reverse;
    gap: 1rem;
}
</style>