<template>
  <div
    class="notification relative w-[335px] h-[394px] bg-[#18134C] rounded-[17px] overflow-hidden font-neue-haas-pro"
  >
    <!-- Image Section -->
    <div class="w-full h-[60%]">
      <img
        :src="'data:image/png;base64,' + notification.content"
        alt="Notification Image"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Description Section -->
    <div v-if="notification" class="p-5 text-white text-xl leading-6">
      <p>Description: {{ notification.description }}</p>
    </div>

    <!-- Hidden Button Section -->
    <div class="absolute bottom-0 w-full">
      <button
        class="w-full bg-[#18134C] text-2xl text-white font-bold py-4 text-left pl-5"
        @click="goToBookingPage"
      >
        Tittle {{ notification.title }}
      </button>
    </div>
  </div>
</template>

<script setup>
// Props for dynamic notification data
defineProps({
  notification: {
    type: Object,
    required: true,
  },
});

// Navigate to booking page
const goToBookingPage = () => {
  window.location.href = "/booking-page"; // Replace with actual booking URL
};
</script>
