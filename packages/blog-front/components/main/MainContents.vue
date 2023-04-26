<template>
  <main>
    <LatestPosts />
    <AllPosts />
  </main>
</template>

<script>
import AllPosts from './contents/AllPosts.vue'
import LatestPosts from './contents/LatestPosts.vue'
export default {
  components: { LatestPosts, AllPosts },
}
</script>

<style>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
