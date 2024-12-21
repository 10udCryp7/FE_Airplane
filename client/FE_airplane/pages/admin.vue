<template>
  <div class="admin-panel bg-[#161549] min-h-screen min-w-full relative ">
    <div class="tabs items-center">
      <button 
        v-for="tab in tabs" 
        :key="tab" 
        @click="currentTab = tab"
        :class="{ active: currentTab === tab }">
        {{ tab }}
      </button>
    </div>
    <!-- Nội dung các tab -->
    <div v-if="currentTab === 'Đăng thông tin'">
      <InputNotification />
    </div>

    <div v-if="currentTab === 'Nhập dữ liệu tàu bay'">
      <InputAircraftInfo />
    </div>

    <div v-if="currentTab === 'Nhập dữ liệu chuyến bay'">
      <InputFlightInfo />
    </div>

    <div v-if="currentTab === 'Thống kê'">
      <ViewStatistics />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

definePageMeta({
    layout: 'admin'
})

// Tab hiện tại
const tabs = [
  'Đăng thông tin',
  'Nhập dữ liệu tàu bay',
  'Nhập dữ liệu chuyến bay',
  'Thống kê',
];
const currentTab = ref(tabs[0]);

</script>

<style scoped>
.admin-panel {
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.tabs {
  display: flex;
  margin-bottom: 20px;
}

.tabs button {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  cursor: pointer;
  font-size: 16px;
}

.tabs button.active {
  background-color: #161549;
  color: white;
}

textarea,
input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
}

button {
  padding: 10px 15px;
  font-size: 16px;
  margin-bottom: 20px;
  cursor: pointer;
}

section {
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 20px;
}

h3 {
  color: #2c3e50;
}
</style>
