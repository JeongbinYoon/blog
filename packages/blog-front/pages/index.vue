<template>
  <main>
    <LatestPosts />
    <AllPosts />
  </main>
</template>

<script>
import AllPosts from '@/components/main/contents/AllPosts.vue'
import LatestPosts from '@/components/main/contents/LatestPosts.vue'
export default {
  components: { LatestPosts, AllPosts },
}
</script>

<style lang="scss">
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
