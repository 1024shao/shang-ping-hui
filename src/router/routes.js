import Home from '../views/Home'
export default [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home, meta: { show: true } },
  {
    //   params传递参数需要路由进行占位符   /:name   /:name 表示可以传递也可以不传
    path: '/search/:keyword?',
    name: 'search',
    component: () => import('@/views/Search'),
    meta: { show: true },
    props: ($route) => ({ keyword: $route.params.keyword })
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
    meta: { show: false }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register'),
    meta: { show: false }
  },
  {
    path: '/detail/:goodId',
    name: "detail",
    component: () => import('@/views/Detail'),
    meta: { show: true }
  },
  {
    path: '/addcartsuccess',
    name: "addcartsuccess",
    component: () => import('@/views/AddCartSuccess'),
    meta: { show: true },
  },
  {
    path: '/shopcart',
    name: "shopcart",
    component: () => import('@/views/ShopCart'),
    meta: { show: true },
    // beforeEnter: (to, from, next) => {
    //   if (from.path == '/search') next()
    //   else next(from.path)
    // }
  },
  {
    path: '/trade',
    name: "trade",
    component: () => import('@/views/Trade'),
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path == '/shopcart') next()
      else {
        next(from.path)
      }
    }
  },
  {
    path: '/pay',
    name: "pay",
    component: () => import('@/views/Pay'),
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path == '/trade') next()
      else {
        next(from.path)
      }
    }
  },
  {
    path: '/paysuccess',
    name: "paysuccess",
    component: () => import('@/views/PaySuccess'),
    meta: { show: true },
    // 路由独享守卫
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