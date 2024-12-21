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
      <input
        type="datetime-local"
        v-model="flight.departureTime"
        placeholder="Thời gian khởi hành"
      />
      <h4>Thêm thời gian đến</h4>
      <input
        type="datetime-local"
        v-model="flight.arrivalTime"
        placeholder="Thời gian đến"
      />
      <button @click="addFlight">Thêm chuyến bay</button>
  
      <h3>Danh sách các chuyến bay</h3>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Hãng hàng không</th>
            <th>Loại máy bay</th>
            <th>Điểm khởi hành</th>
            <th>Điểm đến</th>
            <th>Thời gian khởi hành</th>
            <th>Thời gian đến</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="flight in flights" :key="flight.flightId">
            <td>{{ flight.flightId }}</td>
            <td>{{ flight.airline }}</td>
            <td>{{ flight.aircraftTypeId }}</td>
            <td>{{ flight.departure }}</td>
            <td>{{ flight.arrival }}</td>
            <td>{{ flight.departureTime }}</td>
            <td>{{ flight.arrivalTime }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  
  const flights = ref([]);
  
  const fetchFlights = async () => {
    try {
      const response = await axios.get("http://localhost:3456/api/flight", {
        withCredentials: true,
      });
      // Chỉ lấy các trường cần thiết từ phản hồi
      flights.value = response.data.flights
      console.log(response.data);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu chuyến bay:", error);
    }
  };
  
  const flight = ref({
    airline: "",
    departure: "",
    arrival: "",
    departureTime: null,
    arrivalTime: null,
  });
  
  const addFlight = async () => {
    try {
      const request_param = { ...flight.value };
      const response = await axios.post(
        "http://localhost:3456/api/flight",
        request_param,
        {
          withCredentials: true,
        }
      );
      console.log("Thêm chuyến bay thành công:", response.data);
      flight.value = {
        airline: "",
        departure: "",
        arrival: "",
        departureTime: null,
        arrivalTime: null,
      };
      await fetchFlights(); // Cập nhật danh sách sau khi thêm
    } catch (error) {
      console.error("Lỗi khi thêm chuyến bay:", error);
    }
  };
  
  onMounted(() => {
    fetchFlights();
  });
  </script>
  