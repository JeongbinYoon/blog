<template>
  <div class="new-post">
    <Editor v-model="postTitle" class="new-post__editor editor-title" />
    <Editor v-model="postContent" class="new-post__editor editor-content" />

    <div class="new-post__preview">
      <span style="color: #999">Preview</span>
      <pre><code>{{ postTitle }}</code></pre>
      <pre><code>{{ postContent }}</code></pre>
    </div>

    <button @click="onSubmit">Submit</button>
  </div>
</template>

<script>
import { createClient } from '@sanity/client'
import Editor from '@/components/editor/Editor.vue'
export default {
  components: {
    Editor,
  },
  layout: 'newpost',
  data() {
    return {
      postTitle: 'Enter the title',
      postContent:
        '<p>A Vue.js wrapper component for tiptap to use <code>v-model</code>.</p>',
    }
  },
  methods: {
    onSubmit() {
      const client = createClient({
        projectId: 'lyvfm7vk',
        dataset: 'production',
        useCdn: false,
        withCredentials: true,
      })
      const doc = {
        _type: 'post',
        author: 'jeongbin',
        title: this.postTitle,
        body: [
          {
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'document', text: this.postContent }],
          },
        ],
      }
      client
        .create(doc)
        .then((response) => {
          console.log(response)
          $nuxt.$emit('alert', {
            info: 'info',
            description: '글 생성 완료',
            type: '알림',
            callback: () => this.$router.push(`/post/${response._id}`),
          })
        })
        .catch((error) => console.error('Error creating document:', error))
    },
  },
}
</script>

<style lang="scss">
.new-post {
  width: 90%;
  max-width: 700px;
  margin: 0 auto;
  &__editor {
    ul,
    ol {
      padding-left: 40px;
      margin: 16px 0;
    }
    .ProseMirror {
      &:focus {
        outline: none;
      }
    }

    &.editor-title {
      font-size: $font_size_huge;
      font-weight: 700;
    }
  }
  &__preview {
    padding: 1rem 0 0;

    h3 {
      margin: 1rem 0 0.5rem;
    }

    pre {
      border-radius: 5px;
      color: #333;
    }

    code {
      display: block;
      white-space: pre-wrap;
      font-size: 0.8rem;
      padding: 0.75rem 1rem;
      background-color: #e9ecef;
      color: #495057;
    }
  }
}
</style>
