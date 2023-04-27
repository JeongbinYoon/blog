<template>
  <div>
    <MainHeader />
    <Nuxt />
    <MainFooter />
    <Alert key="alert" />
  </div>
</template>

<script>
import MainHeader from '@/components/main/MainHeader.vue'
import MainFooter from '@/components/main/MainFooter.vue'
import Alert from '@/components/alert/Alert.vue'
export default {
  components: { MainHeader, MainFooter, Alert },
}
</script>

<style></style>
