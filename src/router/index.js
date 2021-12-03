import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home'
Vue.use(VueRouter);

export const router = new VueRouter({
  base: '/',
  mode: 'history',
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home, meta: { show: true } },
    {
      name: 'search',
      path: '/search:keyword?',
      component: () => import('../views/Search'),
      meta: { show: true }
    },
    {
      path: '/login',
      component: () => import('../views/Login'),
      meta: { show: false }
    },
    {
      path: '/register',
      component: () => import('../views/Register'),
      meta: { show: false }
    }
  ]
});