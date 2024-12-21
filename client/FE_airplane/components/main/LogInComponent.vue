<template>
  <div class="flex min-h-screen">
    <!-- Left Section -->
    <div class="w-1/2 bg-[#1F1949]">
      <!-- Optional SVG or other content can go here -->
    </div>

    <!-- Right Section -->
    <div class="w-1/2 bg-[#2C2462] flex items-center justify-center p-8">
      <div class="w-full max-w-lg">
        <h1 class="text-4xl text-white mb-8 font-afterglow">Log in to your account</h1>
        <form @submit.prevent="login" class="space-y-4">
          <div>
            <label for="email" class="block text-sm text-[#8C80C7] mb-2">Email:</label>
            <input type="email" id="email" v-model="email" required class="w-full px-4 py-3 rounded-lg bg-[#1F1949] text-white focus:outline-none focus:ring-2 focus:ring-[#5A4DF0]" />
          </div>
          <div>
            <label for="password" class="block text-sm text-[#8C80C7] mb-2">Password:</label>
            <input type="password" id="password" v-model="password" required class="w-full px-4 py-3 rounded-lg bg-[#1F1949] text-white focus:outline-none focus:ring-2 focus:ring-[#5A4DF0]" />
          </div>
          <button type="submit" class="w-full py-2 bg-[#5A4DF0] text-white rounded-lg hover:bg-[#463CC0]">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script >
import { jwtDecode } from "jwt-decode";
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useUserStore } from '~/stores/users';
export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();
    const userStore = useUserStore();
    const login = async () => {
      try {
        const response = await axios.post('http://localhost:3456/api/auth/login', { email: email.value, password: password.value });
        
        if (response.status === 200) {
          console.log('Login response', response.data);
          const token = response.data.accessToken;

          // Decode the JWT token
          console.log('Token', token);
          const decodedToken = jwtDecode(token);

          // Extract name and role from the token
          const { name, role } = decodedToken;

          // Update the store
          userStore.addCurentUser({
            user: { name, role },   // Set user details
            token,                 // Store the token
          });

console.log('Login successful', { name, role });
          router.push({ name: 'home' });
        }
      } catch (error) {
        console.error('Login failed', error);
      }
    };

    return {
      email,
      password,
      login,
    };
  }
}
</script>

<style scoped>
  
.font-afterglow {
  font-family: 'Afterglow', sans-serif;
}

</style>