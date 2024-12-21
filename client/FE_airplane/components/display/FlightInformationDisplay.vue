<template>
  <div class="flex items-center justify-between bg-white rounded-lg shadow-lg p-4 m-7 w-full max-w-7xl mx-auto h-52">
    <!-- Truyền startDate và endDate cho component con DateRangeDisplay -->
    <div class="flex flex-col items-start space-y-2">
      <DateRangeDisplay :startDate="startDate" :endDate="endDate" />
      <button class="text-sm bg-none border-none text-[#181347] py-1 px-2 rounded translate-y-12">Flight Details</button>
    </div>
    
    <!-- Truyền price cho component con PriceButton -->
    <div class="flex justify-end w-full">
      <PriceButton :price="price" :departure="departure" :arrival="arrival" :startDate="startDate" :endDate="endDate" :flightId="flightId" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  departure: {
    type: String,
  },
  arrival: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  price: {
    type: Number,
  },
  flightId: {
    type: Number,
  }
});
</script>

<style scoped>
h2,
h3 {
  margin-bottom: 10px;
}
</style>