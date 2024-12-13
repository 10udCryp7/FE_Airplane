<template>
    <header class="header">
        <!-- set logo path -->
        <div>
            <img src="" alt="logo" class="logo" />
        </div>
        <!-- set header navigation bar -->
        <nav class="nav">
            <!-- set DropdownButton for 'Explore' -->
            <DropdownButton>
                <template v-slot:title>Explore</template>
                <template v-slot:content>
                    <!-- ADD CONTENT HERE -->
                    <!--DEMO CONTENT BELOW-->
                    <a href="#">Destinations</a>
                    <a href="#">Travel Guides</a>
                </template>
            </DropdownButton>
            <!-- set DropdownButton for 'Book' -->
            <DropdownButton>
                <template v-slot:title>Book</template>
                <template v-slot:content>
                    <!-- ADD CONTENT HERE -->
                    <!--DEMO CONTENT BELOW-->
                    <a href="#">Flights</a>
                    <a href="#">Hotels</a>
                </template>
            </DropdownButton>
            <!-- set DropdownButton for 'Experience' -->
            <DropdownButton>
                <template v-slot:title>Experience</template>
                <template v-slot:content>
                    <!-- ADD CONTENT HERE -->
                    <!--DEMO CONTENT BELOW-->
                    <a href="#">Events</a>
                    <a href="#">Activities</a>
                </template>
            </DropdownButton>
            <button>Sign In</button>
            <button>Sign Up</button>
        </nav>
    </header>   
</template>

<script setup>
</script>

<style scoped>
/* Header Styles */
.header {
  display: grid;
  grid-template-columns: auto 1fr auto; /* Logo, navigation, và phần bên phải */
  align-items: center;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.7); /* Màu nền trong suốt */
  color: white; /* Màu chữ */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Hiệu ứng đổ bóng */
}

/* Logo Section */
.logo {
  max-height: 40px;
}

/* Navigation Styles */
.nav {
  display: grid;
  grid-template-columns: repeat(5, auto); /* 5 mục menu */
  justify-content: center;
  gap: 20px; /* Khoảng cách giữa các mục */
}

.nav a {
  text-decoration: none;
  color: white;
  font-weight: 500;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.nav a:hover {
  background-color: rgba(255, 255, 255, 0.2); /* Hiệu ứng nền khi hover */
  color: #f9f9f9;
}

/* Right Section Styles */
.right-section {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 14px;
}

.right-section a {
  text-decoration: none;
  color: white;
  transition: color 0.3s ease;
}

.right-section a:hover {
  color: #f9f9f9;
}

.right-section .icon {
  font-size: 16px; /* Icon kích thước nhỏ */
  margin-right: 5px;
}

.right-section img {
  width: 20px;
  height: 20px;
  border-radius: 50%; /* Icon quốc gia dạng tròn */
}

/* Responsive Styles */
@media (max-width: 768px) {
  .nav {
    grid-template-columns: repeat(3, auto); /* Thu gọn khi màn hình nhỏ */
  }

  .right-section {
    gap: 10px;
    font-size: 12px;
  }
}
</style>
