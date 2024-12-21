<template>
  <section class="bg-gray-100 p-6 w-full flex flex-col">
    <h3 class="text-2xl font-bold text-center mb-6">Nhập dữ liệu về các chuyến bay</h3>
    <h4 class="text-lg font-semibold mb-2">Thêm hãng hàng không</h4>
    <input
      v-model="flight.airline"
      placeholder="Hãng hàng không"
      class="w-full p-2 mb-4 border border-gray-300 rounded"
    />
    <h4 class="text-lg font-semibold mb-2">Thêm điểm khởi hành</h4>
    <input
      v-model="flight.departure"
      placeholder="Điểm khởi hành"
      class="w-full p-2 mb-4 border border-gray-300 rounded"
    />
    <h4 class="text-lg font-semibold mb-2">Thêm điểm đến</h4>
    <input
      v-model="flight.arrival"
      placeholder="Điểm đến"
      class="w-full p-2 mb-4 border border-gray-300 rounded"
    />
    <h4 class="text-lg font-semibold mb-2">Thêm thời gian khởi hành</h4>
    <input
      type="datetime-local"
      v-model="flight.departureTime"
      placeholder="Thời gian khởi hành"
      class="w-full p-2 mb-4 border border-gray-300 rounded"
    />
    <h4 class="text-lg font-semibold mb-2">Thêm thời gian đến</h4>
    <input
      type="datetime-local"
      v-model="flight.arrivalTime"
      placeholder="Thời gian đến"
      class="w-full p-2 mb-4 border border-gray-300 rounded"
    />
    <button
      @click="addFlight"
      class="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700"
    >
      Thêm chuyến bay
    </button>

    <h3 class="text-2xl font-bold text-center mt-8">Danh sách các chuyến bay</h3>
    <table class="w-full border-collapse mt-4">
      <thead>
        <tr class="bg-gray-200 text-left">
          <th class="p-3 border">ID</th>
          <th class="p-3 border">Hãng hàng không</th>
          <th class="p-3 border">Loại máy bay</th>
          <th class="p-3 border">Điểm khởi hành</th>
          <th class="p-3 border">Điểm đến</th>
          <th class="p-3 border">Thời gian khởi hành</th>
          <th class="p-3 border">Thời gian đến</th>
          <th class="p-3 border">Actions1</th>
          <th class="p-3 border">Actions2</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="flightItem in flights"
          :key="flightItem.flightId"
          class="odd:bg-white even:bg-gray-50"
        >
          <template v-if="editingFlight === flightItem.flightId">
            <td class="p-3 border">{{ flightItem.flightId }}</td>
            <td class="p-3 border">
              <input
                v-model="flight.airline"
                placeholder="Hãng hàng không"
                class="w-full p-2 border border-gray-300 rounded"
              />
            </td>
            <td class="p-3 border">{{ flightItem.aircraftTypeId }}</td>
            <td class="p-3 border">
              <input
                v-model="flight.departure"
                placeholder="Điểm khởi hành"
                class="w-full p-2 border border-gray-300 rounded"
              />
            </td>
            <td class="p-3 border">
              <input
                v-model="flight.arrival"
                placeholder="Điểm đến"
                class="w-full p-2 border border-gray-300 rounded"
              />
            </td>
            <td class="p-3 border">
              <input
                type="datetime-local"
                v-model="flight.departureTime"
                placeholder="Thời gian khởi hành"
                class="w-full p-2 border border-gray-300 rounded"
              />
            </td>
            <td class="p-3 border">
              <input
                type="datetime-local"
                v-model="flight.arrivalTime"
                placeholder="Thời gian đến"
                class="w-full p-2 border border-gray-300 rounded"
              />
            </td>
            <td class="p-3 border">
              <button
                @click="saveFlight(flightItem.flightId)"
                class="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700"
              >
                Lưu
              </button>
            </td>
            <td class="p-3 border">
              <button
                @click="cancelEdit"
                class="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
              >
                Hủy
              </button>
            </td>
          </template>
          <template v-else>
            <td class="p-3 border">{{ flightItem.flightId }}</td>
            <td class="p-3 border">{{ flightItem.airline }}</td>
            <td class="p-3 border">{{ flightItem.aircraftTypeId }}</td>
            <td class="p-3 border">{{ flightItem.departure }}</td>
            <td class="p-3 border">{{ flightItem.arrival }}</td>
            <td class="p-3 border">{{ flightItem.departureTime }}</td>
            <td class="p-3 border">{{ flightItem.arrivalTime }}</td>
            <td class="p-3 border">
              <button
                @click="editFlight(flightItem)"
                class="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
              >
                Sửa
              </button>
            </td>
            <td class="p-3 border">
              <button
                @click="deleteFlight(flightItem.flightId)"
                class="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
              >
                Xóa
              </button>
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