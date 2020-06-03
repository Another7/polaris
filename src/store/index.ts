import {user} from "@/store/modules/user";
import {singer} from "@/store/modules/singer";
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: user,
        singer: singer
    },
    mutations: {
        login(state, payload) {
            state.user.isLogin = true;
            state.user.account = payload.account;
            state.user.avatar = payload.avatar;
            state.user.nickName = payload.nickName;
            state.user.id = payload.id;
        },
        updateAvatar(state, payload) {
            state.user.avatar = payload.avatar;
        },
        passAuthentication(state, singer) {
            state.singer.authentication = singer.authentication;
            state.singer.isLogin = true;
            state.singer.account = singer.email;
            state.singer.id = singer.id;
            state.singer.nickName = singer.nickName;
        },
        loginOut(state) {
            state.user.isLogin = false;
            state.user.account = '';
            state.user.avatar = '';
            state.user.nickName = '';
            state.user.id = 0;
        }
    },
    actions: {}
})

