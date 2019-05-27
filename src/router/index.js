import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/Index.vue'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Find from '../views/Find.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Favorites from '../views/home/Favorites.vue'
import Sites from '../views/home/Sites.vue'
import AddSite from '../views/home/AddSite.vue'
import UpdatePassword from '../views/user/UpdatePassword.vue'
import UpdateUser from '../views/user/UpdateUser.vue'

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
      component: Index,
      
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/',
          redirect: '/home/favorites'
        },
        {
          path: '/home/favorites',
          name:'favorites',
          component: Favorites,
        },
        {
          path: '/home/sites',
          name:'sites',
          component: Sites,
        },
        {
          path: '/home/addSite',
          name:'addSite',
          component: AddSite,
        },
      ]
      
    },
    {
      path: '/signin',
      name: 'signin',
      component: Login
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      children: [
        {
          path: '/',
          redirect: '/home/updatePassword'
        },
        {
          path: '/home/updatePassword',
          name:'updatePassword',
          component: UpdatePassword,
        },
        {
          path: '/home/updateUser',
          name:'updateUser',
          component: UpdateUser,
        },
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/find',
      name: 'find',
      component: Find
    },

  ]
})
