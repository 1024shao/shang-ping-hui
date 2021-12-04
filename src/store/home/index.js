import { requestCategoryList, requestFloorList } from '@/api'
const state = {
  categoryList: [],
  floorList: []
}

const mutations = {
  CATEGORYLIST(state, value) {
    state.categoryList = value
  },
  GETFLOORLIST(state, value) {
    state.floorList = value
  }
}

const actions = {
  async getCategoryList({ commit }) {
    let result = await requestCategoryList()
    if (result.code == '200') {
      const list = result.data
      list.pop()
      commit("CATEGORYLIST", list)
    }
  },
  async getFloorList({ commit }) {
    let result = await requestFloorList()
    if (result.code == 200) {
      commit('GETFLOORLIST', result.data)
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
