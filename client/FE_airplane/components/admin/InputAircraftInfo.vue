<template>
          <section>
        <h3>Nhập dữ liệu về các tàu bay</h3>
        <input v-model="aircraft.code" placeholder="Mã tàu bay" />
        <input v-model="aircraft.manufacturer" placeholder="Hãng sản xuất" />
        <input v-model="aircraft.seatInfo" placeholder="Thông tin các ghế" />
        <button @click="addAircraft">Thêm tàu bay</button>
      </section>
</template>

<script setup>

import { ref } from 'vue';

// Dữ liệu và chức năng
const newPost = ref('');
const aircraft = ref({
  code: '',
  manufacturer: '',
  seatInfo: ''
});

const addAircraft = () => {
  console.log('Tàu bay được thêm:', aircraft.value);
  alert(`Thêm tàu bay thành công: ${JSON.stringify(aircraft.value)}`);
  aircraft.value = { code: '', manufacturer: '', seatInfo: '' };
};
</script>