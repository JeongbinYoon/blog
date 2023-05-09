<template>
  <div class="post">
    <PostContent />
  </div>
</template>

<script>
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
}
</script>

<style lang="scss" scoped>
.post {
  margin-top: 40px;
}
</style>
