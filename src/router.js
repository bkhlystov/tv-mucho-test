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

    {
        path: '/users',
        name: 'users',
        component: () => import('./views/list.vue'),
    },
    {
        path: '/users/:user_id',
        name: 'user',
        component: () => import('./views/user.vue'),
        props: route => ({user_id: route.params.user_id}),
    },
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
