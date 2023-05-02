<template>
  <main>
    <LatestPosts />
    <AllPosts />
  </main>
</template>

<script>
import { mapMutations } from 'Vuex'
import AllPosts from '@/components/main/contents/AllPosts.vue'
import LatestPosts from '@/components/main/contents/LatestPosts.vue'
export default {
  components: { LatestPosts, AllPosts },
  async fetch({ store }) {
    await store.dispatch('getRecentPosts')
  },
  mounted() {
    this.$store.dispatch('getUserInfo', this.$store.state.userId)
  },
  methods: {
    ...mapMutations({
      setUserId: 'setUserId',
    }),
  },
}
</script>

<style lang="scss">
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
}
</style>
