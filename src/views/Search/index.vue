<template>
  <div>
    <h2>{{$route.params.keyword}}----{{keyword}}</h2>
  </div>
</template>

<script>
export default {
  props: ['keyword']
}
</script>

<style lang="less" scoped>
</style>