<template>
  <div class="parent">
    <h2>Select your departure flight from {{ departure }} to {{ arrival }}</h2>

    <!-- Truyền startDate và endDate cho component con DateRangeDisplay -->
    <DateRangeDisplay :startDate="startDate" :endDate="endDate" />

    <h3>Giá tiền:</h3>

    <!-- Truyền price cho component con PriceButton -->
    <PriceButton :price="price" />
    <button>FLight Details</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Dữ liệu cần truyền xuống cho component con
// const startDate = ref('2024-12-01');
// const endDate = ref('2024-12-10');
// const price = ref(100); // Ví dụ giá trị price là 100$

defineProps({
  departure: {
    type: String,
  },
  arrival: {
    type: String,
  },
  // define the placeholder for the input field
  startDate: {
    type: Date,
  },
  // define the type of the input field
  endDate: {
    type: Date,
  },
  price: {
    type: Number,
  },

});
</script>

<style scoped>
.parent {
  padding: 20px;
  border: 1px solid black;
}

h2,
h3 {
  margin-bottom: 10px;
}
</style>