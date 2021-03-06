import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
import store from '@/store'
import 'nprogress/nprogress.css'
const request = axios.create({
  baseURL: '/api',
  timeout: 5000
})

request.interceptors.request.use(config => {
  // 进行游客身份校验 nanoId
  if (store.state.shopcart.nanoId) {
    config.headers.userTempId = store.state.shopcart.nanoId
  }
  // 判断是否登录存在token
  if (window.localStorage.getItem('token')) {
    config.headers.token = window.localStorage.getItem('token')
  }
  nprogress.start()
  // 请求拦截器
  return config
})

request.interceptors.response.use(res => {

  nprogress.done()
  return res.data
}, err => {
  return new Promise.reject('fail' + err)
})


export default request