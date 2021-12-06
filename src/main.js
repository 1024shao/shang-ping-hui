import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'
import TypeNav from '@/common/TypeNav'
import Carousel from '@/components/Carousel';
import '@/mock/mockServer'

// 引入样式文件
import 'swiper/css/swiper.css'

Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)


new Vue({
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  render: h => h(App)
}).$mount('#app')
