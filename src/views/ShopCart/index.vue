<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <h2 class="h2" v-show="cartList.length==0">购物车空空如也~~</h2>
      <div class="cart-body">
        <ul class="cart-list" v-for="(item,index) in cartList" :key="item.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked='item.isChecked' @change='updateChecked(item.skuId,item.isChecked)'>
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl">
            <div class="item-msg">{{item.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{item.cartPrice}}.00</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="updateGoodsNum('sub',-1,item)">-</a>
            <input autocomplete="off" type="text" :value="item.skuNum" class="itxt" @change="updateGoodsNum('change',$event.target.value*1,item,index)">
            <a class="plus" @click="updateGoodsNum('add',1,item)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{item.cartPrice * item.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteGoods(item.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked='isAllChecked' @click="switchAllChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllIsCheckedGoods">删除选中的商品</a>
        <a>移到我的关注</a>
        <a>清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="goTrade">结算</a>
        </div>
      </div>
    </div>
    <IsLoading v-show="isSend" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { requestAddToShopCar, requestDeleteGoods, requestSwitchChecked } from '@/api'
import throttle from 'lodash/throttle'
export default {
  name: 'ShopCart',
  data() {
    return {
      isSend: false //加载动画
    }
  },
  created() {
    this.$store.dispatch('getCartList')
  },
  computed: {
    ...mapState({
      cartList: state => state.shopcart.cartList
    }),
    // 计算总价
    totalPrice() {
      let result = 0
      this.cartList.forEach(item => {
        if (item.isChecked == '1') {
          result += item.skuNum * item.skuPrice
        }
      })
      return result + '￥'
    },

    // 判断是否全选
    isAllChecked() {
      if (!this.cartList.length) return false
      return this.cartList.every(item => item.isChecked == 1)
    },
  },
  methods: {
    // 修改商品个数
    updateGoodsNum: throttle(async function (type, num, goods, index) {
      let updateNum = 0
      switch (type) {
        case 'add':
          updateNum = 1
          break;
        case 'sub':
          updateNum = goods.skuNum > 1 ? -1 : 0;
          break;
        default:
          if (isNaN(num) || num < 1) {
            updateNum = 0
          } else {
            updateNum = parseInt(num) - goods.skuNum
          }
          break;
      }
      this.isSend = true
      let result = await requestAddToShopCar(goods.skuId, updateNum)
      if (result.code == 200) this.isSend = false
      this.$store.dispatch('getCartList')
    }, 500),
    // 根据skuId删除某个购物车中的商品
    deleteGoods: throttle(async function (skuId) {
      this.isSend = true
      let result = await requestDeleteGoods(skuId)
      if (result.code == 200) {
        setTimeout(() => {
          this.isSend = false
          this.$store.dispatch('getCartList')
        }, 500)
      }
    }),
    // 修改产品的选中状态
    updateChecked: throttle(async function (skuId, isChecked) {
      this.isSend = true
      let flag = isChecked == 1 ? 0 : 1
      let result = await requestSwitchChecked(skuId, flag)
      if (result.code == 200) {
        this.isSend = false
      }
      this.$store.dispatch('getCartList')
    }, 1500),
    // 删除所有选中的产品
    deleteAllIsCheckedGoods: function () {
      this.cartList.forEach(item => {
        if (item.isChecked == 1) {
          requestDeleteGoods(item.skuId)
        }
      })
      this.$store.dispatch('getCartList')
    },
    // 切换 全选/全不选
    switchAllChecked: throttle(function (e) {
      let checked = e.target.checked == true ? 1 : 0
      this.isSend = true
      this.cartList.forEach(async item => {
        await requestSwitchChecked(item.skuId, checked)
      })
      setTimeout(() => {
        this.isSend = false
      }, 1500)
      this.$store.dispatch('getCartList')
    }, 2000),
    // 结算
    goTrade() {
      if (this.totalPrice === '0￥') {
        alert('当前购物车未添加任何商品')
      } else {
        this.$router.push('/trade')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;
  .h2 {
    margin: 20px;
    color: skyblue;
    text-align: center;
    font-size: 35px;
  }
  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
  a {
    cursor: pointer;
  }
}
</style>