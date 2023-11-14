<template>
  <div>
    <NavBar />
    <RouterView />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
</script>

<style>

.home {
  height: 80vh;
}
</style>
