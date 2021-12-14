// 登录和注册模块
import {
  requestPhoneCode, requestUserLogin, requestUserInfo, requestLogout
} from '@/api'
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
  },
  CLEAR(state) {
    state.token = ''
    state.userInfo = {}
    window.localStorage.removeItem('token')
  }
}
const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    let result = await requestPhoneCode(phone)
    console.log(result)
    if (result.code == 200) {
      commit('GETCODE', result.data)
    }
  },
  // 用户登录
  async userLogin({ commit }, data) {
    let result = await requestUserLogin(data)
    if (result.code == 200) {
      commit('USERLOGIN', result.data.token)
      window.localStorage.setItem('token', result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('error'))
    }
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    let result = await requestUserInfo()
    if (result.code == 200) {
      commit('GETUSERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject('error')
    }

  },
  async logout({ commit }) {
    let result = await requestLogout()
    if (result.code == 200) {
      commit('CLEAR')
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