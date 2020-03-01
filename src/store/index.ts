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
        }
    },
    actions: {}
})

