import { defineStore } from "pinia"

export const useAuthStore = defineStore('useAuthStore', {
    state: () => ({
      token: null,
      user: null,
    }),
    getters: {
      isAuthenticated: (state) => !!state.token,
    },
    actions: {
      setToken(token) {
        this.token = token;
      },
  
      setUser(user) {
        this.user = user;
      },
  
      clearAuthData() {
        this.token = null;
        this.user = null;
      },
    }
  }); 
  
  