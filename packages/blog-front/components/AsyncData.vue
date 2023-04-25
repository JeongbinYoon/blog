<!-- Please remove this file from your project -->
<template>
  <div>
    <!-- <ul v-for="category in categories" :key="category._id">
      {{ category }}
    </ul> -->
  </div>
</template>

<script>
import { groq } from '@nuxtjs/sanity'
import { defineComponent } from 'vue'
const query = groq`*[_type == "category"]`
export default defineComponent({
  async mounted() {
    const response = await this.$sanity.fetch(query)
    console.log(response)
    console.log(this.$sanity)
  },
  data: () => ({ title: '' }),
})
</script>
// blog // directory // - front // - backend // blog-front // blog-backend
