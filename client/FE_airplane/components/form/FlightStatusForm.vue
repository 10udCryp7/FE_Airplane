<template>
    <div class="container" :style="{ width: width + 'px', height: height + 'px' }">
        <!-- Lựa chọn phương thức tìm kiếm -->
        <div class="status-options top-left flex gap-5 mb-5">
            <label class="radio-label">
                <input type="radio" v-model="searchType" value="route" />
                <span>By Route</span>
            </label>
            <label class="radio-label">
                <input type="radio" v-model="searchType" value="flightNumber" />
                <span>By Flight Number</span>
            </label>
        </div>

        <!-- Tìm kiếm theo Route -->
        <div class="input-container flex flex-col border border-black rounded-lg justify-center h-20 w-full">
            <div v-if="searchType === 'route'" class="input-row flex items-center justify-between flex-nowrap w-full">
                <div class="input-group flex flex-col items-start p-2 flex-1">
                    <label class="text-xs text-gray-500 mb-1">From</label>
                    <DropdownInput v-model="from" class="translate-y-1 dropdown-input" typeField="text" />
                </div>
                <button @click="swapFromTo" class="swap-btn mx-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v6h6M20 20v-6h-6M4 10l6-6M20 14l-6 6" />
                    </svg>
                </button>
                <div class="input-group flex flex-col items-start p-2 flex-1">
                    <label class="text-xs text-gray-500 mb-1">To</label>
                    <DropdownInput v-model="to" class="dropdown-input" typeField="text" />
                </div>
                <div class="separator w-px h-2/3 bg-black mx-2"></div>
                <div class="input-group flex flex-col items-start p-2 flex-1 -translate-y-2">
                    <label class="text-xs text-gray-500 mb-1">Date</label>
                    <VueDatePicker v-model="routeDate" format="yyyy-MM-dd" class="w-full border-none outline-none text-sm h-8 pb-8 scale-90 no-overflow-hidden date-picker" />
                </div>
                <button @click="searchByRoute" class="status-btn flex p-4 text-lg text-white bg-[#18134C] border-none rounded-2xl cursor-pointer transition-colors duration-300 absolute bottom-[0px] right-5 -translate-y-4">Search</button>
            </div>

            <!-- Tìm kiếm theo Flight Number -->
            <div v-else-if="searchType === 'flightNumber'" class="input-row flex items-center justify-between flex-nowrap">
                <div class="input-group flex flex-col items-start p-2 flex-1 -translate-y-1">
                    <label class="text-xs text-gray-500 mb-1 pb-2">Flight Number</label>
                    <input v-model="flightNumber" class="w-full border-none outline-none text-l p-1 translate-y-3" />
                </div>
                <div class="input-group flex flex-col items-start p-2 flex-1 -translate-y-1">
                    <label class="text-xs text-gray-500 mb-1">Date</label>
                    <VueDatePicker v-model="flightDate" format="yyyy-MM-dd" class="w-full border-none outline-none text-sm p-1 h-8 no-overflow-hidden date-picker pb10 -translate-y-2" />
                </div>
                <button @click="searchByFlightNumber" class="status-btn flex p-4 text-lg text-white bg-[#18134C] border-none rounded-2xl cursor-pointer transition-colors duration-300 absolute bottom-[0px] right-5 -translate-y-4">Search</button>
            </div>

            <!-- Hiển thị kết quả -->
            <div v-if="result">
                <h4>Search Result:</h4>
                <p>{{ result }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

// Tạo các biến để lưu lựa chọn tìm kiếm và kết quả
const searchType = ref('route'); // Default is 'route'
const from = ref('');
const to = ref('');
const flightNumber = ref('');
const routeDate = ref(null); // Date for route search
const flightDate = ref(null); // Date for flight number search
const result = ref(null);

defineProps({
    width: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    }
});

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
.radio-label {
  @apply flex items-center gap-2 text-lg cursor-pointer;
}
</style>