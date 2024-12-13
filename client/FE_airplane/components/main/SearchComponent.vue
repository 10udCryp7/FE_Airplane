<template>
    <div class="grid-container">
        <!-- Navbar -->

        <div class="tabs">
            <button v-for="tab in tabs" :key="tab.name" :class="{ active: activeComponent === tab.component }"
                @click="activeComponent = tab.component">
                {{ tab.label }}
            </button>
        </div>

        <!-- Content -->
        <div class="content">
            <component :is="activeComponent" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

import BookAFlightForm from '../form/BookAFlightForm.vue';
import ManageCheckinForm from '../form/ManageCheckinForm.vue';
import FlightStatusForm from '../form/FlightStatusForm.vue';
const tabs = [
    { name: "Book a Flight", label: "Book a Flight", component: BookAFlightForm },
    { name: "Manage Check-in", label: "Manage Check-in", component: ManageCheckinForm },
    { name: "Flight Status", label: "Flight Status", component: FlightStatusForm },
];

// Active Component
const activeComponent = ref(BookAFlightForm);
</script>

<style scoped>
/* Grid Container */
.grid-container {
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-areas: 
    "tabs"
    "content";
  height: 500px; /* Chiều cao cố định */
  width: 800px; /* Chiều rộng cố định */
  margin: 50px auto; /* Căn giữa trên màn hình */
  border: 1px solid #ddd; /* Viền để phân tách */
  border-radius: 10px; /* Bo góc */
  background-color: #f9f9f9; /* Màu nền */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Hiệu ứng đổ bóng */
  overflow: hidden; /* Đảm bảo nội dung không bị tràn */
}

/* Tabs Section */
.tabs {
  grid-area: tabs;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  background-color: #f8f8f8;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.tabs button {
  padding: 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  background-color: #ddd;
  transition: background-color 0.3s;
  border-radius: 5px;
}

.tabs button.active {
  background-color: #5a2d82;
  color: white;
}

.tabs button:hover {
  background-color: #bcbcbc;
}

/* Content Section */
.content {
  grid-area: content;
  padding: 20px;
  background-color: #fff;
  overflow-y: auto;
}
</style>