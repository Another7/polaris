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
import Creator from "@/views/creator/Creator.vue";
import Index from "@/views/creator/Index.vue";
import PublishWorks from "@/views/creator/PublishWorks.vue";
import Administrator from "@/views/administrator/Administrator.vue";
import MyAlbum from "@/views/creator/MyAlbum.vue";
import SearchResult from "@/views/SearchResult.vue";
import PersonInfo from "@/views/PersonInfo.vue";

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
                        },
                        {
                            path: '/personInfo',
                            name: 'personInfo',
                            component: PersonInfo
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
                },
                {
                    path: '/searchResult',
                    name: 'searchResult',
                    component: SearchResult
                }
            ]
        },
        {
            path: '/creator',
            name: 'creator',
            component: Creator,
            redirect: 'index',
            children: [
                {
                    path: '/index',
                    name: 'index',
                    component: Index
                },
                {
                    path: '/publishWorks',
                    name: 'publishWorks',
                    component: PublishWorks
                },
                {
                    path: '/myAlbum',
                    name: 'myAlbum',
                    component: MyAlbum
                }
            ]
        },
        {
            path: '/administrator',
            name: 'administrator',
            component: Administrator
        }
    ]
})
