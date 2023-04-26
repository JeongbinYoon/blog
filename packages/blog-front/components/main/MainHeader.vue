<template>
  <header class="main-header">
    <h1>logo</h1>
    <MainNavigation />
  </header>
</template>

<script>
import MainNavigation from './MainNavigation.vue'
export default {
  components: {
    MainNavigation,
  },
}
</script>

<style lang="scss" scoped>
.main-header {
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background: #000;
  color: #fff;
}
</style>
