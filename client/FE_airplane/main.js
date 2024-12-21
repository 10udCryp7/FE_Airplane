import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue';
import router from './router';

const app = createApp(App);

// Tạo Pinia instance
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate); // Sử dụng plugin (nếu cần)

// Gắn Pinia vào ứng dụng Vue
app.use(pinia);
app.use(router);

// Mount ứng dụng
app.mount('#app');
