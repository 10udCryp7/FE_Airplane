<template>
    <div class="dropdown" @mouseleave="closeDropdown">
        <button @click="toggleDropdown">
            <!-- set the name for the button -->
            <slot name="title"></slot>
        </button>
        <transition name="fade">
            <!-- if showDropdown is true, then show the dropdown content -->
            <div v-if="showDropdown" class="dropdown-content">
                <!-- set the content for the dropdown -->
                <slot name="content"></slot>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref } from "vue";

const showDropdown = ref(false);

const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value;
}

const closeDropdown = () => {
    showDropdown.value = false;
}
</script>

<style></style>