<template>
    <div>
        <!-- Lựa chọn phương thức tìm kiếm -->
        <div>
            <label>
                <input type="radio" v-model="searchType" value="route" />
                By Route
            </label>
            <label>
                <input type="radio" v-model="searchType" value="flightNumber" />
                By Flight Number
            </label>
        </div>

        <!-- Tìm kiếm theo Route -->
        <div v-if="searchType === 'route'">
            <h3>Search by Route</h3>
            <div>
                <input v-model="from" placeholder="From" />
                <input v-model="to" placeholder="To" />
            </div>
            <div>
                <label>Date: </label>
                <VueDatePicker v-model="routeDate" format="yyyy-MM-dd" />
            </div>
            <button @click="searchByRoute">Search</button>
        </div>

        <!-- Tìm kiếm theo Flight Number -->
        <div v-else-if="searchType === 'flightNumber'">
            <h3>Search by Flight Number</h3>
            <div>
                <input v-model="flightNumber" placeholder="Flight Number" />
            </div>
            <div>
                <label>Date: </label>
                <VueDatePicker v-model="flightDate" format="yyyy-MM-dd" />
            </div>
            <button @click="searchByFlightNumber">Search</button>
        </div>

        <!-- Hiển thị kết quả -->
        <div v-if="result">
            <h4>Search Result:</h4>
            <p>{{ result }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

// Tạo các biến để lưu lựa chọn tìm kiếm và kết quả
const searchType = ref('route'); // Default is 'route'
const from = ref('');
const to = ref('');
const flightNumber = ref('');
const routeDate = ref(null); // Date for route search
const flightDate = ref(null); // Date for flight number search
const result = ref(null);

// Hàm tìm kiếm theo route
const searchByRoute = () => {
    if (!from.value || !to.value || !routeDate.value) {
        result.value = 'Please fill all fields for route search.';
        return;
    }
    result.value = `Searching for route: From ${from.value} to ${to.value} on ${routeDate.value}`;
};

// Hàm tìm kiếm theo số hiệu chuyến bay
const searchByFlightNumber = () => {
    if (!flightNumber.value || !flightDate.value) {
        result.value = 'Please fill all fields for flight number search.';
        return;
    }
    result.value = `Searching for flight number: ${flightNumber.value} on ${flightDate.value}`;
};
</script>

<style scoped>
/* Thêm CSS nếu cần */
</style>