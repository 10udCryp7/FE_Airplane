<template>
    <div class="parent-container">
        <h1></h1>
        <button @click="addBooking">+</button>
        <p>Total Bookings: {{ count }}</p>

        <div v-for="(booking, index) in bookings" :key="index" class="booking">
            <h3>Person {{ index + 1 }}</h3>
            <BookingInput v-model:name="names[index]" v-model:email="emails[index]" />
        </div>
        <div>
            <button @click="submit()">Submit</button>
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