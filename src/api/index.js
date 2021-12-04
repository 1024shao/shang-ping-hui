import request from "./request";

// 请求分类据列表
export const requestCategoryList = () =>
  request({ url: '/product/getBaseCategoryList', methods: 'get' })
