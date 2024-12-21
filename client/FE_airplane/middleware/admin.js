import { defineNuxtRouteMiddleware } from '@nuxtjs/composition-api';
import { useUserStore } from '~/stores/users';

export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore();
    if (!userStore.isAdmin) {
      return navigateTo('/home');
    }
  });
