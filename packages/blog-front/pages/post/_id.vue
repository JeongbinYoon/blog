<template>
  <div class="post">
    <PostParticipants />
    <PostContent />
    <PostAnchor />
  </div>
</template>

<script>
import { mapMutations } from 'Vuex'
import PostParticipants from '@/components/post/PostParticipants.vue'
import PostContent from '@/components/post/PostContent.vue'
import PostAnchor from '@/components/post/PostAnchor.vue'

export default {
  components: {
    PostParticipants,
    PostContent,
    PostAnchor,
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
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: $max_width_pc;
  margin: 0 auto;
  margin-top: 40px;
}
</style>
