<template>
  <div v-if="isMounted">
    <div class="post-anchors">
      <ul class="anchors">
        <li v-for="h1 in headers" :key="h1.className">
          <span :class="h1.className" @click.stop="onScroll">
            {{ h1.value }}
          </span>
          <ul v-if="h1.children.length">
            <li v-for="h2 in h1.children" :key="h2.className">
              <span :class="h2.className" @click.stop="onScroll">
                {{ h2.value }}
              </span>
              <ul v-if="h2.children.length">
                <li v-for="h3 in h2.children" :key="h3.className">
                  <span :class="h3.className" @click.stop="onScroll">
                    {{ h3.value }}
                  </span>
                  <ul v-if="h3.children.length">
                    <li v-for="h4 in h3.children" :key="h4.className">
                      <span :class="h4.className" @click.stop="onScroll">
                        {{ h4.value }}
                      </span>
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
      <editor-content :editor="editor" />
      <div
        class="command-container"
        :class="{ active: showCommandContainer }"
        @click="removeCommandActive($event)"
      >
        <!-- Command -->
        <div :class="{ active: showCommand }" class="command">
          <ul class="command__list" @keydown="moveCommand($event)">
            <!-- Image -->
            <li
              class="command__list--item"
              tabindex="0"
              @click="openSecondDepth('image')"
              @keydown.enter.space="openSecondDepth('image')"
            >
              <div class="iconBox">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </div>
              <div class="description">
                <span class="description-title">이미지</span>
                <span class="description-content"
                  >파일 또는 링크를 통해 업로드하세요</span
                >
              </div>
            </li>

            <!-- Bullet list -->
            <li
              class="command__list--item"
              tabindex="-1"
              @click="openSecondDepth('bullet')"
              @keydown.enter.space="openSecondDepth('bullet')"
            >
              <div class="iconBox">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </div>
              <div class="description">
                <span class="description-title">리스트</span>
                <span class="description-content">리스트를 생성하세요</span>
              </div>
            </li>
          </ul>
        </div>

        <!-- Second Depth Command -->

        <!-- Image -->
        <div
          :class="{ active: showCommandSecondDepth }"
          class="image second-command-depth"
        >
          <div class="image-header">
            <ul class="header-list">
              <li
                :class="{ active: imageInputMethod === 'file' }"
                tabindex="0"
                @click="changeUploadImageType('file')"
                @keydown.enter.space="changeUploadImageType('file')"
              >
                <span>이미지</span>
                <div class="border"></div>
              </li>
              <li
                :class="{ active: imageInputMethod === 'link' }"
                tabindex="0"
                @click="changeUploadImageType('link')"
                @keydown.enter.space="changeUploadImageType('link')"
              >
                <span>링크</span>
                <div class="border"></div>
              </li>
            </ul>
          </div>
          <div class="image-body">
            <div v-if="imageInputMethod === 'file'" class="upload_file">
              <input
                ref="imageInputRef"
                type="file"
                accept="image/*"
                @change="addImage"
              />

              <button
                class="imageInputButton"
                @click="$refs.imageInputRef.showPicker()"
              >
                이미지 업로드
              </button>
            </div>
            <div v-else-if="imageInputMethod === 'link'" class="embed-link">
              <input
                v-model="imageLink"
                type="text"
                placeholder="링크를 삽입하세요"
              />
              <button
                @click="embedImageLink"
                @keydown.enter.space="embedImageLink"
              >
                이미지 추가
              </button>
            </div>
          </div>
        </div>
      </div>
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
import { mergeAttributes, Extension } from '@tiptap/core'
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
      imageInputMethod: 'file',
      imageLink: '',
      showCommandContainer: false,
      showCommand: false,
      showCommandSecondDepth: false,
      commandListFocused: false,
      commandList: null,
      cursorPos: 0,
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
            () =>
            ({ chain }) => {
              return chain().insertContent('   ')
            },
        }
      },
      addKeyboardShortcuts() {
        return {
          // ↓ your new keyboard shortcut
          Tab: (props) => {
            let selection = window.getSelection().focusNode
            let enterCommand = false
            let canTab = false
            const lastChar =
              selection?.data && selection?.data[selection?.data?.length - 1]
            if (selection?.innerText === '/' || lastChar === '/') {
              canTab = true
              enterCommand = true
            } else {
              while (selection) {
                if (selection?.classList?.contains('ProseMirror')) {
                  break
                }
                if (hasCodeTag(selection)) {
                  canTab = true
                  break
                }
                selection = selection?.parentElement || selection.parentElement
              }
            }

            if (enterCommand) {
              return
            }

            if (canTab && enterCommand === false) {
              return this.editor.commands.onTab()
            } else {
              this.editor.commands.sinkListItem('listItem')
              this.editor.commands.focus('end')
            }
          },
        }
      },
    })

    const CustomExtension = Extension.create({
      addKeyboardShortcuts() {
        return {
          '/': () => {
            _vm.showCommandContainer = true
            _vm.showCommand = true
            // _vm.editor.commands.insertContent('<p class="command_spot"> </p>')
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
        CustomExtension,
        CodeBlock.configure({
          languageClassPrefix: 'language-',
          exitOnTripleEnter: false,
          exitOnArrowDown: false,
          lowlight,
        }),
        Placeholder.configure({
          placeholder: 'Write something …',
        }),
      ],
      onCreate(props) {
        _vm.isMounted = true
      },

      editable: this.editable,
      onUpdate: ({ transaction }) => {
        _vm.cursorPos = transaction.curSelection.$anchor.pos

        _vm.onPressSlash()

        if (this.editable && this.isMounted) {
          this.createAnchor()
        }
      },
    })
  },

  beforeDestroy() {
    this.editor.destroy()
  },

  methods: {
    getHTML() {
      return this.editor.getHTML()
    },
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
            dom: el,
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

        // Observer
        this.$nextTick(() => {
          let previous = null
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                // console.log(entry)
                const anchorTarget = document.querySelector(
                  `.anchors .${entry.target.className}`
                )
                if (!entry.isIntersecting && anchorTarget) {
                  if (previous) {
                    previous.classList.remove('active')
                  }
                  previous = anchorTarget
                  anchorTarget.classList.add('active')
                } else {
                  console.log(anchorTarget)
                }
              })
            },
            {
              rootMargin: '-150px 0px -700px 0px',
            }
          )

          headingInfo.map((target) => observer.observe(target.dom))
        })
      }
    },
    async addImage(e) {
      const file = e.target.files[0]
      let url = ''
      if (file !== null && file.type.includes('image')) {
        const fileData = await client.assets.upload('image', file)
        url = fileData.url
      } else {
        alert('지원하지 않는 확장자')
      }
      if (url !== '') {
        this.editor.chain().focus().setImage({ src: url }).run()
        this.closeAllCommands()
        this.editor.commands.focus('end')
        this.$emit('addImage', url)
      }
    },
    onScroll(e) {
      const targetClassName = e.target.className
      const scrollTarget = document.querySelector(
        `.${targetClassName}:not(span)`
      )
      if (scrollTarget) {
        scrollTarget.scrollIntoView()
      }
    },
    ...mapActions({
      setPostHeadings: 'setPostHeadings',
    }),

    openSecondDepth(type) {
      this.showCommand = false

      if (type === 'bullet') {
        this.editor.commands.toggleBulletList()
        this.editor.commands.focus('end')
      } else {
        this.showCommandSecondDepth = true
        console.log(this.showCommandSecondDepth)
      }

      this.editor.commands.deleteRange({
        from: this.cursorPos - 1,
        to: this.cursorPos,
      })
    },

    removeCommandActive(e) {
      if (
        e.target.classList.contains('command-container') &&
        e.target.classList.contains('active')
      ) {
        this.closeAllCommands()
      }
    },

    embedImageLink() {
      if (this.imageLink) {
        this.editor.commands.setImage({ src: this.imageLink })
        this.imageLink = ''
        this.closeAllCommands()
      }
    },

    closeAllCommands() {
      this.showCommandContainer = false
      this.showCommand = false
      this.showCommandSecondDepth = false
      this.imageInputMethod = 'file'
      this.commandList.firstElementChild.setAttribute('tabindex', 0)
      console.log('child', this.commandList.firstElementChild)
    },
    changeUploadImageType(type) {
      this.imageInputMethod = type
    },

    // Command 창이 띄워진 상태에서 특정 키 외 입력시 창 끄기
    onPressSlash() {
      const commandList = document.querySelector('.command .command__list')
      this.commandList = commandList

      const vm = this
      function onPressOtherKey(e) {
        if (e.code !== 'Slash' && e.code !== 'Tab' && e.code !== 'ArrowDown') {
          vm.closeAllCommands()
        }

        if (e.code === 'ArrowDown') {
          vm.moveCommand('ArrowDown')
        }
        window.removeEventListener('keydown', onPressOtherKey)
      }
      window.addEventListener('keydown', onPressOtherKey)
    },

    // Command list 에서 방향키 이동
    moveCommand(e, code) {
      const pressed = code ?? e.code
      let currentTab = this.commandList.querySelector('li[tabindex="0"]')
      let prevTab = currentTab.previousElementSibling ?? null
      let nextTab = currentTab.nextElementSibling ?? currentTab

      if (pressed === 'ArrowDown' || pressed === 'KeyA') {
        prevTab = currentTab
        currentTab = nextTab
        prevTab.setAttribute('tabindex', -1)
        currentTab.setAttribute('tabindex', 0)
        // this.commandListFocused = true
        console.log(currentTab)
      } else if (pressed === 'ArrowUp') {
        if (prevTab) {
          nextTab = currentTab
          currentTab = prevTab
          nextTab.setAttribute('tabindex', -1)
          currentTab.setAttribute('tabindex', 0)
        } else {
          // 가상 상위 리스트일 경우 editor로 돌아감
          // this.commandListFocused = false
          this.editor.commands.focus()
          this.closeAllCommands()
        }
      } else if (pressed === 'Escape') {
        this.editor.commands.focus()
        currentTab.setAttribute('tabindex', -1)

        this.closeAllCommands()
      } else if (pressed === 'Enter') {
        currentTab.setAttribute('tabindex', -1)
      }

      console.log(e.code)
      currentTab.focus()
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
.ProseMirror {
  p {
    // width: fit-content;
    // max-width: 100%;
  }
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
      .active {
        color: $color_dark_black;
        font-weight: 700;
      }
      // &:hover {
      //   color: $color_dark_black;
      //   cursor: pointer;
      // }
    }
  }
}

