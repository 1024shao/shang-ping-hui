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
  },
  {
    path: '/addcartsuccess',
    name: "addcartsuccess",
    component: () => import('@/views/AddCartSuccess'),
    meta: { show: true }
  },
  {
    path: '/shopcart',
    name: "shopcart",
    component: () => import('@/views/ShopCart'),
    meta: { show: true }
  },
  {
    path: '/trade',
    name: "trade",
    component: () => import('@/views/Trade'),
    meta: { show: true }
  },
  {
    path: '/pay',
    name: "pay",
    component: () => import('@/views/Pay'),
    meta: { show: true }
  },
  {
    path: '/paysuccess',
    name: "paysuccess",
    component: () => import('@/views/PaySuccess'),
    meta: { show: true }
  },
  {
    path: '/center',
    name: "center",
    component: () => import('@/views/Center'),
    meta: { show: true },
    redirect: '/center/myorder',
    children: [
      {
        path: 'myorder',
        name: 'myorder',
        component: () => import('@/views/Center/myOrder')
      },
      {
        path: 'grouporder',
        name: 'grouporder',
        component: () => import('@/views/Center/groupOrder')
      },
    ]
  },
]