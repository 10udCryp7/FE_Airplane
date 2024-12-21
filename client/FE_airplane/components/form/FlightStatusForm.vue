<template>
    <div>
      <!-- Thanh tìm kiếm -->
      <div class="search-bar">
        <label>
          Tìm kiếm theo:
          <select v-model="searchType">
            <option value="flightId">Flight ID</option>
            <option value="airline">Airline</option>
            <option value="departure">Departure</option>
            <option value="arrival">Arrival</option>
          </select>
        </label>
        <input v-model="searchQuery" :placeholder="`Enter ${searchType}`" />
        <button @click="filterFlights">Tìm kiếm</button>
      </div>
  
      <!-- Bảng hiển thị dữ liệu -->
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Flight ID</th>
              <th>Airline</th>
              <th>Aircraft Type ID</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Departure Time</th>
              <th>Arrival Time</th>
              <th>Price</th>
              <th>Seats Available</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="flight in filteredFlights" :key="flight.flightId">
              <td>{{ flight.flightId }}</td>
              <td>{{ flight.airline }}</td>
              <td>{{ flight.aircraftTypeId }}</td>
              <td>{{ flight.departure }}</td>
              <td>{{ flight.arrival }}</td>
              <td>{{ flight.departureTime }}</td>
              <td>{{ flight.arrivalTime }}</td>
              <td>{{ flight.price }}</td>
              <td>{{ flight.seatsAvailable }}</td>
              <td>{{ flight.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from "vue";
  import axios from "axios";
  
  const searchType = ref("flightId");
  const searchQuery = ref("");
  const flights = ref([]);

  // Computed property để lọc dữ liệu dựa trên searchQuery
  const filteredFlights = computed(() => {
    return flights.value.filter((flight) => {
      const value = flight[searchType.value]?.toString().toLowerCase();
      return value?.includes(searchQuery.value.toLowerCase());
    });
  });
  
  // Hàm lấy dữ liệu từ API
  const fetchFlights = async () => {
    try {
      const response = await axios.get("http://localhost:3456/api/flight");
      flights.value = response.data.flights;
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  const filterFlights = () => {
    // Chức năng lọc được xử lý tự động trong filteredFlights (computed property)
  };
  
  onMounted(() => {
    fetchFlights();
  });
  </script>
  
  <style scoped>
  .search-bar {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    align-items: center;
  }
  
  .table-container {
    overflow-x: auto;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  table th, table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  table th {
    background-color: #f4f4f4;
  }
  </style>
