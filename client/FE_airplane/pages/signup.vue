<template>
    <div class="h-screen flex items-center justify-center bg-[#0D0C34]">
      <div class="flex w-full max-w-4xl">
        <!-- Left section with logo and text -->
        <div class="w-1/2 flex flex-col items-center justify-center">
          <!-- <img src="/path/to/logo.png" alt="QAirline Logo" class="w-32 mb-6" /> -->
          <h1 class="text-white font-afterglow text-4xl">QAirline</h1>
        </div>
  
        <!-- Right section with login form -->
        <div class="w-1/2 bg-white p-8 rounded-xl shadow-md">
          <h2 class="text-[#0D0C34] font-afterglow text-3xl mb-6">Log in to your account</h2>
          <form class="space-y-4">
            <input
              type="text"
              placeholder="Username"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="password"
              placeholder="Password"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <button
              type="submit"
              class="w-full py-2 bg-[#0D0C34] text-white rounded-lg hover:bg-[#1B1A5E]"
            >
              Login
            </button>
          </form>
          <p class="text-[#0D0C34] font-afterglow mt-4 text-sm">
            Create a new account?
          </p>
          <button
            class="w-full mt-2 py-2 border border-[#0D0C34] text-[#0D0C34 rounded-lg hover:bg-[#F4F4F9]"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "LoginScreen",
  };
  </script>
  
  <style scoped>
  
  .font-afterglow {
    font-family: 'Afterglow', sans-serif;
  }
  
  </style>
  