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
      v-model="postContent"
      class="new-post__editor editor-content"
      @addImage="addImageUrl"
    />
    <!-- <div class="new-post__preview">
      <span style="color: #999">Preview</span>
      <pre><code>{{ postTitle }}</code></pre>
      <pre><code>{{ postContent }}</code></pre>
    </div> -->

    <button class="submit-btn" @click="onSubmit">완료</button>
  </div>
</template>

<script>
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
      postContent: '<p style="color:#ccc !important">내용을 입력하세요</p>',
      imageFile: null,
      uploadedImgUrl: '',
    }
  },
  mounted() {
    this.$refs.titleRef.focus()
  },
  methods: {
    onSubmit() {
      const doc = {
        _type: 'post',
        author: 'jeongbin',
        title: this.postTitle,
        likes: 0,
        mainImage: this.uploadedImgUrl,
        body: [
          {
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'document', text: this.postContent }],
          },
        ],
      }

      // document 업로드
      client
        .create(doc)
        .then((response) => {
          console.log(response)
          $nuxt.$emit('alert', {
            type: 'info',
            description: '글 생성 완료',
            title: '알림',
            // callback: () => this.$router.push(`/post/${response._id}`),
          })
        })
        .catch((error) => console.error('Error creating document:', error))
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
  // &__preview {
  //   padding: 1rem 0 0;

  //   h3 {
  //     margin: 1rem 0 0.5rem;
  //   }

  //   pre {
  //     border-radius: 5px;
  //     color: #333;
  //   }

  //   code {
  //     display: block;
  //     white-space: pre-wrap;
  //     font-size: 0.8rem;
  //     padding: 0.75rem 1rem;
  //     background-color: #e9ecef;
  //     color: #495057;
  //   }
  // }
}
</style>
