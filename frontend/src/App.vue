<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Header from './components/Header.vue'
</script>

<template>
  <div>
    <Header />
    <RouterView />
  </div>
</template>