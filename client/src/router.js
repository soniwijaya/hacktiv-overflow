import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Addquestion from './views/Addquestion.vue'
import Detailquestion from './views/Detailquestion.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/detailquestion/:id',
      name: 'detailquestion',
      component: Detailquestion
    },
    {
      path: '/addquestion',
      name: 'addquestion',
      component: Addquestion
    }
  ]
})
