<template>
    <div>
        <h1>Success</h1>
        <p>Thank you for booking with us</p>
        <button @click="goHome">Home</button>
    </div>
</template>

<script setup>
    function goHome() {
        navigateTo('/home');
    }
</script>