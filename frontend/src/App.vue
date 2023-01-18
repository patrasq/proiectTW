<script>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Header
  },

}
</script>

<template>
  <div>
    <Header />
    <RouterView />
  </div>
</template>