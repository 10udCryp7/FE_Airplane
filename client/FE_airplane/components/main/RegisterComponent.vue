<template>
    <div class="register">
      <h2>Sign Up</h2>
      <form @submit.prevent="register">
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <div>
          <label for="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" required />
        </div>
        <button type="submit">Sign Up</button>
      </form>
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
  