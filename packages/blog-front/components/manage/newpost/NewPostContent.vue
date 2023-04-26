<template>
  <div>
    <textarea
      ref="editor"
      cols="30"
      rows="10"
      @keyup.enter="onSumbit"
    ></textarea>
    <!-- <Editor /> -->
    <button @click="onSumbit">Submit</button>
  </div>
</template>

<script>
import { groq } from '@nuxtjs/sanity'
// import Editor from '../../Editor.vue'

const query = groq`*[_type == "category"]`
export default {
  components: {
    // Editor,
  },
  methods: {
    async onSumbit() {
      const value = this.$refs.editor.value
      console.log(value)

      const response = await this.$sanity.fetch(query)
      console.log(response)
    },
  },
}
</script>

<style></style>
