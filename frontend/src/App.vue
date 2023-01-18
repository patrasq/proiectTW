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

  data() {
    return {
      increment: 0
    }
  },

  mounted() {
    console.log(this.$route);
  },

  watch: {
    '$route' (to, from) {
      if(to.path != from.path) {
        this.increment++;
      }
    }
  }

}
</script>

<template>
  <div>
    <Header />
    <RouterView :key="increment" />
  </div>
</template>