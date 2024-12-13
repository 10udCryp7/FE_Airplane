<template>
    <div class="container">
        <!-- choose the type of flights to search-->
        <div class="trip-type">
            <label>
                <input type="radio" name="tripType" value="return" v-model="tripType" />
                Return
            </label>
            <label>
                <input type="radio" name="tripType" value="oneway" v-model="tripType" />
                One way
            </label>
            <label>
                <input type="radio" name="tripType" value="multicity" v-model="tripType" />
                Multi-city
            </label>
        </div>

        <!-- input fields for the flight search -->
        <FlightSearchInput :dropdowns="dropdownConfig" />

        <!-- if the tripType is multicity, then show the add city button -->
        <div v-if="tripType === 'multicity'" class="multi-city-controls">
            <button @click="addCity">+ Add another city</button>
        </div>

        <!-- if the tripType is return, then show the return date field -->
        <!-- <div class="actions">
            <button class="search-flights">Search flights</button>
        </div> -->
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
const multiCityInputs = ref([
    { id: 1, fields: baseDropdowns.oneway },
]);

// 
const dropdownConfig = computed(() => {
    if (tripType.value === "multicity") {
        return multiCityInputs.value.flatMap((city) => city.fields);
    }
    return baseDropdowns[tripType.value];
});

const addCity = () => {
    multiCityInputs.value.push({
        id: Date.now(),
        fields: baseDropdowns.oneway,
    });
};

// FLight Axios

</script>


