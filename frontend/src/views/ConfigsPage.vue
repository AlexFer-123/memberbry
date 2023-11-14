<template>
  <div class="container mx-auto max-w-4xl">

    <div class="text-center flex-column justify-center align-middle my-6 mx-auto">
      <h1 class="font-title">
        Integrações
      </h1>
      <div class="flex justify-center">
        <div class="flex border-b-2 my-6 border-spacing-0 border-violet-400 opacity-25 w-1/4"></div>
      </div>
    </div>

    <div class="integrations flex text-center flex-wrap">
      <div v-for="integration in integrations" :key="integration" class="">
        <div class="card w-64 flex-wrap flex-column gap-6 justify-center">
          <div class="flex" >
            <span class=" block subtitle font-medium">
              {{integration.name}}
            </span>
          </div>

          <a :href="authLink" @click="auth2Panda()" class="py-2 px-6 bg-slate-800 rounded-md text-white mt-2" target="_blank">Auth</a>
        
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";

const integrations = ref([
  {
    name: 'Panda Video'
  }
])

const oAuthInfos = ref(
  {
    client_id: "1gojsiuasqum4srpcqu0c036gr",
    scope: "aws.cognito.signin.user.admin",
    redirect_uri: "https://gentle-cassata-e4f102.netlify.app/dashboard"
  }
)
const authLink = ref(false)

const auth2Panda = () => {
  authLink.value = `https://auth.pandavideo.com.br/oauth2/authorize?client_id=${oAuthInfos.value.client_id}&response_type=code&scope=${oAuthInfos.value.scope}&redirect_uri=${oAuthInfos.value.redirect_uri}`
}

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