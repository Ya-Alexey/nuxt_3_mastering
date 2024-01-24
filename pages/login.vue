<template>
  <div class="prose w-full max-w-2xl h-9">
    <h1>Log in to {{ course.title }}</h1>
    <button
      class="bg-blue-500 text-white font-bold py-2 px-4 rounded"
      @click="login"
    >
      Log in with Github
    </button>
  </div>
</template>

<script setup lang="ts">
  const course = await useCourse();
  const { query } = useRoute();
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  console.log('user', user.value);
  
  

  watchEffect(async () => {
    if (user.value) {
      console.log('watchEffect');
      
      await navigateTo(query.redirectTo as string, {
        replace: true,
      });
    }
  });

  const login = async () => {
    // const redirectTo = `${window.location.origin}${query.redirectTo}`;
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { 
        // NOTE страница редиректа устанавливается в supebase
        // пример редиректа после авторизации, есть косяки
        // redirectTo: `http://localhost:3000/login?redirectTo=${query.redirectTo}`, 
      },
      
    });

    if (error) {
      console.error(error);
    }
  };
</script>
