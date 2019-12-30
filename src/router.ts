import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from "@/views/MainLayout.vue";
import DiscoverMusic from "@/views/DiscoverMusic.vue";
import Recommend from "@/components/Recommend.vue";
import SheetDetail from "@/views/SheetDetail.vue";
import MyMusic from "@/views/MyMusic.vue";
import Friend from "@/views/Friend.vue";
import Ranking from "@/views/Ranking.vue";
import Sheet from "@/views/Sheet.vue";
import Singer from "@/views/Singer.vue";
import NewMusic from "@/views/NewMusic.vue";
import Home from "@/views/Home.vue";

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'mainLayout',
            component: MainLayout,
            redirect: '/discoverMusic',
            // 一级标题匹配的路由
            children: [
                {
                    path: '/discoverMusic',
                    name: 'discoverMusic',
                    component: DiscoverMusic,
                    redirect: '/recommend',
                    children: [
                        {
                            path: '/recommend',
                            name: 'recommend',
                            component: Recommend
                        },
                        {
                            path: '/ranking',
                            name: 'ranking',
                            component: Ranking
                        },
                        {
                            path: '/sheet',
                            name: 'sheet',
                            component: Sheet
                        },
                        {
                            path: '/singer',
                            name: 'singer',
                            component: Singer
                        },
                        {
                            path: '/newMusic',
                            name: 'newMusic',
                            component: NewMusic
                        },
                        {
                            path: '/sheetDetail',
                            name: 'sheetDetail',
                            component: SheetDetail
                        },
                        {
                            path: '/home',
                            name: 'home',
                            component: Home
                        }
                    ]
                },
                {
                    path: '/myMusic',
                    name: 'myMusic',
                    component: MyMusic
                },
                {
                    path: '/friend',
                    name: 'friend',
                    component: Friend
                }
            ]
        }
    ]
})
