<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <div class="max-w-7xl mx-auto flex flex-row py-3">
        <div class="w-10/12">
          <RouterLink to="/" class="logo">
            <h1 class="text-green-500">Foowa</h1>
          </RouterLink>
        </div>

        <div class="flex flex-row gap-5">
          <RouterLink to="/" exact>Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/contact">Contact</RouterLink>
        </div>
    </div>
  </header>

  <RouterView />
</template>