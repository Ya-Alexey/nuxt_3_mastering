  <template>
  <div>
    <div class="mb-4 flex justify-between items-center w-full">
      <h1>
        <span class="font-medium">
          <span class="font-bold">{{ course.title }}</span>
        </span>
      </h1>
      <UserCard />
    </div>

    <div class="flex flex-row justify-center flex-grow">
      <div
        class="prose mr-4 p-8 bg-white rounded-md min-w-[20ch] flex flex-col"
      >
        <h3>Chapters</h3>
        <div
          class="space-y-1 mb-4 flex flex-col"
          v-for="(chapter, index) in course.chapters"
          :key="chapter.slug"
        >
          <h4 class="flex justify-between items-center">
            {{ chapter.title }}
            <span
              v-if="percentageCompleted && user"
              class="text-emerald-500 text-sm"
            >
              {{ percentageCompleted.chapters[index] }}%
            </span>
          </h4>
          <NuxtLink
            v-for="(lesson, index) in chapter.lessons"
            :key="lesson.slug"
            class="flex flex-row space-x-1 no-underline prose-sm font-normal py-1 px-4 -mx-4"
            :to="lesson.path"
            :class="{
              'text-blue-500':
                lesson.path === $route.fullPath,
              'text-gray-600':
                lesson.path !== $route.fullPath,
            }"
          >
            <span class="text-gray-500"
              >{{ index + 1 }}.</span
            >
            <span>{{ lesson.title }}</span>
          </NuxtLink>
        </div>
      </div>

      <div class="prose p-12 rounded-md w-[65ch]">
        <NuxtErrorBoundary>
          <NuxtPage />
          <template v-slot:error="{ error }">
            <p>
              Some error:
              <code>{{ error }}</code>
              <button @click="resetError(error)">reset error</button>
            </p>
          </template>
        </NuxtErrorBoundary>
      </div>
    </div>
  </div>
</template>
 
<script setup>
  import { useCourseProgress } from '~/stores/courseProgress';
  import { storeToRefs } from 'pinia';
  const user = useSupabaseUser();
  const course = await useCourse();
  const firstLesson = await useFirstLesson();

  // Get chapter completion percentages
  const { percentageCompleted } = storeToRefs(
    useCourseProgress()
  );

  async function resetError(error) {
    await navigateTo(firstLesson.path)
    error.value = null;
    // error.value = null;
  }
</script>

<style scoped>
  .router-link-active {
    @apply text-blue-500;
  }
</style>
