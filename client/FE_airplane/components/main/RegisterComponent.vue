<template>
  <div class="h-screen flex items-center justify-center bg-[#0D0C34]">
    <div class="flex w-full max-w-4xl">
      <!-- Left section with logo and text -->
      <div class="w-1/2 flex flex-col items-center justify-center p-8">
        <!-- <img src="/path/to/logo.png" alt="QAirline Logo" class="w-32 mb-6" /> -->
        <h1 class="text-white font-afterglow text-4xl">QAirline</h1>
      </div>
      <div class="w-1/2 bg-white p-8 rounded-xl shadow-white">
        <h2 class="text-[#0D0C34] font-afterglow text-3xl mb-6">Sign up new account</h2>
        <form @submit.prevent="register" class="space-y-4">
          <div>
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required class="w-full px-4 py-2 border border-gray-300 rounded-lg"/>
          </div>
          <div>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required class="w-full px-4 py-2 border border-gray-300 rounded-lg"/>
          </div>
          <div>
            <label for="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" v-model="confirmPassword" required class="w-full px-4 py-2 border border-gray-300 rounded-lg"/>
          </div>
          <button type="submit" class="w-full py-2 bg-[#0D0C34] text-white rounded-lg hover:bg-[#1B1A5E]">Sign Up</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const router = useRouter();

const register = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match!');
    return;
  }
  try {
    const response = await axios.post('/api/register', { email: email.value, password: password.value });
    console.log('Sign-up successful', response.data);
    router.push('/login'); // Navigate to the login page on success
  } catch (error) {
    console.error('Sign-up failed', error);
  }
};
</script>

<style scoped>
  
.font-afterglow {
  font-family: 'Afterglow', sans-serif;
}

</style>
