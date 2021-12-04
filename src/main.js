import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'
import TypeNav from '@/common/TypeNav'
import '@/mock/mockServer'

// 引入样式文件
import 'swiper/css/swiper.css'

Vue.component(TypeNav.name, TypeNav)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
