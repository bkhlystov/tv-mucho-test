import Vue from 'vue';
import Vuex from 'vuex';
import VueLoading from 'vuex-loading'
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import './element-theme.scss'

import App from './App';
import router from './router';


Vue.use(VueLoading);

//Add Vuex
Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(ElementUI, {locale});
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