<template>
  <div>
    <TypeNav />
    <ListContainer />
    <TodayRecommend />
    <Rank />
  </div>
</template>

<script>
import ListContainer from './ListContainer'
import TodayRecommend from './TodayRecommend'
import Rank from './Rank'
export default {
  name: 'Home',
  components: {
    ListContainer,
    TodayRecommend,
    Rank
  }
}
</script>

<style lang="less" scoped>
</style>