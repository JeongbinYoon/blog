<template>
  <div class="post">
    <PostParticipants />
    <PostContent />
    <PostAnchor />
  </div>
</template>

<script>
import PostParticipants from './PostParticipants.vue'
import PostContent from './PostContent.vue'
import PostAnchor from './PostAnchor.vue'
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
  justify-content: center;
  width: 100%;
  max-width: $max_width_pc;
  margin: 0 auto;
  margin-top: 40px;
}
</style>
