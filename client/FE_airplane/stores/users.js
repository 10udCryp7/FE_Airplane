import { defineStore } from "pinia";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3456/api";

export const useUserStore = defineStore("users", {
  state: () => ({
    users: [],
    currentUser: {},
    isAuthenticated: false,
    isAdmin: false,
  }),

  getters: {
    getCurrentUser: (state) => state.currentUser,
    allUsers: (state) => state.users,
    getAuthenticated: (state) => state.isAuthenticated,
  },

  actions: {
  

    async addCurentUser(userData) {
      console.log( "userData", userData);
      this.currentUser = userData.user; // User details from the response
      this.token = userData.token;     // JWT token from the response
      this.isAuthenticated = true;
      this.isAdmin = userData.user.role === "Admin";
    },

    async login(credentials) {
      try {
        const response = await axios.post("/auth/login", credentials); // Gửi email và password
        if (response.status === 200) {
          await this.fetchUser();
        }
      } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        throw error;
      }
    },

    async fetchUser() {
      try {
        const response = await axios.get("/auth/verify");
        this.currentUser = response.data.user;
      } catch (error) {
        console.error(
          "Failed to fetch user:",
          error.response?.data || error.message
        );
        this.logout();
      }
    },

    async logout() {

        this.currentUser = {};
        this.isAuthenticated = false;
      },

    async fetchUsers() {
      try {
        const response = await axios.get("/user/");
        this.users = response.data;
      } catch (error) {
        console.error(
          "Error fetching users:",
          error.response?.data || error.message
        );
      }
    },

    async fetchUserById(userId) {
      try {
        const response = await axios.get(`/users/${userId}`);
        return response.data;
      } catch (error) {
        console.error(
          "Error fetching user by ID:",
          error.response?.data || error.message
        );
      }
    },
  },
});
