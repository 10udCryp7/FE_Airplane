<template>
  <div>
    <!-- Two buttons for Manage Booking and Check-in -->
    <div>
      <button :class="{ 'active': selectedOption === 'manage' }" @click="selectOption('manage')">
        Manage Booking
      </button>
      <button :class="{ 'active': selectedOption === 'checkin' }" @click="selectOption('checkin')">
        Check-in
      </button>
    </div>

    <!-- Display input fields for Booking Reference and Last Name when Manage Booking or Check-in is selected -->
    <div v-if="selectedOption === 'manage' || selectedOption === 'checkin'">
      <div>
        <label for="booking-reference">Booking Reference:</label>
        <input type="text" id="booking-reference" v-model="bookingReference" placeholder="Enter booking reference" />
      </div>
      <div>
        <label for="last-name">Last Name:</label>
        <input type="text" id="last-name" v-model="lastName" placeholder="Enter last name" />
      </div>
    </div>

    <!-- Display action button based on the selected option -->
    <div>
      <button @click="handleAction" :disabled="!bookingReference || !lastName">
        {{ buttonText }}
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