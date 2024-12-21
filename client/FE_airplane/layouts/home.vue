<template>
    <div class="relative">
        <header class="absolute top-0 left-0 w-full z-20 flex justify-between items-center p-64 py-4 text-white bg-transparent font-sans">
        <!-- set logo path -->
        <div class="logo-container scale-75 flex items-center ">
          <img src="../assets/images/logo2.png" alt="logo" class="logo" />
          <img src="../assets/images/QAirline.png" alt="logo" class="logo" />
        </div>
        
        <!-- set header navigation bar -->
        <nav class="nav flex space-x-4 text-white gap-5 ml-5">
            <!-- set DropdownButton for 'Explore' -->
            <DropdownButton class="text-lg font-light">
                <template v-slot:title>Explore</template>
                <template v-slot:content>
                    <!-- ADD CONTENT HERE -->
                    <!--DEMO CONTENT BELOW-->
                    <!-- <a href="#">Destinations</a>
                    <a href="#">Travel Guides</a> -->
                </template>
            </DropdownButton>
            <!-- set DropdownButton for 'Book' -->
            <DropdownButton class="text-lg font-light">
                <template v-slot:title>Book</template>
                <template v-slot:content>
                    <!-- ADD CONTENT HERE -->
                    <!--DEMO CONTENT BELOW-->
<!--                     <a href="#">Flights</a>
                    <a href="#">Hotels</a> -->
                </template>
            </DropdownButton>

            
            <!-- set DropdownButton for 'Experience' -->
        </nav>
        <div class="auth-buttons flex space-x-4 text-white pr-12 font-medium gap-4 ml-auto">
        <button>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
      
        <div v-if=userStore.getAuthenticated>
            <button>Hello, {{ userStore.getCurrentUser.name }}</button>
            <button @click="navigateToLogOut">Logout</button>
          </div>

          <div v-else>
            <button @click="navigateToSignIn">Sign In</button>
            <button @click="navigateToSignUp">Sign Up</button>
          </div>
    </div>
        </header>  

        <div class="background-container h-[50vh] w-full bg-cover bg-center bg-no-repeat">
            <img src="../assets/images/background.jpg" alt="background" class="h-full w-full object-cover" />
        </div>
    </div> 
</template>

<script >
import { useRouter } from 'vue-router';
import { useUserStore } from '~/stores/users';

export default {
  setup() {
  const userStore = useUserStore();
  const router = useRouter();
  
  const navigateToSignIn = () => {
    router.push('/login');
  }

  const navigateToSignUp = () => {
    router.push('/register');
  }

  const navigateToLogOut = () => {
    userStore.logout();
  }

  return {
      userStore,
      navigateToSignIn,
      navigateToSignUp,
      navigateToLogOut
    };
  },  
}
</script>

<style scoped>

/* Logo Section */
.logo {
  @apply max-h-10;
}

/* Navigation Styles */
/* .nav {
  display: grid;
  grid-template-columns: repeat(5, auto); 
  justify-content: center;
  gap: 20px; 
} */

/* .nav a {
  text-decoration: none;
  color: white;
  font-weight: 500;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.nav a:hover {
  background-color: rgba(255, 255, 255, 0.2); 
  color: #f9f9f9;
} */

.nav > DropdownButton {
  all: unset;
  @apply text-lg font-medium text-black cursor-pointer transition-colors duration-300;
}

.nav > DropdownButton:hover {
  @apply text-opacity-70;
}

/* Right Section Styles */
/* .right-section {
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
  font-size: 16px; 
  margin-right: 5px;
}

.right-section img {
  width: 20px;
  height: 20px;
  border-radius: 50%; 
} */

header {
  font-family: 'Neue Haas Unica Pro', sans-serif;
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
