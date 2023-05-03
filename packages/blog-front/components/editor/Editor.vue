<template>
  <div v-if="isMounted">
    <div class="editor">
      <input v-if="editable" type="file" @change="addImage" />
      <editor-content :editor="editor" />
    </div>
    <div class="post-anchors">
      <ul class="anchors">
        <li v-for="(item, index) in headers" :key="index">
          {{ item.value }}
          <ul v-if="item.children.length">
            <li v-for="(i, idx) in item.children" :key="idx">
              <!-- {{ i }} -->
              {{ i.value }}
              <ul v-if="i.children.length">
                <li v-for="(j, jdx) in i.children" :key="jdx">
                  {{ j.value }}
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>

  <div v-else>
    <span>LOADING...</span>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
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
      titles: [],
      headers: [],
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
    const classes = {
      1: 'text-4xl heading',
      2: 'text-3xl heading',
      3: 'text-2xl heading',
      4: 'text-1xl heading',
    }

    const Heading = BaseHeading.configure({ levels: [1, 2, 3] }).extend({
      name: 'anchor',
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
        // 모든 h 태그
        const headings = [...this.view.dom.querySelectorAll('h1,h2,h3,h4')]

        // 첫 번째 요소 태그가 h1일 때까지 앞 요소 삭제
        while (headings[0].tagName !== 'H1') {
          headings.shift()
        }

        const headingInfo = headings.map((el) => {
          const className = el.tagName + '123123'
          el.classList.add(className)
          return {
            tag: el.tagName,
            children: [],
            value: el.innerText,
            className,
          }
        })

        const h1Idx = []
        headingInfo.forEach((el, idx) => {
          if (el.tag === 'H1') {
            h1Idx.push(idx)
          }
        })

        // 가장 작은 타이틀
        const lastChilds = []
        for (let i = 1; i < h1Idx.length; i++) {
          // 작은 타이틀을 상위 타이틀의 children으로 push

          for (let j = h1Idx[i] - 1; j > h1Idx[i - 1]; j--) {
            const lastChild = headingInfo[j]
            // h태그 숫자가 1차이 날 때만
            if (lastChild.tag[1] - headingInfo[j - 1].tag[1] === 1) {
              headingInfo[j - 1].children.push({ ...lastChild })
            }
          }
        }

        // 가장 마지막 부터 뒤에서 가장 가까운 h1까지
        for (let i = headingInfo.length - 1; i > h1Idx[h1Idx.length - 1]; i--) {
          const lastChild = headingInfo[i]
          // h태그 숫자가 1차이 날 때만
          if (lastChild.tag[1] - headingInfo[i - 1].tag[1] === 1) {
            headingInfo[i - 1].children.push({ ...lastChild })
          }
        }
        lastChilds.push({ ...headingInfo[headingInfo.length - 1] })
        const h1parents = headingInfo.filter((el) => el.tag === 'H1')

        _vm.headers = h1parents
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
    ...mapActions({
      setPostHeadings: 'setPostHeadings',
    }),
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
.post-anchors {
  width: 10%;
  min-width: 200px;
  .anchors {
    list-style: none;
    padding: 5px 15px;
    border-left: 1.5px solid $color_border_grey;
    position: sticky;
    top: 30%;
    > li {
      color: $color_dark_grey;
      font-size: $font_size_small;
      margin: 5px 0;
      transition: transform 0.1s, color 0.1s;
      &:hover {
        color: $color_dark_black;
        transform: scale(1.005);
        cursor: pointer;
      }
    }
  }
}
</style>
