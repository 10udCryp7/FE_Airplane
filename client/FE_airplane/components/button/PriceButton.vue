<template>
    <button @click="handleClick" class="group border-2 border-gray-200 rounded-lg px-6 py-4 hover:border-black hover:bg-[#181347] hover:text-white transition duration-300 ease-in-out cursor-pointer w-1/2 h-40 flex flex-row text-left">
      <span class="text-4xl font-normal inline">{{ price }}</span> 
      <span class="text-xl font-semibold">$</span>
    </button>
</template>

<script setup>
import { defineProps } from 'vue';

// Định nghĩa props để nhận giá trị 'price' từ component cha
const props = defineProps({
  price: {
    type: Number,
    required: true
  },
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
  flightId: {
    type: Number,
  }
});
const handleClick = () => {
  const response = {
    departure: props.departure,
    arrival: props.arrival,
    startDate: props.startDate,
    endDate: props.endDate,
    price: props.price,
    flightId: props.flightId
  }
  // alert(`You have selected the flight from ${props.departure} to ${props.arrival} with the price of ${props.price} $`);
  const bookingData = useState('bookingData', () => response)
  return navigateTo('/booksubmit');
}
</script>