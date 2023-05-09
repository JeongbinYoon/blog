<template>
  <div class="new-post">
    <input
      ref="titleRef"
      v-model="postTitle"
      type="text"
      class="post-title"
      placeholder="제목 없음"
    />
    <Editor
      ref="editor"
      v-model="postContent"
      class="new-post__editor editor-content"
      @addImage="addImageUrl"
    />

    <button class="submit-btn" @click="onSubmit">완료</button>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import Editor from '@/components/editor/Editor.vue'
import { client } from '@/api'
export default {
  components: {
    Editor,
  },
  layout: 'newpost',
  data() {
    return {
      postTitle: '',
      postContent: '',
      imageFile: null,
      uploadedImgUrl: '',
    }
  },
  mounted() {
    this.$refs.titleRef.focus()
  },
  methods: {
    async onSubmit() {
      const userInfo = this.$store.state.userInfo

      let userId = userInfo?._id
      if (!userId) {
        userId = Cookie.get('userId')
      }
      if (!this.postTitle) {
        this.$refs.titleRef.focus()
        return
      }
      await this.$store.dispatch('getUserInfo', userId)
      const newPost = {
        _type: 'post',
        author_name: userInfo?.userName,
        author_id: userInfo?._id,
        title: this.postTitle,
        likes: 0,
        mainImage: this.uploadedImgUrl,
        body: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              { _type: 'document', text: this.$refs.editor.getHTML() },
            ],
          },
        ],
      }

      // // document 업로드
      const response = await client.create(newPost)
      $nuxt.$emit('alert', {
        type: 'info',
        description: '글 생성 완료',
        title: '알림',
        callback: () => this.$router.push(`/post/${response._id}`),
      })
    },
    addImageUrl(url) {
      this.uploadedImgUrl = url
    },
  },
}
</script>

<style lang="scss">
.new-post {
  width: 90%;
  max-width: 700px;
  height: calc(100vh - #{$size_header_height});
  margin: 0 auto;
  position: relative;
  .post-title {
    width: 100%;
    padding: 0;
    color: #333;
    font-size: $font_size_huge;
    font-weight: 700;
    border: none;
    outline: none;
    white-space: wrap;
    &::placeholder {
      color: $color_bright_grey;
    }
  }
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
  }
  .submit-btn {
    padding: 7px 20px;
    background-color: #000;
    color: #fff;
    border-radius: 20px;
    position: absolute;
    bottom: 30px;
    right: 0;
    cursor: pointer;
  }
}
</style>
