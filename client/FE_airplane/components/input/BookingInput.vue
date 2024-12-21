<template>
    <div class="form-container border-[#181347]">
      <form @submit.prevent="handleSubmit" class="flex flex-col mx-auto align-middle justify-center -translate-x-4">
        <div class="form-group">
          <label for="name" class="p-2 font-neue">Name:</label>
          <input v-model="name" type="text" id="name" class="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-900 font-neue" required />
        </div>
  
        <div class="form-group">
          <label for="email" class="p-2 font-neue">Email:</label>
          <input v-model="email" type="email" id="email" class="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-900 font-neue" required />
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
  
  <style scoped>
  .form-group {
    @apply flex flex-row items-center align-middle p-2;
  }
  .font-neue {
    font-family: 'Neue' sans-serif;
  }
</style>