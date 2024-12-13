<template>
  <div class="container">
    <DropdownInput v-for="(dropdown, index) in dropdowns" :key="index" :placeholder="dropdown.placeholder"
      :typeField="dropdown.typeField" v-model="msg[index]" />
    <p>{{ typeof (msg[0]) }}</p>
    <p>{{ msg[1] }}</p>
    <p>{{ msg[2] }}</p>
    <p>{{ msg[3] }}</p>
  </div>
  <div class="actions">
    <button @click="fetchFlight" class="search-flights">Search flights</button>

  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import axios from 'axios';
// define the props for the component that is an array of dropdowns created by the parent component
defineProps({
  dropdowns: {
    type: Array,
    required: true,
  },
});
const msg = ref(['North Craigmouth', 'Philipborough', Date('2025-01-12 15:57:40.405'), Date('2025-01-15 17:29:46.198')]);

// === FETCH FLIGHT ===

// Reactive variable to store the fetched data
const data = ref([]);

// Function performs the GET request
const fetchFlight = async () => {
  try {
    // get the value of the dropdowns to send as query params
    const params = {
      departure: msg.value[0],
      arrival: msg.value[1],
      departureTime: msg.value[2],
      arrivalTime: msg.value[3],
    }
    const response = await axios.get('http://localhost:3456/api/flight', { params });
    data.value = response.data;
    console.log(data.value);

    //     export const flights = pgTable("Flights", {
    //   flightId: serial("FlightID").primaryKey(),
    //   airline: varchar("Airline", { length: 100 }),
    //   aircraftTypeId: integer("AircraftTypeID").references(() => aircrafts.aircraftId),
    //   departure: varchar("Departure", { length: 100 }),
    //   arrival: varchar("Arrival", { length: 100 }),
    //   departureTime: timestamp("DepartureTime"),
    //   arrivalTime: timestamp("ArrivalTime"),
    //   price: decimal("Price", { precision: 10, scale: 2 }),
    //   seatsAvailable: integer("SeatsAvailable"),
    //   status: varchar("Status", { length: 10 }).default("on-time"),
    // });
    const fake_response = {
      flights: [
        {
          flightId: "1",
          airline: "Delta Airlines",
          aircraftTypeId: "1",
          departure: "North Craigmouth",
          arrival: "Philipborough",
          departureTime: "2025-01-12 15:57:40.405",
          arrivalTime: "2025-01-15 17:29:46.198",
          price: "1000",
          seatsAvailable: "100",
          status: "on-time"
        },
        {
          flightId: "2",
          airline: "American Airlines",
          aircraftTypeId: "2",
          departure: "North Craigmouth",
          arrival: "Philipborough",
          departureTime: "2025-01-12 15:57:40.405",
          arrivalTime: "2025-01-15 17:29:46.198",
          price: "2000",
          seatsAvailable: "200",
          status: "on-time"
        },
        {
          flightId: "3",
          airline: "United Airlines",
          aircraftTypeId: "3",
          departure: "North Craigmouth",
          arrival: "Philipborough",
          departureTime: "2025-01-12 15:57:40.405",
          arrivalTime: "2025-01-15 17:29:46.198",
          price: "3000",
          seatsAvailable: "300",
          status: "on-time"
        }
      ]
    }
    const flightData = useState('flightData', () => fake_response);

    return navigateTo('/book')
    console.log('in')
  } catch (error) {
    console.error(error);
  };

  // Move to booking page

}

</script>
