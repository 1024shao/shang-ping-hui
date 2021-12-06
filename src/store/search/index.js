import { requestSearchList } from '@/api'

const state = {
  searchInfo: {}
}

const mutations = {
  GETSEARCHINFO(state, value) {
    state.searchInfo = value
  }
}

const actions = {
  async getSearchInfo({ commit }, params = {}) {
    const result = await requestSearchList(params)
    console.log(result)
    if (result.code === 200) {
      commit('GETSEARCHINFO', result.data)
    }
  }
}

const getters = {
  // GETSEARCHINFO
  attrsList(state) {
    return state.searchInfo.attrsList || []
  },
  goodsList(state) {
    return state.searchInfo.goodsList || []
  },
  trademarkList(state) {
    return state.searchInfo.trademarkList || []
  }
}


export default {
  state,
  mutations,
  actions,
  getters
}
