// 登录和注册模块
import { requestPhoneCode, requestUserRegister } from '@/api'
const state = {
  code: ''
}
const mutations = {
  GETCODE(state, code) {
    state.code = code
  }
}
const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    let result = await requestPhoneCode(phone)
    if (result.code == 200) {
      commit('GETCODE', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('error'))
    }
  },
}
const getters = {}


export default {
  state,
  actions,
  mutations,
  getters
}