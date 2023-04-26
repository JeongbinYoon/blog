<template>
  <div class="post">
    <PostParticipants />
    <PostContent />
    <PostAnchor />
  </div>
</template>

<script>
import PostParticipants from '../components/post/PostParticipants.vue'
import PostContent from '../components/post/PostContent.vue'
import PostAnchor from '../components/post/PostAnchor.vue'
export default {
  laytout: 'default',
  components: {
    PostParticipants,
    PostContent,
    PostAnchor,
  },
}
</script>

<style lang="scss" scoped>
.post {
  display: flex;
  width: 100%;
  max-width: $max_width_pc;
  margin: 0 auto;
  margin-top: 40px;
}
</style>
