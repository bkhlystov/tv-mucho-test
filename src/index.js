import Vue from 'vue';
import Vuex from 'vuex';

import App from './App';
import router from './router';

import VueLoading from 'vuex-loading'
Vue.use(VueLoading);

// Add Vee validate
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

//Add Vuex
Vue.config.productionTip = false;
Vue.use(Vuex);
import createLogger from 'vuex/dist/logger'
import users from './store/users.js';

//Store registration Vuex
const store = new Vuex.Store({
    modules: {
        users
    },
    plugins: [createLogger()]
});

document.addEventListener('DOMContentLoaded', function (event) {
    const mountPoint = document.getElementById('app');

    new Vue({
        router,
        store,
        vueLoading: new VueLoading({registerComponents: false, useVuex: true}),
        render: h => h(App),
    }).$mount(mountPoint);
});