import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes'
Vue.use(VueRouter);

// 重写push方法
let originPush = VueRouter.prototype.push

VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}
// 重写replace方法
let originReplace = VueRouter.prototype.replace

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}

export const router = new VueRouter({
  base: '/',
  mode: 'history',
  routes,
  // 控制路由跳转时,滚轮所在位置
  scrollBehavior() {
    return { y: 0 }
  }
});