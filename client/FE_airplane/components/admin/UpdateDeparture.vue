<template>
    <section>
        <h3>Thay đổi giờ khởi hành</h3>
        <input v-model="updateFlightCode" placeholder="Mã chuyến bay" />
        <input v-model="newDepartureTime" placeholder="Giờ khởi hành mới" />
        <button @click="updateFlightTime">Cập nhật giờ khởi hành</button>
      </section>
</template>

<script setup>
import { ref } from 'vue';

const newDepartureTime = ref('');

const updateFlightTime = () => {
  alert(`Cập nhật giờ khởi hành cho chuyến bay ${updateFlightCode.value} thành ${newDepartureTime.value}`);
  updateFlightCode.value = '';
  newDepartureTime.value = '';
};

</script>