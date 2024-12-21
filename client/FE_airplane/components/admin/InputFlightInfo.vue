<template>
  <section>
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
          <th>Actions1</th>
          <th>Actions2</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="flightItem in flights" :key="flightItem.flightId">
          <!-- If editingFlight matches this row, show input fields -->
          <template v-if="editingFlight === flightItem.flightId">
            <td>{{ flightItem.flightId }}</td>
            <td>
              <input
                v-model="flight.airline"
                placeholder="Hãng hàng không"
              />
            </td>
            <td>{{ flightItem.aircraftTypeId }}</td>
            <td>
              <input
                v-model="flight.departure"
                placeholder="Điểm khởi hành"
              />
            </td>
            <td>
              <input v-model="flight.arrival" placeholder="Điểm đến" />
            </td>
            <td>
              <input
                type="datetime-local"
                v-model="flight.departureTime"
                placeholder="Thời gian khởi hành"
              />
            </td>
            <td>
              <input
                type="datetime-local"
                v-model="flight.arrivalTime"
                placeholder="Thời gian đến"
              />
            </td>
            <td>
              <button @click="saveFlight(flightItem.flightId)">Lưu</button>
            </td>
            <td>
              <button @click="cancelEdit">Hủy</button>
            </td>
          </template>

          <!-- Otherwise, show the row in read-only mode -->
          <template v-else>
            <td>{{ flightItem.flightId }}</td>
            <td>{{ flightItem.airline }}</td>
            <td>{{ flightItem.aircraftTypeId }}</td>
            <td>{{ flightItem.departure }}</td>
            <td>{{ flightItem.arrival }}</td>
            <td>{{ flightItem.departureTime }}</td>
            <td>{{ flightItem.arrivalTime }}</td>
            <td>
              <button @click="editFlight(flightItem)">Sửa</button>
            </td>
            <td>
              <button @click="deleteFlight(flightItem.flightId)">Xóa</button>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const flights = ref([]);
const editingFlight = ref(null); // Track which flight is being edited

const flight = ref({
  airline: "",
  departure: "",
  arrival: "",
  departureTime: null,
  arrivalTime: null,
});

const fetchFlights = async () => {
  try {
    const response = await axios.get("http://localhost:3456/api/flight", {
      withCredentials: true,
    });
    flights.value = response.data.flights;
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu chuyến bay:", error);
  }
};

const deleteFlight = async (flightId) => {
  try {
    await axios.delete(`http://localhost:3456/api/flight/${flightId}`, {
      withCredentials: true,
    });
    console.log("Xóa chuyến bay thành công");
    await fetchFlights();
  } catch (error) {
    console.error("Lỗi khi xóa chuyến bay:", error);
  }
};

const editFlight = (flightItem) => {
  editingFlight.value = flightItem.flightId; // Set the flightId being edited
  flight.value = { ...flightItem }; // Populate the form with existing flight data
};

const saveFlight = async (flightId) => {
  try {
    const response = await axios.put(
      `http://localhost:3456/api/flight/${flightId}`,
      { ...flight.value },
      {
        withCredentials: true,
      }
    );
    console.log("Sửa chuyến bay thành công:", response.data);

    editingFlight.value = null; // Clear editing mode
    flight.value = {
      airline: "",
      departure: "",
      arrival: "",
      departureTime: null,
      arrivalTime: null,
    };
    await fetchFlights(); // Refresh the flights list
  } catch (error) {
    console.error("Lỗi khi sửa chuyến bay:", error);
  }
};

const cancelEdit = () => {
  editingFlight.value = null; // Exit editing mode
  flight.value = {
    airline: "",
    departure: "",
    arrival: "",
    departureTime: null,
    arrivalTime: null,
  };
};

onMounted(() => {
  fetchFlights();
});
</script>
