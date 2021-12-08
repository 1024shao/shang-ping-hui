import { requestCartList } from '@/api'
import { getNanoId } from '@/utils/nanoid_token'
const state = {
  cartList: [],
  nanoId: getNanoId()
}
const mutations = {
  GETCARTLIST(state, value) {
    state.cartList = value
  }
}
const actions = {
  async getCartList({ commit }) {
    let result = await requestCartList()
    if (result.code === 200) {
      commit('GETCARTLIST', result.data[0].cartInfoList)
    }
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}