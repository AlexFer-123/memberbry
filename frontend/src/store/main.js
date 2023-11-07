import { defineStore } from "pinia"

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
      token: null,
      user: null,
    }),
    getters: {
      isAuthenticated: (state) => !!state.token,
    },
    actions: {
      login(token, user) {
        this.token = token;
        this.user = user;
      },
      logout() {
        this.token = null;
        this.user = null;
      },
    },
  }); 
  
  