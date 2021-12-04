<template>
  <div>
    <TypeNav />
    <ListContainer />
    <TodayRecommend />
    <Rank />
    <Like />
    <Floor v-for="floor in floorList" :key="floor.id" :list='floor' />
    <Brand />

  </div>
</template>

<script>
import { mapState } from 'vuex'
import ListContainer from './ListContainer'
import TodayRecommend from './TodayRecommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
export default {
  name: 'Home',
  computed: {
    ...mapState({
      floorList: state => state.home.floorList
    })
  },
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  created() {
    this.$store.dispatch('getFloorList')
  }
}
</script>

<style lang="less" scoped>
</style>