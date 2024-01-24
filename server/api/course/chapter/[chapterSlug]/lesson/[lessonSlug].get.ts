import type { 
  Lesson, 
  LessonWithPath, 
  Course, 
  Chapter 
} from "~/types/course";
import course from "@/server/courseData";

course as Course;

type Slug = {
  chapterSlug?: string;
  lessonSlug?: string;
}

export default defineEventHandler((event): LessonWithPath => {
  const { chapterSlug, lessonSlug } = event.context.params as Slug;

  const chapter: Maybe<Chapter> = course.chapters.find(chapter => chapter.slug == chapterSlug);
  if (!chapter) {
    throw createError({
      statusCode: 404,
      message: 'Chapter not found ((',
    })
  }

  const lesson: Maybe<Lesson> = chapter.lessons.find(lesson => lesson.slug == lessonSlug)
  if (!lesson) {
    throw createError({
      statusCode: 404,
      message: 'Lesson not found ((',
    })
  }

  return {
    ...lesson,
    path: `/course/chapter/${chapterSlug}/lesson/${lessonSlug}`,
  };
});