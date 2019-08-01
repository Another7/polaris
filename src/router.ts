import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from "@/views/MainLayout.vue";

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'mainLayout',
            component: MainLayout
        }
    ]
})
