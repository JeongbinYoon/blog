<template>
  <div v-if="isMounted">
    <input v-if="editable" type="file" @change="addImage" />
    <editor-content :editor="editor" />
  </div>
  <div v-else>
    <span>LOADING...</span>
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import StarterKit from '@tiptap/starter-kit'
import { client } from '@/api'

export default {
  components: {
    EditorContent,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    editable: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      editor: null,
      isMounted: false,
    }
  },

  watch: {
    editable(value) {
      this.editor?.setOptions?.({
        editable: value,
      })
    },
    value(value) {
      // HTML
      const isSame = this.editor.getHTML() === value

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
    },
  },

  mounted() {
    const _vm = this
    this.editor = new Editor({
      content: this.value,
      extensions: [
        StarterKit,
        Image,
        Placeholder.configure({
          // Use a placeholder:
          placeholder: 'Write something …',
          // Use different placeholders depending on the node type:
          // placeholder: ({ node }) => {
          //   if (node.type.name === 'heading') {
          //     return 'What’s the title?'
          //   }

          //   return 'Can you add some further context?'
          // },
        }),
      ],
      onCreate(props) {
        _vm.isMounted = true
      },
      editable: this.editable,
      onUpdate: () => {
        // HTML
        this.$emit('input', this.editor.getHTML())

        // JSON
        // this.$emit('input', this.editor.getJSON())
      },
    })
  },

  beforeDestroy() {
    this.editor.destroy()
  },

  methods: {
    async addImage(e) {
      const file = e.target.files[0]
      let url = ''
      if (file !== null) {
        const fileData = await client.assets.upload('image', file)
        url = fileData.url
        console.log(url)
      }
      if (url !== '') {
        this.editor.chain().focus().setImage({ src: url }).run()
        this.$emit('addImage', url)
      }
    },
  },
}
</script>
<style lang="scss">
.ProseMirror:focus {
  outline: none;
}
img {
  max-width: 100%;
}

/* Placeholder (on every new line) */
.ProseMirror p.is-empty::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}
</style>
