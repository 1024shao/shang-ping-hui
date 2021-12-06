import request from "./request";
import mockRequest from './mockAjax'
// 请求分类据列表
export const requestCategoryList = () => request({ url: '/product/getBaseCategoryList', methods: 'get' })
// 请求banner数据
export const requestBannerList = () => mockRequest({ url: '/banner', method: 'get' })
// 请求floor数据
export const requestFloorList = () => mockRequest({ url: '/floor', method: 'get' })
// 请求search数据
export const requestSearchList = params => request({
  url: '/list',
  method: 'post',
  data: params
})