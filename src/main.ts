import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/icon/font_1711880_1gfgdgg94vqi.js'


Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
let environment = 'dev';
switch (environment) {
    case 'dev':
        axios.defaults.baseURL = 'http://localhost:8989';
        break;
    case 'test':
        axios.defaults.baseURL = 'http://www.another.ren:8989';
        break;
    case 'prod':
        break;
    default:
        break;
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
