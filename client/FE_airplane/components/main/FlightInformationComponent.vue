<!-- Display multi FlightInformationDisplay -->
<template>
<div class="relative bg-[#161549] min-h-screen min-w-full">
    <div class="text-white bg-[#161549] font-serif text-left px-4 py-10 md:px-11 lg:px-16 max-w-screen-lg md:mx-auto lg:ml-[133px]">
      <h1 class="text-6xl leading-snug pt-36 font-afterglow ">
        Select your departure flight<br />
        from <span class="text-[#97B0FF]">{{ flightData.flights[0].departure }}</span>
        to <span class="text-[#97B0FF]">{{ flightData.flights[0].arrival }}</span>
      </h1>
    </div>
    <div>
        <FlightInformationDisplay class="block" v-for="flight in flightData.flights" :key="flight.flightId"
            :departure="flight.departure" :arrival="flight.arrival" :startDate="flight.departureTime"
            :endDate="flight.arrivalTime" :price="flight.price" :flightId="flight.flightId"/>
    </div>
</div>
</template>
<script setup>

const flightData = useState('flightData');

</script>

<style scoped>
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
.font-afterglow {
    font-family: 'Afterglow', sans-serif;
}
</style>

