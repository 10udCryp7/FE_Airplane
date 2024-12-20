<template>
    <button class="date-price-button">
      <div class="date">{{ formattedDate }}</div>
      <div class="price">{{ price }} VND</div>
    </button>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  // Props to receive date and price from the parent component
  const props = defineProps({
    date: {
      type: Date,
      default: () => new Date(), // Default to current date if not provided
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  });
  
  // Computed property to format the date
  const formattedDate = computed(() => {
    const options = { weekday: 'short', day: '2-digit', month: 'short' };
    return props.date.toLocaleDateString('en-US', options);
  });
  </script>
  
  <style scoped>
  .date-price-button {
    @apply flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer bg-white px-[42px];
    font-family: 'Neue-Haas-Unica-Pro', sans-serif;
    border: none;
  }
  
  .date {
    @apply text-lg font-medium;
  }
  
  .price {
    @apply text-sm font-medium;
  }
  </style>
  