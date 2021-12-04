<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container" @mouseleave="leaveShow">
      <h2 class="all" @mouseenter="isShowNav = true">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition name="sort">
        <div class="sort" v-show="isShowNav">
          <div class="all-sort-list2">
            <div class="item bo" v-for="(c1,index) in categoryList" :key='c1.categoryId' :class="{active: currentIndex===index }" @mouseleave="defaultIndex" @click="goSearch">
              <h3 @mouseenter="changeIndex(index)">
                <a :data-categoryName='c1.categoryName' :data-category1id="c1.categoryId">{{c1.categoryName}}</a>
              </h3>
              <div class="item-list clearfix" v-show="currentIndex==index">
                <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                  <dl class="fore">
                    <dt>
                      <a :data-categoryName='c2.categoryName' :data-category2id="c2.categoryId">{{c2.categoryName}}</a>
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a :data-categoryName='c3.categoryName' :data-category3id="c3.categoryId">{{c3.categoryName}}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import throttle from 'lodash/throttle'
export default {
  name: 'TypeNav',
  data() {
    return {
      currentIndex: -1,
      isShowNav: true
    }
  },
  computed: {
    ...mapState({
      categoryList: state => state.home.categoryList
    })
  },
  mounted() {
    if (this.$route.path != '/home') {
      this.isShowNav = false
    }
  },
  methods: {
    changeIndex: throttle(function (index) {
      this.currentIndex = index
    }, 50),
    defaultIndex() {
      this.currentIndex = -1
    },
    // 时间委派跳转到search路由
    goSearch(e) {
      let element = e.target
      const { categoryname, category1id, category2id, category3id } = element.dataset
      console.log(element.dataset)
      if (categoryname) {
        // 准备跳转location对象
        const location = { name: 'search' }
        const query = { categoryName: categoryname }
        if (category1id) {
          query.categoryId = category1id
        } else if (category2id) {
          query.categoryId = category2id
        } else {
          query.categoryId = category3id
        }
        location.query = query
        console.log(location)
        this.$router.push(location)
      }
    },
    // 鼠标移除商品分类
    leaveShow() {
      if (this.$route.path != '/home') {
        this.isShowNav = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: block;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
.active {
  background-color: #c4d7f8;
}
.sort-enter {
  opacity: 0;
  background-color: slategray;
}
.sort-enter-to {
  background-color: snow;
  opacity: 1;
}
.sort-enter-active {
  transition: all 0.4s linear !important;
}
</style>