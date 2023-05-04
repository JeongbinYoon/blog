<template>
  <div v-if="isMounted">
    <div class="post-anchors">
      <ul class="anchors">
        <li
          v-for="h1 in headers"
          :key="h1.className"
          :class="h1.className"
          @click.stop="onScroll"
        >
          {{ h1.value }}
          <ul v-if="h1.children.length">
            <li
              v-for="h2 in h1.children"
              :key="h2.className"
              :class="h2.className"
              @click.stop="onScroll"
            >
              {{ h2.value }}
              <ul v-if="h2.children.length">
                <li
                  v-for="h3 in h2.children"
                  :key="h3.className"
                  :class="h3.className"
                  @click.stop="onScroll"
                >
                  {{ h3.value }}
                  <ul v-if="h3.children.length">
                    <li
                      v-for="h4 in h3.children"
                      :key="h4.className"
                      :class="h4.className"
                      @click.stop="onScroll"
                    >
                      {{ h4.value }}
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="editor">
      <input v-if="editable" type="file" @change="addImage" />
      <editor-content :editor="editor" />
    </div>
  </div>

  <div v-else>
    <span>LOADING...</span>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Editor, EditorContent } from '@tiptap/vue-2'
import CodeBlock from '@tiptap/extension-code-block-lowlight'
import html from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'

import BaseHeading from '@tiptap/extension-heading'
import { mergeAttributes } from '@tiptap/core'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import StarterKit from '@tiptap/starter-kit'
import { client } from '@/api'
import { hasCodeTag } from '@/utils/randomStr'
// console.log(lowlight, '<<lowlight')

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
    isMounted(val) {
      if (val) {
        this.createAnchor()
      }
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

  async mounted() {
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
      addCommands() {
        return {
          onTab:
            (attr) =>
            ({ chain, state, dispatch }) => {
              return chain().insertContent('   ')
            },
        }
      },
      addKeyboardShortcuts() {
        return {
          // ↓ your new keyboard shortcut
          Tab: (props) => {
            let selection = window.getSelection().focusNode
            let isCode = false
            while (selection) {
              if (selection?.classList?.contains('ProseMirror')) {
                break
              }
              if (hasCodeTag(selection)) {
                isCode = true
                break
              }
              selection = selection?.parentElement || selection.parentElement
            }

            if (isCode) {
              return this.editor.commands.onTab()
            } else {
              this.editor.commands.sinkListItem('listItem')
              this.editor.commands.focus('end')
            }
          },
        }
      },
    })
    const { lowlight } = await import('lowlight')
    lowlight.registerLanguage('html', html)
    lowlight.registerLanguage('css', css)
    lowlight.registerLanguage('js', js)
    lowlight.registerLanguage('ts', ts)

    this.editor = new Editor({
      content: this.value,
      extensions: [
        StarterKit,
        Image,
        Heading,
        CodeBlock.configure({
          languageClassPrefix: 'language-',
          exitOnTripleEnter: false,
          exitOnArrowDown: false,
          lowlight,
          // HTMLAttributes: {
          //   class: 'my-custom-class',
          // },
        }),
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
      onUpdate: ({ editor }) => {
        // HTML
        this.$emit('input', this.editor.getHTML())
        if (this.editable && this.isMounted) {
          this.createAnchor()
        }

        // JSON
        // this.$emit('input', this.editor.getJSON())
      },
    })
  },

  beforeDestroy() {
    this.editor.destroy()
  },

  methods: {
    createAnchor() {
      if (this.isMounted) {
        // 모든 h 태그

        const headings = [
          ...this.editor.view.dom.querySelectorAll('h1,h2,h3,h4'),
        ]
        // 첫 번째 요소 태그가 h1일 때까지 앞 요소 삭제
        while (headings.length && headings[0].tagName !== 'H1') {
          headings.shift()
        }

        const headingInfo = headings.map((el) => {
          const randomStr = Math.random().toString(36).substring(2, 12)
          const className = el.tagName + randomStr
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

        this.headers = h1parents
      }
    },
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
    onScroll(e) {
      const targetClassName = e.target.className
      const scrollTarget = document.querySelector(`.${targetClassName}:not(li)`)
      if (scrollTarget) {
        scrollTarget.scrollIntoView()
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
.ProseMirror {
  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }

    .hljs-comment,
    .hljs-quote {
      color: #616161;
    }

    .hljs-variable,
    .hljs-template-variable,
    .hljs-attribute,
    .hljs-tag,
    .hljs-name,
    .hljs-regexp,
    .hljs-link,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class {
      color: #f98181;
    }

    .hljs-number,
    .hljs-meta,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params {
      color: #fbbc88;
    }

    .hljs-string,
    .hljs-symbol,
    .hljs-bullet {
      color: #b9f18d;
    }

    .hljs-title,
    .hljs-section {
      color: #faf594;
    }

    .hljs-keyword,
    .hljs-selector-tag {
      color: #70cff8;
    }

    .hljs-emphasis {
      font-style: italic;
    }

    .hljs-strong {
      font-weight: 700;
    }
  }
}
.post-anchors {
  width: 200px;
  @media (min-width: 1440px) {
    & {
      position: fixed;
      top: 20%;
      left: 75%;
    }
  }

  .anchors {
    list-style: none;
    margin: 0;
    padding: 5px 0;
    border-left: 1.5px solid $color_border_grey;
    box-sizing: border-box;
    ul {
      list-style: none;
      padding: 0px;
      margin: 0;
    }
    li {
      width: 100%;
      padding: 5px 0 0 15px;
      color: $color_dark_grey;
      font-size: $font_size_small;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
      // &:hover {
      //   color: $color_dark_black;
      //   cursor: pointer;
      // }
    }
  }
}
</style>
