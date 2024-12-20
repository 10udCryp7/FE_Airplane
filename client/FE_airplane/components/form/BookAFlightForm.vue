<template>
    <div class="container" :style="{ width: width + 'px', height: height + 'px' }">
        <!-- choose the type of flights to search-->
        <div class="top-left flex gap-5 mb-5">
            <label class="radio-label">
                <input type="radio" name="tripType" value="return" v-model="tripType" />
                Return
            </label>
            <label class="radio-label">
                <input type="radio" name="tripType" value="oneway" v-model="tripType" />
                One way
            </label>
        </div>

        <!-- input fields for the flight search -->
            <FlightSearchInput :dropdowns="dropdownConfig"/>
    </div>
</template>


<script setup>
import { ref, computed } from 'vue';

// Kiểu chuyến đi
const tripType = ref("return");

// Dữ liệu cơ bản cho từng kiểu chuyến đi
const baseDropdowns = {
    return: [
        { placeholder: "From", typeField: 'text' },
        { placeholder: "To", typeField: 'text' },
        { placeholder: "Departure", typeField: 'date' },
        { placeholder: "Return", typeField: 'date' },
    ],
    oneway: [
        { placeholder: "From", typeField: 'text' },
        { placeholder: "To", typeField: 'text' },
        { placeholder: "Departure", typeField: 'date' },
    ],
};

// Multi-city inputs is an array of one-way inputs
/* const multiCityInputs = ref([
    { id: 1, fields: baseDropdowns.oneway },
]);
 */
// 
const dropdownConfig = computed(() => {
    if (tripType.value === "multicity") {
        return multiCityInputs.value.flatMap((city) => city.fields);
    }
    return baseDropdowns[tripType.value];
});

/* const addCity = () => {
    multiCityInputs.value.push({
        id: Date.now(),
        fields: baseDropdowns.oneway,
    });
}; */

// FLight Axios

const swapFromTo = () => {
  const temp = from.value;
  from.value = to.value;
  to.value = temp;
};

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

</script>

<style scoped>
.container {
  @apply font-sans relative flex flex-col items-center justify-center w-full h-full p-5 bg-white rounded-lg;
}


.top-left {
  @apply absolute top-1 left-5;
}

.radio-label {
  @apply flex items-center gap-2 text-lg cursor-pointer;
}

.swap-btn {
  @apply mx-2;
}

.search-btn:hover span {
  @apply opacity-50;
}
</style>
