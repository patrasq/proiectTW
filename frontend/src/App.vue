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

        <div class="flex flex-row gap-5 items-center">
          <RouterLink to="/" exact>Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink class="bg-gradient-to-br from-green-400 to-green-600 block py-2 px-8 text-white rounded-full" to="/login">Login</RouterLink>
        </div>
    </div>
  </header>

  <RouterView />
</template>