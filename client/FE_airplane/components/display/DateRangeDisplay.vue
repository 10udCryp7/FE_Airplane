<template>
  <div class="flex flex-row space-x-4 items-center">
    <!-- Start Time -->
    <div class="flex items-baseline">
      <p class="text-3xl font-bold">{{ formatHourMinute(startDate) }}</p>
      <span class="text-lg font-medium ml-1">{{ formatAMPM(startDate) }}</span>
    </div>
    <div class="w-20 border-t-2 border-gray-300"></div>
    <!-- End Time -->
    <div class="flex items-baseline">
      <p class="text-3xl font-bold">{{ formatHourMinute(endDate) }}</p>
      <span class="text-lg font-medium ml-1">{{ formatAMPM(endDate) }}</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

// Define props to receive data from the parent component
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

// Extract the time in "hour:minute" format
const formatHourMinute = (dateTime) => {
  const date = new Date(dateTime);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).split(' ')[0];
};

// Extract AM or PM
const formatAMPM = (dateTime) => {
  const date = new Date(dateTime);
  return date.toLocaleTimeString([], { hour12: true }).split(' ')[1];
};
</script>

<style scoped>
</style>
