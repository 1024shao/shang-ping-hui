<template>
  <div class="mask">
    <h2>正在加载中...</h2>
    <img src="@/assets/backloading2.gif" alt="">
  </div>
</template>

<script>
export default {
  name: 'IsLoading'
}
</script>

<style lang="less" scoped>
.mask {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: #2b2c30;
  opacity: 0.5;
  z-index: 1000;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>