<template>
    <div class="dropdown-input">
        <!-- v-model = "query": the query value that user inputs -->
        <!-- @input = "filterSuggestions": when user inputs, filter the suggestions -->
        <!-- @focus = "showDropdown = true": when user focuses on the input field, show the dropdown -->
        <!-- :placeholder = "placeholder": set the placeholder for the input field by parent component -->
        <!-- class = "input-field": set the class for the input field -->
        <!-- v-if = "!isDateField": if the input field is not a date field, then show the input field -->
        <input type="text" v-model="query" @input="filterSuggestions" @focus="showDropdown = true"
            :placeholder="placeholder" class="input-field" v-if="typeField === 'text'" />

        <!-- v-model = "date": the date value -->
        <!-- @change = "onDateChange": when user selects a date, update the query value -->
        <!-- :value = "date": set the value for the date picker -->
        <!-- :placeholder = "placeholder": set the placeholder for the date picker -->
        <!-- v-if = "isDateField": if the input field is a date field, then show the date picker -->
        <input type="date" v-model="query" :placeholder="placeholder" class="input-field" v-if="typeField === 'date'" />
        

        <!-- if showDropdown is true and there are filteredSuggestions, then show the dropdown -->
        <!-- v-for="(item, index) in filteredSuggestions": loop through the filteredSuggestions -->
        <!-- @click="selectSuggestion(item)": when user clicks on the suggestion, select the suggestion -->
        <!-- class = "dropdown-item": set the class for the dropdown item -->
        <ul v-if="showDropdown && filteredSuggestions.length" class="dropdown-menu">
            <li v-for="(item, index) in filteredSuggestions" :key="index" @click="selectSuggestion(item)"
                class="dropdown-item">
                {{ item }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

// define the props for the component
defineProps({
    // define the placeholder for the input field
    placeholder: {
        type: String,
        default: 'Enter your search query here' // the default placeholder if the parent component does not provide one
    },
    // define the type of the input field
    typeField: {
        type: String,
        default: 'text', // the default type of the input field is text
    }
});

// create a ref for the query value that user inputs
const query = defineModel()
// create a ref for the date value
const date = ref()
// create a ref for the suggestions
const suggestions = ref(['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose']);
// create a ref for the filtered suggestions
const filteredSuggestions = ref([]);
// create a ref for the showDropdown
const showDropdown = ref(false);

// function filter the suggestions based on the query value that user inputs
function filterSuggestions() {
    filteredSuggestions.value = suggestions.value.filter((item) =>
        item.toLowerCase().includes(query.value.toLowerCase()) // Kiểm tra xem 'query' có xuất hiện trong mỗi 'item'
    );
}

// function select the suggestion when user clicks on it
function selectSuggestion(item) {
    query.value = item; // set the query value to the selected suggestion
    showDropdown.value = false; // hide the dropdown after selecting the suggestion
    console.log(query.value);
}

// function to handle the date change event
function onDateChange(value) {
    date.value = value; // set the date value to the selected date
}

</script>
