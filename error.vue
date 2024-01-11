<template>
  <div class="prose p-12 bg-gray-100 w-full h-full min-h-screen flex flex-col items-center">
    <h1>{{ error.statusCode }}</h1>
    <h2>{{ error.message }}</h2>
    <NuxtLink to="/course">Course</NuxtLink>
  </div>
</template>

<script setup>
  defineProps({
    error: Object
  })
</script>