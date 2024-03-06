<template>
  <div :key="renderTemplate" class="container mx-auto max-w-4xl">

    <div class="text-center flex-column justify-center align-middle my-6 mx-auto">
      <h1 class="font-title">
        Integrações
      </h1>
      <div class="flex justify-center">
        <div class="flex border-b-2 my-6 border-spacing-0 border-violet-400 opacity-25 w-1/4"></div>
      </div>
    </div>

    <div class="integrations flex justify-center text-center flex-wrap">
      <div v-for="integration in integrations" :key="integration" class="">
        <div class="card w-64 flex-wrap flex-column gap-6 justify-center">
          <div class="flex justify-center mb-4" >
            <span class=" block subtitle font-medium">
              {{integration.name}}
            </span>
          </div>
          
          <div v-if="authStore.user?.integrations.length <= 0">
            <a :href="authLink" @click="auth2Panda()" :class="isLoading ? 'bg-slate-800': 'bg-slate-300'" class="py-2 px-6 bg-slate-800 rounded-md text-white mt-2" target="_blank" :disabled="isLoading">Auth</a>
          </div>
          <div v-else>
            <a class="py-2 px-6 bg-green-600 rounded-md text-white mt-2" target="_blank">Autenticado</a>
          </div>
        
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { router } from "@/router";
import { useAuthStore } from '@/store/main';
import  http  from '@/services/http'
import { jwtDecode } from "jwt-decode";

const integrations = ref([
  {
    name: 'Panda Video'
  }
])
const oAuthInfos = ref(
  {
    client_id: "1gojsiuasqum4srpcqu0c036gr",
    scope: "aws.cognito.signin.user.admin",
    redirect_uri: "https://membry.netlify.app/configs"
  }
)
const formData = ref({
  email: '',
  integrationName: '',
  tokenIntegration: '',
});

const renderTemplate = ref(0)
const tokenAuthPanda = ref(false)
const authLink = ref(false)
const authStore = useAuthStore()
const authStoreGlobal = ref(authStore)
const isLoading = ref(false)

const auth2Panda = async () => {
  authLink.value = `https://auth.pandavideo.com.br/oauth2/authorize?client_id=${oAuthInfos.value.client_id}&response_type=code&scope=${oAuthInfos.value.scope}&redirect_uri=${oAuthInfos.value.redirect_uri}`
}

const checkToken = async (token) => {
      formData.value = {
        email: authStoreGlobal.value?.user?.email,
        integrationName: 'Panda',
        tokenIntegration: tokenAuthPanda.value.code,
      }
      console.log(token)
      const tokenDecoded = jwtDecode(token)
      const userId = tokenDecoded.id
      
      try {
    
        const response = await http.put(`/users/${userId}/token`, formData.value,
        {
          headers: {
            'Authorization': `Bearer ${token}` 
          }
        }
        ) 
        authStoreGlobal.value.setUser(response.data.user)
        console.log('usuário autenticado')
        router.push('/configs')
        
      } catch (error) {
        console.error(error)
      }
      return true
}
    
onMounted( async () => {
  isLoading.value = true
  tokenAuthPanda.value = router.currentRoute.value.query
  authStoreGlobal.value = await authStore

  console.log(authStoreGlobal.value.user?.integrations.length)
  if(tokenAuthPanda.value?.code) {
    setTimeout(() => {
      try {
        checkToken( authStoreGlobal.value.token)
        isLoading.value = false
      } catch (error) {
        renderTemplate.value++
        checkToken( authStoreGlobal.value.token)
        isLoading.value = false
      }
    },2000)
    }
})

watch(
  () => authStoreGlobal.value,
  (authenticated) => {
    if(tokenAuthPanda.value?.code) {
      try {
        checkToken(authenticated.token)
      } catch (error) {
        renderTemplate.value++
        checkToken(authenticated.token)
      }
    }
  }
);

</script>

<style scoped>
  .font-title {
    font-size: 2rem;
    font-weight: 600;
  }

  .card { 
    padding: 1.5rem;
  }
  .subtitle {

    font-size: 1.2rem

  }
</style>