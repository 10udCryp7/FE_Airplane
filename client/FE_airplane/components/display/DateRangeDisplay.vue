<template>
    <div class="date-range">
      <p><strong>Start Date:</strong> {{ startDate }}</p>
      <p><strong>End Date:</strong> {{ endDate }}</p>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  // Định nghĩa props để nhận dữ liệu từ component cha
  const props = defineProps({
    startDate: {
      type: String,
      required: true
    },
    endDate: {
      type: String,
      required: true
    }
  });
  </script>
  
  <style scoped>
  .date-range {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  </style>
.  