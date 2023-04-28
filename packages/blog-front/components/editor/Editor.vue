<template>
  <div v-if="editor">
    <input type="file" @change="addImage" />
    <editor-content :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
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
  },

  data() {
    return {
      editor: null,
    }
  },

  watch: {
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
    this.editor = new Editor({
      content: this.value,
      extensions: [StarterKit, Image],
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
