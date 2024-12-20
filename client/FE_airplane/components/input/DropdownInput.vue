<template>
    <div class="dropdown-input" ref="inputContainer">
        <!-- v-model = "query": the query value that user inputs -->
        <!-- @input = "filterSuggestions": when user inputs, filter the suggestions -->
        <!-- @focus = "showDropdown = true": when user focuses on the input field, show the dropdown -->
        <!-- :placeholder = "placeholder": set the placeholder for the input field by parent component -->
        <!-- class = "input-field": set the class for the input field -->
        <!-- v-if = "!isDateField": if the input field is not a date field, then show the input field -->
        <label class="text-xs text-gray-500 mb-1"> {{ name }} </label>
        <input class="input-field" type="text" v-model="query" @input="filterSuggestions" @focus="handleFocus"
            :placeholder="placeholder" v-if="typeField === 'text'" />

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
                class="dropdown-item hover:bg-gray-100">
                <div class="flex items-center space-x-3">
                    <!-- <div class="icon-container">
                            <img :src="getIcon(item.type)" alt="icon" class="w-5 h-5" />
                        </div> -->
                    <div class="flex-1">
                        <div class="font-bold text-gray-900">{{ item.title }}</div>
                        <div class="text-sm text-gray-500">{{ item.subtitle }}</div>
                    </div>
                    <div class="text-gray-400 font-medium">{{ item.code }}</div>
                </div>
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
        
    },
    typeField: {
        type: String,

    },
    name: {
        type: String,

    }
});

const dropdownStyle = ref({});
const inputContainer = ref(null);

// create a ref for the query value that user inputs
const query = defineModel()
// create a ref for the date value
const date = ref()
// create a ref for the suggestions
const suggestions = ref([
    { title: 'Aachen', subtitle: 'Germany', code: 'XHJ', type: 'train' },
    { title: 'Aalborg', subtitle: 'Denmark', code: 'AAL', type: 'plane' },
    { title: 'Aalesund', subtitle: 'Norway', code: 'AES', type: 'plane' },
    { title: 'Aarhus', subtitle: 'Denmark', code: 'AAR', type: 'plane' },
    { title: 'Aba/Hongyuan', subtitle: 'China', code: 'AHJ', type: 'plane' },
    { title: 'Abadan', subtitle: 'Iran', code: 'ABD', type: 'plane' }
]);
// create a ref for the filtered suggestions
// create a ref for the showDropdown
const showDropdown = ref(false);

// function filter the suggestions based on the query value that user inputs
const filteredSuggestions = computed(() => {
    return suggestions.value.filter((item) =>
        item.title.toLowerCase().includes(query.value?.toLowerCase() || '')
    );
});

// function select the suggestion when user clicks on it
function selectSuggestion(item) {
    query.value = item.title; // set the query value to the selected suggestion
    showDropdown.value = false; // hide the dropdown after selecting the suggestion
}

// function to handle the date change event
function onDateChange(value) {
    date.value = value; // set the date value to the selected date
}


function setDropdownPosition(target) {
    const rect = target.getBoundingClientRect();
    dropdownStyle.value = {
        top: `${rect.bottom + window.scrollY + 10}px`, // Adjusted to move the dropdown 10px lower
        left: `${rect.left + window.scrollX}px`,
        width: `${rect.width}px`
    };
}

// Xử lý focus input
function handleFocus(event) {
    setDropdownPosition(event.target);
    showDropdown.value = true;
}

// Đóng dropdown khi click outside
function handleClickOutside(event) {
    if (!inputContainer.value.contains(event.target)) {
        showDropdown.value = false;
    }
}

// Lấy icon dựa trên type

// Mount và unmount sự kiện click outside
onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});

</script>

<style>
.input-field {
    width: 100%;
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 8px;
    outline: none;
}

.dropdown-menu {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-height: 300px;
    overflow-y: auto;
    width: 500px;
    position: absolute;
    z-index: 1000;
}

.dropdown-item {
    padding: 12px 16px;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.dropdown-item:hover {
    background-color: #f8f9fa;
}
</style>