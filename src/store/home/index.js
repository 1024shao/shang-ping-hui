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
      const list = result.data
      list.pop()
      commit("CATEGORYLIST", list)
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
