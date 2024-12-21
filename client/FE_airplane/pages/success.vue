<template>
    <div class="flex items-center justify-center h-screen bg-[#0D0C34] scale-125">
      <div class="max-w-lg p-6 bg-gray-100 rounded-lg shadow-2xl shadow-black space-y-6">
        <div class="flex items-center space-x-4">
          <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 class="text-4xl text-[#0D0C34] font-afterglow">Success!</h1>
        </div>
        <p class="text-black text-2xl font-afterglow">
          Thank you for booking with us! Your booking has been confirmed.
        </p>
        <button @click="goHome" class="px-6 py-3 text-white bg-[#0D0C34] rounded-lg hover:bg-[#161549] transition duration-300">
          <span>Home</span>
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  function goHome() {
    navigateTo('/home');
  }
  </script>
  
  <style scoped>
    .font-afterglow {
        font-family: 'Afterglow', sans-serif;
    }

    .font-neue {
        font-family: 'Neue', sans-serif;
    }
  </style>
  