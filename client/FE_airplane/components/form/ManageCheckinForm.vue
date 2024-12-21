<template>
  <div>
    <!-- Thanh tìm kiếm -->
    <div class="search-bar">
      <label>
        Tìm kiếm theo:
        <select v-model="searchType">
          <option value="bookingId">Booking ID</option>
          <option value="userId">User ID</option>
          <option value="flightId">Flight ID</option>
          <option value="name">Passenger Name</option>
        </select>
      </label>
      <input v-model="searchQuery" :placeholder="`Enter ${searchType}`" />
      <button @click="filterBookings">Tìm kiếm</button>
    </div>

    <!-- Bảng hiển thị dữ liệu -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>User ID</th>
            <th>Flight ID</th>
            <th>Booking Status</th>
            <th>Payment Status</th>
            <th>Booking Date</th>
            <th>Seat Number</th>
            <th>Passenger Name</th>
            <th>Passenger Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="booking in filteredBookings" :key="booking.Bookings.bookingId">
            <td>{{ booking.Bookings.bookingId }}</td>
            <td>{{ booking.Bookings.userId }}</td>
            <td>{{ booking.Bookings.flightId }}</td>
            <td>{{ booking.Bookings.bookingStatus }}</td>
            <td>{{ booking.Bookings.paymentStatus }}</td>
            <td>{{ booking.Bookings.bookingDate }}</td>
            <td>{{ booking.Bookings.seatNumber }}</td>
            <td>{{ booking.Passengers.name }}</td>
            <td>{{ booking.Passengers.email }}</td>
            <td>
              <button @click="cancelBooking(booking.Bookings.bookingId)">Hủy vé</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useUserStore } from '~/stores/users';

const searchType = ref("bookingId");
const searchQuery = ref("");
const bookings = ref([]);

const router = useRouter();
const userStore = useUserStore();

const userId = userStore.getCurrentUser.userId;

console.log('userId: '+ userId)
// Computed property để lọc dữ liệu dựa trên searchQuery
const filteredBookings = computed(() => {
  return bookings.value.filter((booking) => {
    const bookingData = booking.Bookings[searchType.value]?.toString().toLowerCase();
    const passengerData = booking.Passengers[searchType.value]?.toString().toLowerCase();
    return bookingData?.includes(searchQuery.value.toLowerCase()) || passengerData?.includes(searchQuery.value.toLowerCase());
  });
});

// Hàm lấy dữ liệu từ API
const fetchBookings = async () => {
  try {
    const response = await axios.get(`http://localhost:3456/api/booking/user/${userId}`);
    bookings.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching bookings:", error);
  }
};

// Hàm hủy vé
const cancelBooking = async (bookingId) => {
  try {
    const confirmCancel = confirm("Bạn có chắc chắn muốn hủy vé này không?");
    if (!confirmCancel) return;

    await axios.delete(`http://localhost:3456/api/booking/delete/${bookingId}`);
    alert("Hủy vé thành công!");

    // Cập nhật lại danh sách đặt vé sau khi hủy thành công
    fetchBookings();
  } catch (error) {
    console.error("Error canceling booking:", error);
    alert("Đã xảy ra lỗi khi hủy vé. Vui lòng thử lại.");
  }
};

onMounted(() => {
  fetchBookings();
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
