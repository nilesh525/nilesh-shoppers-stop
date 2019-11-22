import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Itemdesc from '../views/Itemdesc.vue'
import about from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    component:about
  },
  {
    path: '/desc1',
    name: 'Itemdesc',
    props: true,
    component: Itemdesc
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
