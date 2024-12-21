<template>
  <div class="home-container bg-[#f6f6f6] flex flex-col">
    <SearchComponent class="search-component flex-grow z-500 mb-4 -translate-y-24" />
    <div class="notificaiton-container">
      <p class="next-trip-text">Have you already discovered your next trip?</p>
      <div class="flex flex-row flex-wrap notification-button pt-12 mx-auto w-[1038px] box-border gap-4">
        <!-- Render NotificationComponent dynamically with v-for -->
        <NotificationComponent
          v-for="(notification, index) in notifications"
          :key="notification.id"
          :notification="notification"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

definePageMeta({
  layout: "home",
});

// Reactive array to store notifications
const notifications = ref([]);

// Function to fetch the last 6 notifications
const fetchNotifications = async () => {
  try {
    const response = await axios.get("http://localhost:3456/api/notification", {
      withCredentials: true,
    });
    console.log(response.data);
    // Assume the API returns an array of notifications sorted by date
    notifications.value = response.data.notifications.slice(-6).reverse(); // Get the last 6 notifications in reverse order
  } catch (error) {
    console.error("Error fetching notifications:", error);
  }
};

// Fetch notifications on component mount
onMounted(() => {
  fetchNotifications();
});
console.log(notifications);
</script>

<style>
@keyframes appear {
  from {
    opacity: 0;
    scale: 0.5;
  }
  to {
    opacity: 1;
    scale: 1;
  }
}

.block {
    animation: appear linear;
    animation-timeline: view();
    animation-range: entry 0% cover 40%;
}

.next-trip-text {
  z-index: 1;
  @apply font-sans text-4xl pt-5 pl-80;
  font-family: 'Neue Haas Unica Pro', sans-serif;
}</style>