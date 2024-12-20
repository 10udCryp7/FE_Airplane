<template>
    <div class="parent-container">
      <h1>Booking Management</h1>
      <button @click="addBooking">+</button>
      <p>Total Bookings: {{ count }}</p>
  
      <div v-for="(booking, index) in bookings" :key="index" class="booking">
        <h3>Person {{ index + 1 }}</h3>
        <BookingInput v-model:name="names[index]" v-model:email="emails[index]"/>
      </div>
      <div>
        <button @click="submit()">Submit</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const bookings = ref([]);
  const count = ref(0);
  const names = ref([]);
  const emails = ref([]);
  function addBooking() {
    bookings.value.push({}); // Add an empty object to represent a booking
    count.value = bookings.value.length;
  }
  
  onMounted(() => {
    addBooking(); // Initialize with one booking component
  });

    function submit() {
        console.log(names.value, emails.value);
    }
  </script>
  
  