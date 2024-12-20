<template>
  <div class="input-container flex flex-col border border-black rounded-lg justify-center h-20">
    <div class="input-row flex items-center justify-between flex-nowrap w-full">
      <DropdownInput v-for="(dropdown, index) in dropdowns" :name="name[index]" :placeholder="dropdown.placeholder"
        :typeField="dropdown.typeField" v-model="msg[index]" class="relative input-group flex flex-col items-start p-2 flex-1"/>
    </div>
  </div>
  <button @click="fetchFlight"
    class="search-btn flex p-4 text-lg text-white bg-[#18134C] border-none rounded-2xl cursor-pointer transition-colors duration-300 absolute bottom-[-30px] right-5 ">
    <span>
      Search
      flights
    </span>
  </button>
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
// const msg = ref(['North Craigmouth', 'Philipborough', Date('2025-01-12 15:57:40.405'), Date('2025-01-15 17:29:46.198')]);
const msg = ref(['', '', '', '']); 
const name = ref(['From', 'To', 'Departure Time', 'Arrival Time']);
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
    const flightData = useState('flightData', () => response.data);

    return navigateTo('/book')
    console.log('in')
  } catch (error) {
    console.error(error);
  };

  // Move to booking page

}

</script>

<style scoped>
.search-btn:hover span {
  @apply opacity-50;
}
</style>
