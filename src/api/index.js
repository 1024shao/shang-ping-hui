import request from "./request";
import mockRequest from './mockAjax'
// 请求分类据列表
export const requestCategoryList = () => request({ url: '/product/getBaseCategoryList', methods: 'get' })

// 请求banner数据
export const requestBannerList = () => mockRequest({ url: '/banner', method: 'get' })