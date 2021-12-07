import { requestDetailList } from '@/api'
const state = {
  detailList: {}
}
const mutations = {
  GETDETAILLIST(state, value) {
    state.detailList = value
  }
}
const actions = {
  async getDetailList({ commit }, skuId) {
    const result = await requestDetailList(skuId)
    if (result.code == 200) {
      commit('GETDETAILLIST', result.data)
    }
  },
}
const getters = {
  categoryView(state) {
    return state.detailList.categoryView || {}
  },
  skuInfo(state) {
    return state.detailList.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.detailList.spuSaleAttrList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}