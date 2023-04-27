<template>
  <div>
    <NewPostHeader />
    <Nuxt />
    <Alert key="alert" />
  </div>
</template>

<script>
import NewPostHeader from '@/components/manage/newpost/NewPostHeader.vue'
import Alert from '@/components/alert/Alert.vue'
export default {
  components: { NewPostHeader, Alert },
  data() {
    return {}
  },
}
</script>

<style></style>
