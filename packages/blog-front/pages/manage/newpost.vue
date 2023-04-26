<template>
  <div>
    <Editor v-model="content" class="editor" />

    <div class="content">
      <pre><code>{{ content }}</code></pre>
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

  data() {
    return {
      content:
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
        id: 'ccccc',
        title: 'My awesome blog post',
        body: [
          {
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'document', text: this.content }],
          },
        ],
      }
      client
        .create(doc)
        .then((response) =>
          console.log(`Document was created, ID ${response._id}`)
        )
        .catch((error) => console.error('Error creating document:', error))

      console.log(this.content)
    },
  },
}
</script>

<style lang="scss">
.editor {
  padding: 20px;
  ul,
  ol {
    padding-left: 40px;
    margin: 16px 0;
  }
}

.ProseMirror {
  padding: 20px;
}

.content {
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
</style>
