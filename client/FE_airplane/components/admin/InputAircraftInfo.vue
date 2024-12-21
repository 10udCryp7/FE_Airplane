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
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="aircraft in aircraftList" :key="aircraft.aircraftId">
          <td>{{ aircraft.aircraftId }}</td>
          <td>
            <input
              v-if="editingAircraftId === aircraft.aircraftId"
              v-model="aircraft.model"
              placeholder="Mẫu tàu bay"
            />
            <span v-else>{{ aircraft.model }}</span>
          </td>
          <td>
            <input
              v-if="editingAircraftId === aircraft.aircraftId"
              v-model="aircraft.manufacturer"
              placeholder="Nhà sản xuất"
            />
            <span v-else>{{ aircraft.manufacturer }}</span>
          </td>
          <td>
            <input
              v-if="editingAircraftId === aircraft.aircraftId"
              v-model="aircraft.capacity"
              type="number"
              placeholder="Sức chứa"
            />
            <span v-else>{{ aircraft.capacity }}</span>
          </td>
          <td>
            <input
              v-if="editingAircraftId === aircraft.aircraftId"
              v-model="aircraft.description"
              placeholder="Mô tả"
            />
            <span v-else>{{ aircraft.description }}</span>
          </td>
          <td>
            <button v-if="editingAircraftId === aircraft.aircraftId" @click="saveAircraft(aircraft)">
              Lưu
            </button>
            <button v-else @click="editAircraft(aircraft.aircraftId)">Sửa</button>
            <button @click="deleteAircraft(aircraft.aircraftId)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

// Biến lưu danh sách tàu bay
const aircraftList = ref([]);

// Biến trạng thái chỉnh sửa
const editingAircraftId = ref(null);

// Biến dữ liệu tàu bay để thêm
const aircraft = ref({
  model: "",
  manufacturer: "",
  capacity: 0,
  description: "",
});

// Hàm thêm tàu bay
const addAircraft = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3456/api/aircraft",
      aircraft.value,
      { withCredentials: true }
    );
    alert("Thêm tàu bay thành công!");
    aircraft.value = { model: "", manufacturer: "", capacity: 0, description: "" };
    fetchAircraftList();
  } catch (error) {
    console.error("Lỗi khi thêm tàu bay:", error);
    alert("Lỗi khi thêm tàu bay!");
  }
};

// Hàm lấy danh sách tàu bay
const fetchAircraftList = async () => {
  try {
    const response = await axios.get("http://localhost:3456/api/aircraft", {
      withCredentials: true,
    });
    aircraftList.value = response.data.aircrafts || [];
  } catch (error) {
    console.error("Lỗi khi lấy danh sách tàu bay:", error);
    alert("Lỗi khi lấy danh sách tàu bay!");
  }
};

// Hàm xóa tàu bay
const deleteAircraft = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:3456/api/aircraft/${id}`,
      { withCredentials: true }
    );
    alert("Xóa tàu bay thành công!");
    fetchAircraftList();
  } catch (error) {
    console.error("Lỗi khi xóa tàu bay:", error);
    alert("Lỗi khi xóa tàu bay!");
  }
};

// Hàm bật trạng thái chỉnh sửa
const editAircraft = (id) => {
  editingAircraftId.value = id;
};

// Hàm lưu thay đổi tàu bay
const saveAircraft = async (aircraft) => {
  try {
    const response = await axios.put(
      `http://localhost:3456/api/aircraft/${aircraft.aircraftId}`,
      {
        model: aircraft.model,
        manufacturer: aircraft.manufacturer,
        capacity: aircraft.capacity,
        description: aircraft.description,
      },
      { withCredentials: true }
    );
    alert("Cập nhật tàu bay thành công!");
    editingAircraftId.value = null; // Tắt chế độ chỉnh sửa
    fetchAircraftList();
  } catch (error) {
    console.error("Lỗi khi cập nhật tàu bay:", error);
    alert("Lỗi khi cập nhật tàu bay!");
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
button {
  margin-right: 5px;
}
</style>
