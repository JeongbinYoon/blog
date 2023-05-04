<template>
  <div class="post">
    <PostContent />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import PostContent from '@/components/post/PostContent.vue'

export default {
  components: {
    PostContent,
  },
  layout: 'default',

  async fetch({ params, store, redirect }) {
    const { id } = params
    const result = await store.dispatch('getCurrentPost', id)
    if (!result) {
      return redirect('/')
    }
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

<style lang="scss" scoped>
.post {
  margin-top: 40px;
}
</style>
