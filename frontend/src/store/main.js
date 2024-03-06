import { defineStore } from "pinia"

export const useAuthStore = defineStore('useAuthStore', {
    state: () => ({
      token: null,
      user: null,
      error: null,
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
      setNewLesson(lesson) {
        this.user.lessons.push(lesson)
      },
      setError(error) {
        this.error = error
      },
      clearAuthData() {
        this.token = null;
        this.user = null;
      },
    }
  }); 
  
  