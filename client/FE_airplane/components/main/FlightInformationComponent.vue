<!-- Display multi FlightInformationDisplay -->
<template>
    <div>
        <FlightInformationDisplay v-for="flight in flightData.flights" :departure="flight.departure"
            :arrival="flight.arrival" :startDate="flight.depatureTime" :endDate="flight.arrivalTime"
            :price="flight.price" />
    </div>
</template>
<script setup>

const flightData = useState('flightData')
</script>