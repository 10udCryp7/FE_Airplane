<template>
    <section class="bg-gray-100 p-6 w-full flex flex-col">
        <h3 class="text-2xl font-bold text-center mb-6">Xem và thống kê đặt vé của khách hàng</h3>
        <button @click="viewStatistics" class="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700">Xem thống kê</button>
        <div v-if="statistics.length">
          <h4>Thống kê:</h4>
          <ul>
            <li v-for="(stat, index) in statistics" :key="index">{{ stat }}</li>
          </ul>
        </div>
      </section>
</template>

<script setup>
import { ref } from 'vue';

const statistics = ref([]);

const viewStatistics = () => {
  statistics.value = ['Khách hàng 1: 3 vé', 'Khách hàng 2: 5 vé'];
};


</script>