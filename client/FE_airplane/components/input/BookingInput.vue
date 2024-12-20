<template>
    <div class="form-container">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Name:</label>
          <input v-model="name" type="text" id="name" placeholder="Enter your name" required />
        </div>
  
        <div class="form-group">
          <label for="email">Email:</label>
          <input v-model="email" type="email" id="email" placeholder="Enter your email" required />
        </div>
  
      </form>
  
      <div v-if="submitted">
        <h3>Submitted Data</h3>
        <p><strong>Name:</strong> {{ name }}</p>
        <p><strong>Email:</strong> {{ email }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Reactive state for the form inputs
  const name = defineModel('name')
  const email = defineModel('email')
  </script>
  