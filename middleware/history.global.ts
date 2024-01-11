export default defineNuxtRouteMiddleware((to, from) => {
  const navigationHistrory = useLocalStorage('history', []);
  navigationHistrory.value.push(to.path);
});
