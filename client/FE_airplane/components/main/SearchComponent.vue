<template>
    <div class="grid-container ">
        <!-- Navbar -->

        <div class="tabs">
            <button v-for="tab in tabs" :key="tab.name" :class="{ active: activeComponent === tab.component, isActive: activeTabName === tab.name }"
                @click="activeComponent = tab.component, setActiveTab(tab.name)">
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

// Active Tab name 
const activeTabName = ref(tabs[0].name);
// Active Component
const activeComponent = ref(BookAFlightForm);
// Method to set the active tab
const setActiveTab = (name) => {
  activeTabName.value = name;
};
</script>

<style scoped>
/* Grid Container */
.grid-container {
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-areas: 
    "tabs"
    "content";
  height: 328px; /* Chiều cao cố định */
  width: 1038px; /* Chiều rộng cố định */
  margin: 50px auto; /* Căn giữa trên màn hình */
  border: 1px solid #ddd; /* Viền để phân tách */
  border-radius: 10px; /* Bo góc */
  background-color: #f9f9f9; /* Màu nền */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Hiệu ứng đổ bóng */
  overflow: hidden; /* Đảm bảo nội dung không bị tràn */
}

/* Tabs Section */
.tabs {
  @apply font-sans flex justify-around items-center h-12 bg-[#18134C] rounded-t-lg overflow-hidden;
}

.tabs button {
  @apply flex-1 h-full text-lg text-white bg-transparent border-none text-center cursor-pointer;
}

.tabs button.isActive {
  @apply bg-white text-black;
}

/* .tabs button:hover {
  background-color: #bcbcbc;
} */

/* Content Section */
.content {
  grid-area: content;
  padding: 20px;
  background-color: #fff;
  overflow-y: auto;
}
</style>