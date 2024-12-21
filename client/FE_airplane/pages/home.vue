<template>
    <div class="home-container bg-[#f6f6f6] flex flex-col">
    <SearchComponent class="search-component flex-grow z-500 mb-4 -translate-y-24" />
    <div class="notificaiton-container">
        <p class="next-trip-text">Have you already discovered your next trip?</p>
        <div class="flex flex-row flex-wrap notification-button pt-12 mx-auto w-[1038px] box-border gap-4">
            <NotificationComponent class="block"/>
            <NotificationComponent class="block"/>
            <NotificationComponent class="block"/>
            <NotificationComponent class="block"/>
            <NotificationComponent class="block"/>
            <NotificationComponent class="block"/>
        </div>
    </div>
  </div>
  </template>
<script setup>
definePageMeta({
    layout: 'home'
})
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