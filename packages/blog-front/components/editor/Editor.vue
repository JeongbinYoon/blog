<template>
  <div v-if="isMounted" class="editor">
    <input v-if="editable" type="file" @change="addImage" />
    <editor-content :editor="editor" />
  </div>
  <div v-else>
    <span>LOADING...</span>
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import BaseHeading from '@tiptap/extension-heading'
import { mergeAttributes } from '@tiptap/core'
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
        injectCSS,
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
    const classes = {
      1: 'text-4xl',
      2: 'text-3xl',
      3: 'text-2xl',
      4: 'text-1xl',
    }

    const Heading = BaseHeading.configure({ levels: [1, 2, 3] }).extend({
      renderHTML({ node, HTMLAttributes }) {
        const hasLevel = this.options.levels.includes(node.attrs.level)
        const level = hasLevel ? node.attrs.level : this.options.levels[0]

        return [
          `h${level}`,
          mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
            class: `${classes[level] ?? ''}`,
          }),
          0,
        ]
      },
    })

    this.editor = new Editor({
      injectCSS: true,
      content: this.value,
      extensions: [
        StarterKit,
        Image,
        Heading,
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
.ProseMirror {
  // background-color: blue;
  ul,
  ol {
    padding-left: 40px;
    margin: 16px 0;
  }
}

ul {
  margin: 16px 0;
  padding-left: 40px;
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
