<template>
    <div class="auth-page">
      <h1>Welcome to Our App</h1>
      <div class="auth-container">
        <!-- Nút chuyển đổi bên trên -->
        <div class="toggle-buttons">
          <button 
            :class="{ active: currentView === 'register' }" 
            @click="currentView = 'register'">
            Sign Up
          </button>
          <button 
            :class="{ active: currentView === 'login' }" 
            @click="currentView = 'login'">
            Login
          </button>
        </div>
  
        <!-- Hiển thị nội dung động -->
        <h2 v-if="currentView === 'register'">Create an Account</h2>
        <h2 v-else>Welcome Back!</h2>
  
        <div class="form-container">
          <!-- Hiển thị Sign Up hoặc Login -->
          <registerComponent v-if="currentView === 'register'" />
          <LogInComponent v-else />
        </div>
  
        <!-- Nút chuyển đổi phía dưới -->
        <p class="toggle-text">
          <span v-if="currentView === 'register'">
            Already have an account? 
            <button @click="currentView = 'login'">Login</button>
          </span>
          <span v-else>
            Don't have an account yet? 
            <button @click="currentView = 'register'">Sign Up</button>
          </span>
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Biến theo dõi chế độ hiện tại (Sign Up hoặc Login)
  const currentView = ref('register');
  </script>
  
  <style scoped>
  .auth-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f7f9fc;
  }
  
  .auth-container {
    width: 100%;
    max-width: 400px;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .toggle-buttons {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .toggle-buttons button {
    flex: 1;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    background: #f0f0f0;
    color: #333;
    font-size: 16px;
    font-weight: bold;
    transition: background 0.3s;
  }
  
  .toggle-buttons button.active {
    background: #007bff;
    color: white;
  }
  
  .toggle-buttons button:first-child {
    border-radius: 8px 0 0 8px;
  }
  
  .toggle-buttons button:last-child {
    border-radius: 0 8px 8px 0;
  }
  
  h2 {
    margin-bottom: 20px;
    color: #333;
  }
  
  .form-container {
    margin-bottom: 20px;
  }
  
  .toggle-text {
    font-size: 14px;
    color: #666;
  }
  
  .toggle-text button {
    background: none;
    border: none;
    color: #007bff;
    cursor: pointer;
    text-decoration: underline;
    font-size: 14px;
    font-weight: bold;
    padding: 0;
  }
  
  .toggle-text button:hover {
    color: #0056b3;
  }
  </style>
  