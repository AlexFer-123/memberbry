import { router } from '@/router/index';
import { reactive } from 'vue';

const auth = reactive({})

export const userAuthenticate = () => {
    router.beforeEach((to, from, next) => {
        if (to.matched.some(record => record.meta.requiresAuth)) {
            const token = localStorage.getItem('authMembry');
            console.log(auth)
            if (token) {
                next()
            }
        } else {
            next('/')
        }
    })
}