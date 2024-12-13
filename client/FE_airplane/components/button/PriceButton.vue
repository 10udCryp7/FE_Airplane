<template>
    <div>
        <button @click="handleClick">{{ price }} $</button>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

// Định nghĩa props để nhận giá trị 'price' từ component cha
const props = defineProps({
  price: {
    type: Number,
    required: true
  }
});
const handleClick = () => {
  alert(`Nút đã được nhấn! Giá trị hiện tại là: ${props.price}`);
}
</script>