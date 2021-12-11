<template>
  <div id="app">
    <keep-alive>
      <Header />
    </keep-alive>
    <router-view></router-view>
    <Footer v-show="$route.meta.show" />
  </div>
</template>

<script>
import Header from '@/components/Header/index.vue';
import Footer from '@/components/Footer/index.vue';
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  created() {
    // 派发三级列表数据
    this.$store.dispatch('getCategoryList')
  },
}
</script>

<style>
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 0;
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 16px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  cursor: pointer;
  border-radius: 10px;
  background: rgba(23, 192, 235, 0.55);
  transition: color 0.2s ease;
}
</style>
