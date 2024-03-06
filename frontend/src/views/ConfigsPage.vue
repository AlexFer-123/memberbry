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
            <a :href="authLink" @click="auth2Panda()" target="_blank" :disabled="isLoading">
              <div class="flex justify-center items-center" v-if="isLoading">
                <div role="status">
                  <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
              <div class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" v-else>
                Auth
              </div>
            </a>
          </div>


          <div class="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600" v-else-if="authStore.user?.integrations.length > 0">
            Integrado
          </div>

          <div class="flex justify-center items-center" v-else>
            <div role="status">
              <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
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

const renderTemplate = ref(0)
const tokenAuthPanda = ref(false)
const authLink = ref(false)
const authStore = useAuthStore()
const authStoreGlobal = ref(authStore)
const isLoading = ref(true)
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



const auth2Panda = async () => {
  authLink.value = `https://auth.pandavideo.com.br/oauth2/authorize?client_id=${oAuthInfos.value.client_id}&response_type=code&scope=${oAuthInfos.value.scope}&redirect_uri=${oAuthInfos.value.redirect_uri}`
}

const checkToken = async (token) => {
      formData.value = {
        email: authStoreGlobal.value?.user?.email,
        integrationName: 'Panda',
        tokenIntegration: tokenAuthPanda.value.code,
      }
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
        router.push('/configs')
        
      } catch (error) {
        console.error(error)
      }
      return true
}
    
onMounted( async () => {
  tokenAuthPanda.value = router.currentRoute.value.query
  authStoreGlobal.value = await authStore
  
  if(tokenAuthPanda.value?.code) {
    setTimeout(() => {
      isLoading.value = true
      try {
        checkToken( authStoreGlobal.value.token)
      } catch (error) {
        renderTemplate.value++
        checkToken( authStoreGlobal.value.token)
      }
    }, 2000)
  }
  isLoading.value = false
})

watch(
  () => authStoreGlobal.value,
  (authenticated) => {
    isLoading.value = true
    if(tokenAuthPanda.value?.code) {
      try {
        checkToken(authenticated.token)
      } catch (error) {
        renderTemplate.value++
        checkToken(authenticated.token)
      }
    }
    isLoading.value = false
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