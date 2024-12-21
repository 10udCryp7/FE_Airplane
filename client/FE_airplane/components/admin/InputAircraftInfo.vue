<template>
  <section>
    <h3>Thêm tàu bay</h3>
    <h4>Thêm mẫu tàu bay</h4>
    <input v-model="aircraft.model" placeholder="Mẫu tàu bay" />
    <h4>Thêm nhà sản xuất</h4>
    <input v-model="aircraft.manufacturer" placeholder="Nhà sản xuất" />
    <h4>Thêm sức chứa</h4>
    <input v-model="aircraft.capacity" type="number" placeholder="Sức chứa" />
    <h4>Thêm mô tả</h4>
    <textarea v-model="aircraft.description" placeholder="Mô tả"></textarea>
    <button @click="addAircraft">Thêm tàu bay</button>

    <h3>Danh sách tàu bay</h3>
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Mẫu tàu bay</th>
          <th>Nhà sản xuất</th>
          <th>Sức chứa</th>
          <th>Mô tả</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="aircraft in aircraftList" :key="aircraft.aircraftId">
          <td>{{ aircraft.aircraftId }}</td>
          <td>{{ aircraft.model }}</td>
          <td>{{ aircraft.manufacturer }}</td>
          <td>{{ aircraft.capacity }}</td>
          <td>{{ aircraft.description }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Biến lưu dữ liệu tàu bay mới
const aircraft = ref({
  model: '',
  manufacturer: '',
  capacity: 0,
  description: '',
});

// Biến lưu danh sách tàu bay
const aircraftList = ref([]);

// Hàm thêm tàu bay
const addAircraft = async () => {
  try {
    const param = aircraft.value;
    const response = await axios.post('http://localhost:3456/api/aircraft', param, {
      withCredentials: true,
    });
    alert(`Thêm tàu bay thành công: ${JSON.stringify(param)}`);

    // Reset form
    aircraft.value = { model: '', manufacturer: '', capacity: 0, description: '' };

    // Cập nhật danh sách tàu bay
    fetchAircraftList();
  } catch (error) {
    console.error('Lỗi khi thêm tàu bay:', error);
    alert('Lỗi khi thêm tàu bay!');
  }
};

// Hàm lấy danh sách tàu bay
const fetchAircraftList = async () => {
  try {
    const response = await axios.get('http://localhost:3456/api/aircraft', {
      withCredentials: true,
    });
    aircraftList.value = response.data.aircrafts || [];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách tàu bay:', error);
    alert('Lỗi khi lấy danh sách tàu bay!');
  }
};

// Gọi API lấy danh sách tàu bay khi component được mount
onMounted(() => {
  fetchAircraftList();
});
</script>

<style scoped>
section {
  margin: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th, td {
  padding: 10px;
  text-align: left;
}
th {
  background-color: #f4f4f4;
}
</style>
