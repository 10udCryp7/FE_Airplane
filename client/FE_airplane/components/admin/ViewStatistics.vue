<template>
    <section>
        <h3>Xem và thống kê đặt vé của khách hàng</h3>
        <button @click="viewStatistics">Xem thống kê</button>
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