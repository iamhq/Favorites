import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/user.vue'
import Login from '../views/components/common/login.vue'



Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: 'index'
    },
    {
      path: '/index',
      name: 'index',
      component: Home
    },
    {
      path: '/signin',
      name: 'signin',
      component: Login
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
   
  ]
})
