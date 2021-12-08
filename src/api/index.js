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
// 请求detail数据
export const requestDetailList = skuId => request({ url: `item/${skuId}`, method: "get" })
// 将商品添加到购物车/对已有数据进行修改 /api/cart/addToCart/{ skuId }/{ skuNum }   方式: post
export const requestAddToShopCar = (skuId, skuNum) =>
  request({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
// 请求购物车数据
export const requestCartList = () => request({ url: '/cart/cartList', method: 'get' })