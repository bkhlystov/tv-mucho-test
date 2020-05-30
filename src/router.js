import Vue from 'vue';
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: {
            name: "login"
        }
    },
    {
        path: "/login",
        name: "login",
        component: () => import('./views/login.vue'),
    },

    // {
    //     path: '/',
    //     name: 'main',
    //     component: () => import('./components/Main.vue'),
    // },
    // {
    //     path: '/content',
    //     name: 'content',
    //     component: () => import('./components/Main.vue'),
    // },
    {
        path: '*',
        redirect: {
            name: "login"
        }
    },
];

const router = new VueRouter({
    routes,
});

export default router;
