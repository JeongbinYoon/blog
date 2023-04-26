<template>
  <div>
    <div class="editor">
      <Editor />
    </div>
    <button @click="onSumbit">Submit</button>
  </div>
</template>

<script>
// import { groq } from '@nuxtjs/sanity'
import Editor from '@/components/Editor/index.vue'

// const query = groq`*[_type == "category"]`
export default {
  components: {
    Editor,
  },
  methods: {
    async onSumbit() {
      // const response = await this.$sanity.fetch(query)
      // console.log(response)
    },
  },
}
</script>

<style scoped lang="scss">
.editor {
  padding: 2rem;
  p:focus {
    outline: none;
  }
  div:focus {
    outline: none;
  }
}
</style>
