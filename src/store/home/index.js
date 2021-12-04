import { requestCategoryList } from '@/api'
const state = {
  categoryList: []
}

const mutations = {
  CATEGORYLIST(state, value) {
    state.categoryList = value
  }
}

const actions = {
  async getCategoryList({ commit }) {
    let result = await requestCategoryList()
    console.log(result)
    if (result.code == '200') {
      commit("CATEGORYLIST", result.data)
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
