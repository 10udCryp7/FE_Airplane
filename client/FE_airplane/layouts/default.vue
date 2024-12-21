<template>
  <div class="relative">
    <header
      class="absolute top-0 left-0 w-full z-20 flex justify-between items-center p-64 py-4 text-white bg-transparent font-sans"
    >
      <!-- set logo path -->
      <div class="logo-container scale-75 flex items-center">
        <img src="../assets/images/logo2.png" alt="logo" class="logo" />
        <img src="../assets/images/QAirline.png" alt="logo" class="logo" />
      </div>
      <div
        class="auth-buttons flex space-x-4 text-white pr-12 font-medium gap-4 ml-auto"
      >

        <div v-if="userStore.getAuthenticated">
          <button>Hello, {{ userStore.getCurrentUser.name }}</button>
          <button @click="navigateToLogOut">Logout</button>
        </div>

        <div v-else>
          <button @click="navigateToSignIn" class="pr-5">Sign In</button>
          <button @click="navigateToSignUp">Sign Up</button>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useUserStore } from "~/stores/users";

export default {
  setup() {
    const userStore = useUserStore();
    const router = useRouter();

    const navigateToSignIn = () => {
      router.push("/login");
    };

    const navigateToSignUp = () => {
      router.push("/register");
    };
    return {
      userStore,
      navigateToSignIn,
      navigateToSignUp,
    };
  },
};
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
  font-family: "Neue Haas Unica Pro", sans-serif;
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

@media (max-width: 1024px) {
  header {
    padding: 4px 32px;
  }
}

@media (max-width: 768px) {
  header {
    padding: 4px 24px;
  }
}

@media (max-width: 640px) {
  header {
    padding: 4px 16px;
  }
}

@media (max-width: 480px) {
  header {
    padding: 4px 8px;
  }
}

@media (max-width: 360px) {
  header {
    padding: 4px 4px;
  }
}
</style>
