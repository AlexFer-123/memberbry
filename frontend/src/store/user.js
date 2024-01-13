import { defineStore } from "pinia"

export const useUserInfosStore = defineStore('useUserInfosStore',{
    state: () => ({
        email: null,
        name: null,
    }),
    actions: {
        setUser(user) {
            this.email = user.email,
            this.name = user.name
        }
    }
}); 
  
  