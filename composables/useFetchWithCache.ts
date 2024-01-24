import { StorageSerializers } from '@vueuse/core';

export default async <T>(url: string) => {
  const cached = useSessionStorage<T>(
    url,
    null,
    {
      serializer: StorageSerializers.object,
    }
  );

  if (!cached.value) {
    const { data, error } = await useFetch<T>(
      url,
      // конкретные поля
      // {
      //   pick: ['title', 'number'],
      // }
    );
    if (error.value) {
      throw createError({
        ...error.value,
        statusMessage: `not fetch "${url}"`,
      });
    }

    cached.value = data.value as T;
  } else {
    console.log(`cache from ${url}`);
  }

  return cached;
}
