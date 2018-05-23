import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listQuestion: null,
    signlogin: true
  },
  mutations: {
    getlistQuestion ( state , payload ){
      state.listQuestion = payload
    },
    addQuestion (state, payload) {
      state.listQuestion.push(payload)
    },
    updateQuestion (state, payload){
      state.listQuestion[payload.index].title = payload.title
      state.listQuestion[payload.index].content = payload.content
      state.listQuestion[payload.index].updatedAt = payload.update
    },
    deleteQuestion (state, payload) {
      state.listQuestion.splice(payload, 1)
    },
    addVoteQuestion (state, payload){
      state.listQuestion[payload.index].upVote.push(payload.id)
    }
  },
  actions: {
    getlistQuestion: function ({ commit }) {
      axios.get(`https://apioverflow.thismylife.net/questions/`)
      .then(function(response) {
        commit('getlistQuestion',response.data.result)
      })
      .catch(function(err){
        swal('Error', err.response, 'error')
      })
    }
  }
})
