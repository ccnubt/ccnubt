import Vue from 'vue'
import Router from 'vue-router'
import Manger from '@/components/manger/Manger'
import User from '@/components/manger/User'
import Reservation from '@/components/manger/Reservation'
import Activity from '@/components/manger/Activity'
import Login from '@/components/Login'
import Summary from '@/components/manger/Summary'
import store from '@/store'
import NewAdmin from '@/components/NewAdmin'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/newadmin',
      component: NewAdmin
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
        }, {
          path: 'activity/',
          component: Activity
        },{
          path: 'summary/',
          component: Summary
        }
      ]
    }
  ]
})

router.beforeEach(function(to,from,next){
  if (to.path == "/" || to.path=='/newadmin')
    next()
  else if (store.getters.GET_API_KEY)
    next()
  else
    next("/")
})


export default router
