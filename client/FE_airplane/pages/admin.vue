<template>
    <div class="dashboard">
      <nav>
        <button @click="activeTab = 'statistics'">Statistics</button>
        <button @click="activeTab = 'flightManagement'">Flight Management</button>
        <button @click="activeTab = 'userTickets'">User Tickets</button>
        <button @click="activeTab = 'aircraftManagement'">Aircraft Management</button>
      </nav>
  
      <div v-if="activeTab === 'statistics'">
        <h2>Statistics</h2>
        <p>Total Tickets by Aircraft:</p>
        <ul>
          <li v-for="(count, aircraft) in ticketsByAircraft" :key="aircraft">
            {{ aircraft }}: {{ count }} tickets
          </li>
        </ul>
      </div>
  
      <div v-if="activeTab === 'flightManagement'">
        <h2>Flight Management</h2>
        <form @submit.prevent="createFlight">
          <input v-model="newFlight.name" placeholder="Flight Name" required />
          <input v-model="newFlight.date" type="date" required />
          <button type="submit">Create Flight</button>
        </form>
        <ul>
          <li v-for="flight in flights" :key="flight.id">
            {{ flight.name }} - {{ flight.date }}
            <button @click="updateFlightStatus(flight.id, 'Delayed')">Delay</button>
            <button @click="updateFlightStatus(flight.id, 'Canceled')">Cancel</button>
          </li>
        </ul>
      </div>
  
      <div v-if="activeTab === 'userTickets'">
        <h2>User Tickets</h2>
        <ul>
          <li v-for="(count, user) in ticketsByUser" :key="user">
            {{ user }}: {{ count }} tickets
          </li>
        </ul>
      </div>
  
      <div v-if="activeTab === 'aircraftManagement'">
        <h2>Aircraft Management</h2>
        <form @submit.prevent="addAircraft">
          <input v-model="newAircraft" placeholder="Aircraft Name" required />
          <button type="submit">Add Aircraft</button>
        </form>
        <ul>
          <li v-for="aircraft in aircrafts" :key="aircraft">
            {{ aircraft }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref } from 'vue';
  
  // Reactive data
  const activeTab = ref('statistics');
  const ticketsByAircraft = reactive({
    'Boeing 747': 120,
    'Airbus A320': 85,
  });
  const flights = reactive([
    { id: 1, name: 'Flight 101', date: '2024-12-25', status: 'Scheduled' },
    { id: 2, name: 'Flight 102', date: '2024-12-26', status: 'Scheduled' },
  ]);
  const ticketsByUser = reactive({
    'User A': 5,
    'User B': 3,
  });
  const aircrafts = reactive(['Boeing 747', 'Airbus A320']);
  
  // Reactive inputs
  const newFlight = reactive({ name: '', date: '' });
  const newAircraft = ref('');
  
  // Methods
  const createFlight = () => {
    if (newFlight.name && newFlight.date) {
      flights.push({
        id: Date.now(),
        name: newFlight.name,
        date: newFlight.date,
        status: 'Scheduled',
      });
      newFlight.name = '';
      newFlight.date = '';
    }
  };
  
  const updateFlightStatus = (id, status) => {
    const flight = flights.find(f => f.id === id);
    if (flight) flight.status = status;
  };
  
  const addAircraft = () => {
    if (newAircraft.value) {
      aircrafts.push(newAircraft.value);
      newAircraft.value = '';
    }
  };
  </script>
  
  <style>
  .dashboard {
    font-family: Arial, sans-serif;
    padding: 20px;
  }
  nav {
    margin-bottom: 20px;
  }
  nav button {
    margin-right: 10px;
  }
  </style>
  