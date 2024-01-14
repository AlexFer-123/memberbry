import { router } from '@/router/index';

export const userAuthenticate = () => {
    router.beforeEach((to, from, next) => {
        console.log(to)
        if (to.matched.some(record => record.meta.requiresAuth)) {
            const token = localStorage.getItem('authMembry');
            if (token) {
                next()
            }
        } else {
            next('/')
        }
    })
}