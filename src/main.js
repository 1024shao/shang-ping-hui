import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as API from '@/api'
import VueLazyload from 'vue-lazyload'

import TypeNav from '@/common/TypeNav'
import Carousel from '@/components/Carousel';
import Pagination from '@/components/Pagination';
import '@/mock/mockServer'
import loading from '@/assets/loading.gif'
// 引入样式文件
import 'swiper/css/swiper.css'

Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.use(VueLazyload, {
  loading
})
import '@/plugins/validate'
// 统一api接口全部存在Vue的原型上
import { MessageBox } from 'element-ui'
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
new Vue({
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  render: h => h(App)
}).$mount('#app')
