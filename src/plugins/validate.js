import VeeValidate from 'vee-validate'
import Vue from 'vue'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)

VeeValidate.Validator.localize('zh_CN', {
  messages: {
    ...zh_CN.messages,
    is: filed => `${filed}密码必须相同` //确认密码和密码一致
  },
  attributes: {
    phone: '手机号',
    code: '验证码',
    password: "密码",
    password1: '确认密码',
    agree: "协议"
  }
})
VeeValidate.Validator.extend('agree', {
  validate: value => value,
  getMessage: filed => `${filed}必须同意`
})