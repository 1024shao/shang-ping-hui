<template>
  <div id="app">
    <Header />
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
  background: rgba(180, 35, 35, 0.35);
  transition: color 0.2s ease;
}
</style>
