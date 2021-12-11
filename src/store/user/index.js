// 登录和注册模块
import { requestPhoneCode, requestUserLogin, requestUserInfo } from '@/api'
const state = {
  code: '',
  token: localStorage.getItem('token'),
  userInfo: {}
}
const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  }
}
const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    let result = await requestPhoneCode(phone)
    console.log(result)
    if (result.code == 200) {
      commit('GETCODE', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('error'))
    }
  },
  // 用户登录
  async userLogin({ commit }, data) {
    let result = await requestUserLogin(data)
    if (result.code == 200) {
      commit('USERLOGIN', result.data.token)
      window.localStorage.setItem('token', result.data.token)
    }
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    let result = await requestUserInfo()
    console.log(result)
    if (result.code == 200) {
      commit('GETUSERINFO', result.data)
    }
  }
}
const getters = {}


export default {
  state,
  actions,
  mutations,
  getters
}