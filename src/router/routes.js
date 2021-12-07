import Home from '../views/Home'
export default [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home, meta: { show: true } },
  {
    name: 'search',
    //   params传递参数需要路由进行占位符   /:name   /:name 表示可以传递也可以不传
    path: '/search/:keyword?',
    component: () => import('@/views/Search'),
    meta: { show: true },
    props: ($route) => ({ keyword: $route.params.keyword })
  },
  {
    path: '/login',
    component: () => import('@/views/Login'),
    meta: { show: false }
  },
  {
    path: '/register',
    component: () => import('@/views/Register'),
    meta: { show: false }
  },
  {
    path: '/detail/:goodId',
    component: () => import('@/views/Detail'),
    meta: { show: true }
  }
]