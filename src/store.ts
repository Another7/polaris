import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      user: {
          isLogin: false,
          account: '',
          avatar: ''
      }
  },
  mutations: {
      login(state, payload) {
          state.user.isLogin = true;
          state.user.account = payload.account;
      }
  },
  actions: {

  }
})
