<template>
  <div class="container">
    <MainContents />
  </div>
</template>

<script>
import MainContents from '@/components/main/MainContents.vue'
export default {
  laytout: 'default',
  components: {
    MainContents,
  },
}
</script>

<style scoped>
.container {
  min-width: 1200px;
  margin: 0 auto;
}
</style>
