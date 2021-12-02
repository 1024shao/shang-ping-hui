import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home'
Vue.use(VueRouter);

export const router = new VueRouter({
  base: '/',
  mode: 'history',
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/search', component: () => import('../views/Search') },
    { path: '/login', component: () => import('../views/Login') },
    { path: '/register', component: () => import('../views/Register') },
  ]
});