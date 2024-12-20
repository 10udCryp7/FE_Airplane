<template>
    <div class="flex min-h-screen">
      <!-- Left Section -->
      <div class="w-1/2 bg-[#1F1949]">
<!--         <svg class="absolute w-full h-full opacity-10" viewBox="0 0 800 800">
        </svg> -->
      </div>
  
      <!-- Right Section -->
      <div class="w-1/2 bg-[#2C2462] flex items-center justify-center p-8">
        <div class="w-full max-w-lg">
          <h1 class="text-4xl text-white font-bold mb-8 font-afterglow">Log in to your account</h1>
          
          <!-- Username Input -->
          <div class="mb-6">
            <label class="block text-sm text-[#8C80C7] mb-2" for="username">Username</label>
            <input 
              id="username" 
              type="text" 
              class="w-full px-4 py-3 rounded-lg bg-[#1F1949] text-white focus:outline-none focus:ring-2 focus:ring-[#5A4DF0]">
          </div>
  
          <!-- Password Input -->
          <div class="mb-6">
            <label class="block text-sm text-[#8C80C7] mb-2" for="password">Password</label>
            <input 
              id="password" 
              type="password" 
              class="w-full px-4 py-3 rounded-lg bg-[#1F1949] text-white focus:outline-none focus:ring-2 focus:ring-[#5A4DF0]">
          </div>
  
          <!-- Buttons -->
          <div class="flex items-center justify-between">
            <button 
              class="bg-[#5A4DF0] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#463CC0] focus:outline-none">
              Login
            </button>
            <a href="#" class="text-[#8C80C7] hover:underline">Create a new account</a>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style>
  /* Import custom fonts */
/*   .font-afterglow {
  font-family: 'Afterglow', sans-serif;
  } */
  
  body {
    font-family: 'Neue Haas Unica Pro', sans-serif;
  }
  h1 {
    font-family: 'Afterglow', sans-serif;
  }
  </style>
  