<template>
    <div class="parent-container flex flex-col items-center bg-[#181347] h-lvh p-6">
      <div class="container flex flex-col text-black align-middle bg-[#f6f6f6] border-black border-2 rounded-lg p-6 shadow-lg w-auto mt-32 mx-auto">
        <h1 class="text-4xl font-afterglow text-center mb-6">QAirline</h1>
  
        <button @click="addBooking" class="bg-[#1B1A5E] flex items-center text-white px-4 py-2 rounded-lg font-bold hover:bg-[#2c2b6e] transition duration-300 w-11">+</button>
  
        <p class="mt-4 text-lg font-neue">Total Bookings: {{ count }}</p>
  
        <div class="flex flex-wrap justify-center gap-4 p-4 mx-auto w-full">
          <div v-for="(booking, index) in bookings" :key="index" class="booking bg-white p-4 mt-4 rounded-lg shadow-md border flex flex-col border-gray-300 w-56">
            <h3 class="text-xl font-afterglow text-[#0D0C34]">Person {{ index + 1 }}</h3>
            <BookingInput v-model:name="names[index]" v-model:email="emails[index]" />
          </div>
        </div>
  
        <div class="mt-6 text-center">
          <button @click="submit" class="bg-[#0D0C34] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#1B1A5E] transition duration-300">Submit</button>
        </div>
      </div>
    </div>
  </template>
  


<script setup>
import { ref, onMounted } from 'vue';
import { defineProps } from 'vue';
import axios from 'axios';

const bookings = ref([]);
const count = ref(0);
const names = ref([]);
const emails = ref([]);
function addBooking() {
    bookings.value.push({}); // Add an empty object to represent a booking
    count.value = bookings.value.length;
}

onMounted(() => {
    addBooking();
    // Initialize with one booking component
});

const submit = async () => {
    //     {
    //   "flightId": 185,
    //   "bookingDate": "2024-11-28", 
    //   "seatNumber": 1, 
    //   "passengers": [
    //     {
    //       "name": "ok",
    //       "email": "user@gmail.com" cdit???
    //     }
    //   ]
    // }
    const passengers = []
    for (let i = 0; i < count.value; i++) {
        passengers.push({
            name: names.value[i],
            email: emails.value[i]
        });
    }
    const request_param = {
        "flightId" : bookingData.value.flightId,
        "bookingDate" : '2024-11-28',
        "seatNumber" : count.value,
        "passengers": passengers
    }
    console.log(request_param)
    const response = await axios.post('http://localhost:3456/api/booking', request_param);
    console.log(response);
    return navigateTo('/success');
}

const bookingData = useState('bookingData');
console.log(bookingData.value);
</script>

<style scoped>
.font-afterglow {
    font-family: 'Afterglow', cursive;
}
</style>