// Command
.command-container {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;

  opacity: 0%;
  z-index: -1;
  &.active {
    opacity: 100%;
    z-index: 10;
  }
  .command {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    background-color: #fff;
    border: 1px solid $color_border_grey;
    border-radius: 5px;
    box-shadow: 0px 5px 10px $color_shadow_grey;
    font-size: 14px;
    opacity: 0%;
    z-index: -1;
    transition: opacity 0.2s;
    &.active {
      opacity: 100%;
      z-index: 10;
    }
    &__list {
      padding: 5px;
      &--item {
        display: flex;
        align-items: center;
        padding: 5px;
        border-radius: 5px;
        &:focus {
          outline: none;
          background: #f0f1f5;
        }
        &:last-child {
          // margin-bottom: 0;
        }
        #imageInput {
          display: none;
        }
        &:hover {
          cursor: pointer;
        }
        > label {
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        .iconBox {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 46px;
          height: 46px;
          margin-right: 7px;
          background: #fff;
          border: 1px solid $color_border_grey;
          border-radius: 3px;
          overflow: hidden;
          .icon {
            width: 40%;
          }
        }
        .description {
          display: flex;
          flex-direction: column;
          &-title {
            margin-bottom: 3px;
          }
          &-content {
            font-size: 12px;
            color: $color_dark_grey;
          }
        }
      }
    }
  }
  .image.second-command-depth {
    position: absolute;
    top: 400px;
    left: 50%;
    transform: translateX(-50%);
    width: 500px;
    background-color: #fff;
    border: 1px solid $color_border_grey;
    border-radius: 5px;
    box-shadow: 0px 5px 10px $color_shadow_grey;
    opacity: 0%;
    z-index: -1;
    transition: opacity 0.2s;
    &.active {
      opacity: 100%;
      z-index: 10;
    }
    .image-header {
      padding: 10px 10px 0 10px;

      border-bottom: 1px solid $color_border_grey;
      .header-list {
        list-style: none;
        display: flex;
        > li {
          .border {
            width: 60%;
            margin: 0 auto;
            border-bottom: 2px solid #333;
            opacity: 0;
            transition: opacity 0.15s;
          }
          font-size: $font_size_small;
          &:hover {
            > span {
              background: #f0f0f0;
              cursor: pointer;
            }
          }
          &:focus {
            outline: none;
            > span {
              background: #f0f0f0;
            }
          }
          &.active {
            .border {
              opacity: 100%;
            }
          }
          > span {
            display: inline-block;
            padding: 3px 10px;
            margin-bottom: 4px;
            border-radius: 5px;
            transition: background 0.1s;
          }
        }
      }
    }
    .image-body {
      padding: 10px;
      .upload_file {
        > input {
          display: none;
        }

        .imageInputButton {
          width: 100%;
          padding: 10px 0;
          text-align: center;
          color: $color_dark_grey;
          font-size: $font_size_tiny;
          background: #fff;
          border: 1px solid $color_border_grey;
          border-radius: 3px;
          cursor: pointer;
          &:focus {
            outline: 1px solid #578cff;
          }
        }
      }
      .embed-link {
        display: flex;
        flex-direction: column;
        > input {
          width: 100%;
          height: 30px;
          margin-bottom: 10px;
          padding: 0 10px;
          color: $color_dark_grey;
          font-size: $font_size_tiny;
          border: 1px solid $color_bright_grey;
          border-radius: 3px;
          box-sizing: border-box;
          &:focus {
            outline: 1px solid #578cff;
          }
        }
        > button {
          width: 60%;
          margin: 0 auto;
          padding: 7px 0;
          background: #578cff;
          color: #fff;
          border: none;
          border-radius: 3px;
          &:focus {
            outline: 1px solid #578cff;
          }
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
