<template>
    <!-- Ảnh, Miêu tả được admin thêm tại giao diện admin-->
    <div
      class="notification relative w-[335px] h-[394px] bg-[#18134C] rounded-[17px] overflow-hidden font-neue-haas-pro">
      <!-- Phần 1: Ảnh -->
      <div class="w-full h-[60%]">
        <img src= "public/images/noti.jpg" class="w-full h-full object-cover"/>
      </div>
  
      <!-- Phần 2: Miêu tả -->
      <div class="p-5 text-white text-xl leading-6">
        <p>{{ description }}</p>
      </div>
  
      <!-- Phần 3: Button ẩn -->
      <div class="absolute bottom-0 w-full">
        <button
          class="w-full bg-[#18134C] text-2xl text-white font-bold py-4 text-left pl-5"
          @click="goToBookingPage"
        >
          From {{ averageFare }}
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  // Đoạn này code sao cho admin có thể thêm giá vé, địa điểm từ admin page. Mỗi cái noti là 1 địa điểm, người dùng ấn vào thì tự động nhập địa chỉ đó vào ô "To"
  // Props hoặc biến cho dữ liệu động

  const description = "Our latest offers for flights from Vietnam"; // Miêu tả
  const averageFare = "1.000.000VND"; // Giá vé trung bình (ví dụ)
  
  // Hàm điều hướng đến trang đặt vé
  const goToBookingPage = () => {
    window.location.href = "/booking-page"; // Thay bằng URL đặt vé thực tế
  };
  </script>
  
  <style>
  /* Thêm font Neue Haas Unica Pro */
  .notification {
    font-family: "Neue Haas Unica Pro", sans-serif;
  }
  </style>
  