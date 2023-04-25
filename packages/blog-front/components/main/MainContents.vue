<template>
  <main>
    <LatestPosts />
  </main>
</template>

<script>
import LatestPosts from './contents/LatestPosts.vue'
export default {
  components: { LatestPosts },
}
</script>

<style>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
