<script setup>
</script>

<template>
  <main class="h-screen relative overflow-hidden">
    <div class="flex flex-col md:flex-row max-w-7xl mx-auto h-full">
      <div class="w-full md:w-1/2 flex items-center">
        <div class="max-w-7xl mx-auto flex flex-col">
          <h1 class="text-4xl md:text-6xl font-bold text-black">Foowa</h1>
          <p class="text-xl md:text-2xl text-black max-w-xl">Our food waste management app helps users save money and
            reduce waste by allowing them to share fridge contents with friends.</p>
          <RouterLink to="/register" class="bg-green-500 text-white px-4 py-2 mt-5 max-w-max rounded-full text-lg">
            Register on Foowa!</RouterLink>
        </div>
      </div>
      <div class="w-full md:w-1/2">
        <div class="absolute w-full h-full rounded-full bg-gradient-to-br from-green-400 to-green-600"></div>
      </div>
    </div>

  </main>
</template>