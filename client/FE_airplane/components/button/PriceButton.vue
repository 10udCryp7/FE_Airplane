<template>
  <div>
    <button @click="handleClick">{{ price }} $</button>
  </div>
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