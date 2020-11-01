import Vue from 'vue'
import VueRouter from 'vue-router'
import {auth} from '@/firebase'
import Home from "@/views/Home";
import Login from "@/views/Login";
import PasswordReset from "@/views/PasswordReset";
import UpdateProfile from "@/views/UpdateProfile";

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/reset-password',
        name: 'reset-password',
        component: PasswordReset
    },
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/update-profile',
        name: 'update-profile',
        component: UpdateProfile,
        meta: {
            requiresAuth: true
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// route auth check
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
    if (requiresAuth && !auth.currentUser) {
        next('/login')
    } else {
        next()
    }
})

export default router
