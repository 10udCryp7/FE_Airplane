<template>
  <div class="container font-sans relative flex flex-col items-center justify-center w-full h-full p-5 bg-white rounded-lg" :style="{ width: width + 'px', height: height + 'px' }">
    <!-- Two buttons for Manage Booking and Check-in -->
    <div class="top-left flex gap-2 mb-5 text-lg">
      <input type="radio" :class="{ 'active': selectedOption === 'manage' }" @click="selectOption('manage')">
        Manage Booking
    </div>

    <!-- Display input fields for Booking Reference and Last Name when Manage Booking or Check-in is selected -->
    <div v-if="selectedOption === 'manage' || selectedOption === 'checkin'" class="flex flex-col border border-black rounded-lg overflow-hidden justify-center w-full">
      <div class="input-row w-full flex items-center justify-between flex-nowrap">
      <div class="input-group w-full flex flex-col items-start p-2 flex-1">
        <label for="booking-reference" class="text-xs text-gray-500 mb-1">Booking Reference:</label>
        <input type="text" id="booking-reference" v-model="bookingReference" placeholder="Enter booking reference" class="w-full border-none outline-none text-sm p-1"/>
      </div>
      <div class="input-group w-full flex flex-col items-start p-2 flex-1">
        <label for="last-name" class="text-xs text-gray-500 mb-1">Last Name:</label>
        <input type="text" id="last-name" v-model="lastName" placeholder="Enter last name" class="w-full border-none outline-none text-sm p-1"/>
      </div>
    </div>
    </div>

    <!-- Display action button based on the selected option -->
    <div>
      <button @click="handleAction" :disabled="!bookingReference || !lastName" class="flex p-4 text-lg text-white bg-[#18134C] border-none rounded-2xl cursor-pointer transition-colors duration-300 absolute bottom-[0px] right-5">
        <span class="hover:opa"> {{ buttonText }} </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';


// Declare refs for the selected option, booking reference, and last name
const selectedOption = ref('manage');
const bookingReference = ref('');
const lastName = ref('');

// Function to update the selected option when a button is clicked
function selectOption(option) {
  selectedOption.value = option;
  bookingReference.value = ''; // Reset input fields when changing option
  lastName.value = '';
}

// Computed property to return the text of the action button based on selected option
const buttonText = computed(() => {
  return selectedOption.value === 'manage' ? 'Retrieve Booking' : 'Check-in';
});

// Function to handle the button click based on the selected option
function handleAction() {
  if (selectedOption.value === 'manage') {
    console.log('Retrieving booking with reference:', bookingReference.value, 'and last name:', lastName.value);
    // Add logic for retrieving booking here
  } else if (selectedOption.value === 'checkin') {
    console.log('Checking in with reference:', bookingReference.value, 'and last name:', lastName.value);
    // Add logic for check-in here
  }
}
</script>

<style scoped>
.top-left {
  @apply absolute top-1 left-5;
}
</style>