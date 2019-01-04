import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    api_key: ''
  },
  getters:{
    GET_API_KEY: function (state) {
      if (window.localStorage){
        state.api_key = window.localStorage.getItem('api_key') || null
      }
      return state.api_key
    }
  },
  mutations:{
    SET_API_KEY: function (state,value) {
      if (window.localStorage)
        window.localStorage.setItem('api_key', value)
    }
  }
})

