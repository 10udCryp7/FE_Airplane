<template>
  <section class="bg-gray-100 p-6 w-full flex flex-col -translate-x-5">
    <h3 class="text-2xl font-bold text-center mb-6">Thêm tàu bay</h3>
    <h4 class="text-lg font-semibold mb-2">Thêm mẫu tàu bay</h4>
    <input
      v-model="aircraft.model"
      placeholder="Mẫu tàu bay"
      class="w-full p-2 mb-4 border border-gray-300 rounded"
    />
    <h4 class="text-lg font-semibold mb-2">Thêm nhà sản xuất</h4>
    <input
      v-model="aircraft.manufacturer"
      placeholder="Nhà sản xuất"
      class="w-full p-2 mb-4 border border-gray-300 rounded"
    />
    <h4 class="text-lg font-semibold mb-2">Thêm sức chứa</h4>
    <input
      v-model="aircraft.capacity"
      type="number"
      placeholder="Sức chứa"
      class="w-full p-2 mb-4 border border-gray-300 rounded"
    />
    <h4 class="text-lg font-semibold mb-2">Thêm mô tả</h4>
    <textarea
      v-model="aircraft.description"
      placeholder="Mô tả"
      class="w-full p-2 mb-4 border border-gray-300 rounded"
    ></textarea>
    <button
      @click="addAircraft"
      class="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700"
    >
      Thêm tàu bay
    </button>

    <h3 class="text-2xl font-bold text-center mt-8">Danh sách tàu bay</h3>
    <table class="w-full border-collapse mt-4">
      <thead>
        <tr class="bg-gray-200 text-left">
          <th class="p-3 border">ID</th>
          <th class="p-3 border">Mẫu tàu bay</th>
          <th class="p-3 border">Nhà sản xuất</th>
          <th class="p-3 border">Sức chứa</th>
          <th class="p-3 border">Mô tả</th>
          <th class="p-3 border">Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="aircraft in aircraftList"
          :key="aircraft.aircraftId"
          class="odd:bg-white even:bg-gray-50"
        >
          <td class="p-3 border">{{ aircraft.aircraftId }}</td>
          <td class="p-3 border">
            <input
              v-if="editingAircraftId === aircraft.aircraftId"
              v-model="aircraft.model"
              placeholder="Mẫu tàu bay"
              class="w-full p-2 border border-gray-300 rounded"
            />
            <span v-else>{{ aircraft.model }}</span>
          </td>
          <td class="p-3 border">
            <input
              v-if="editingAircraftId === aircraft.aircraftId"
              v-model="aircraft.manufacturer"
              placeholder="Nhà sản xuất"
              class="w-full p-2 border border-gray-300 rounded"
            />
            <span v-else>{{ aircraft.manufacturer }}</span>
          </td>
          <td class="p-3 border">
            <input
              v-if="editingAircraftId === aircraft.aircraftId"
              v-model="aircraft.capacity"
              type="number"
              placeholder="Sức chứa"
              class="w-full p-2 border border-gray-300 rounded"
            />
            <span v-else>{{ aircraft.capacity }}</span>
          </td>
          <td class="p-3 border">
            <input
              v-if="editingAircraftId === aircraft.aircraftId"
              v-model="aircraft.description"
              placeholder="Mô tả"
              class="w-full p-2 border border-gray-300 rounded"
            />
            <span v-else>{{ aircraft.description }}</span>
          </td>
          <td class="p-3 border">
            <button
              v-if="editingAircraftId === aircraft.aircraftId"
              @click="saveAircraft(aircraft)"
              class="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700"
            >
              Lưu
            </button>
            <button
              v-else
              @click="editAircraft(aircraft.aircraftId)"
              class="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
            >
              Sửa
            </button>
            <button
              @click="deleteAircraft(aircraft.aircraftId)"
              class="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
            >
              Xóa
            </button>
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