import Vue from 'vue'
import Router from 'vue-router'
import Manger from '@/components/Manger'
import User from '@/components/User'
import Reservation from '@/components/Reservation'
import Login from '@/components/Login'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/manger',
      component: Manger,
      children:[
        {
          path: '',
          component: User
        },
        {
          path: 'user/',
          component: User
        },{
          path: 'reservation/',
          component: Reservation
        }
      ]
    }
  ]
})

router.beforeEach(function(to,from,next){
  if (to.path == "/")
    next()
  else if (store.getters.GET_API_KEY)
    next()
  else
    next("/")
})


export default router
