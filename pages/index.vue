<template>
  <div>
    <NuxtLink
      class="underline font-medium"
      :href="firstLesson.path"
    >
      Go to first lesson
    </NuxtLink>
    <div>
      <div>test</div>
      <!-- <div>{{  }}</div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
  const firstLesson = await useFirstLesson();
  const runtimeConfig = useRuntimeConfig()
  console.log(runtimeConfig);
  // console.log(runtimeConfig);
  
</script>
