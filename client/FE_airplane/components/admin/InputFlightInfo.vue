<template>
    <section>
      <h3>Nhập dữ liệu về các chuyến bay</h3>
        <h4>Thêm hãng hàng không</h4>
        <input v-model="flight.airline" placeholder="Hãng hàng không" />
        <h4>Thêm điểm khởi hành</h4>
        <input v-model="flight.departure" placeholder="Điểm khởi hành" />
        <h4>Thêm điểm đến</h4>
        <input v-model="flight.arrival" placeholder="Điểm đến" />
        <h4>Thêm thời gian khởi hành</h4>
        <input type='date' v-model="flight.departureTime" placeholder="Thời gian khởi hành" />
        <h4>Thêm thời gian đến</h4>
        <input type='date' v-model="flight.arrivalTime" placeholder="Thời gian đến" />
        <h4>Thêm giá vé</h4>
        <input v-model="flight.price" placeholder="Giá vé" />
        <h4>Thêm số ghế còn trống</h4>
        <input v-model="flight.seatsAvailable" placeholder="Số ghế còn trống" />
      <button @click="addFlight">Thêm chuyến bay</button>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  const flight = ref({
    airline: 'x',
    departure: 'x',
    arrival: 'x',
    departureTime: null,
    arrivalTime: null,
    price: 0,
    seatsAvailable: 0,
  });
  
  
  const addFlight = async() => {
    const request_param = flight.value;

    const response = await axios.post('http://localhost:3456/api/flight', request_param, {
        withCredentials: true,
    })

    console.log(response)
    // alert(`Thêm chuyến bay thành công: ${JSON.stringify(flight.value)}`);
    flight.value = { airline: '', departure: '', arrival: '', departureTime: null, arrivalTime: null, price: 0, seatAvailable: 0 };
  };
  
  </script>
  