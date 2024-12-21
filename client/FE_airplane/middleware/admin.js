import { useUserStore } from '~/stores/users';

export default defineNuxtRouteMiddleware((to, from) => {
  console.log('Admin middleware triggered for route:', to.fullPath);
  const userStore = useUserStore();

  if (!userStore.isAdmin) {
    console.warn('Access denied: Not an admin');
    return navigateTo('/home'); // Redirect non-admins
  }

  console.log('Access granted: Admin user');
});