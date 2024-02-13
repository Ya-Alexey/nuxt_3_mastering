import { PrismaClient } from '@prisma/client';
import protectRoute from '~/server/utils/protectRoute';

type Slug = {
  chapterSlug?: string;
  lessonSlug?: string;
}

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // We allow users to access the first lesson without being logged in
  if (event.context.params?.chapterSlug !== '1-chapter-1') {
    await protectRoute(event);
  }
  
  const { chapterSlug, lessonSlug } = event.context.params as Slug;

  const lesson = await prisma.lesson.findFirst({
    where: {
      slug: lessonSlug,
      Chapter: {
        slug: chapterSlug,
      },
    },
  });

  if (!lesson) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Lesson not found',
    });
  }

  return {
    ...lesson,
    path: `/course/chapter/${chapterSlug}/lesson/${lessonSlug}`,
  };
});
