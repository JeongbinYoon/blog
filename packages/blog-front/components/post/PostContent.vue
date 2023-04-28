<template>
  <div v-if="$store.state.currentPost" class="post-content">
    <div class="post-content__meta-data">
      <span class="post-date">
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
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
          />
        </svg>
        {{ $store.state.currentPost._createdAt.slice(0, 10) }}
      </span>
      <span class="post-author">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="{1.5}"
          stroke="currentColor"
          class="w-6 h-6 icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        {{ $store.state.currentPost.author }}
      </span>
      <span class="post-likes">
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
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
        {{ $store.state.currentPost.likes }}
      </span>
      <span class="post-edit" @click="editPost">
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
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>

        {{ editable ? '저장' : '수정' }}
      </span>
    </div>
    <div :class="{ edit: editable }">
      <h1 v-if="!editable" class="post-content__title">
        {{ postTitle }}
      </h1>
      <input
        v-else
        ref="titleRef"
        v-model="postTitle"
        type="text"
        class="post-content__title"
        placeholder="제목 없음"
      />
      <Editor
        v-model="postContent"
        :value="$store.state.currentPost.body[0].children[0].text"
        class="post-content__description"
        :editable="editable"
      />
    </div>
  </div>
  <div v-else>
    <p>Post Not Found.</p>
  </div>
</template>

<script>
import { client } from '@/api'
export default {
  props: {
    postId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      editable: false,
      postTitle: '',
      postContent: '',
    }
  },
  mounted() {
    this.postTitle = this.$store.state.currentPost.title
    this.postContent = this.$store.state.currentPost.body[0].children[0].text
  },
  methods: {
    async editPost() {
      this.editable = !this.editable

      // 저장
      if (this.editable === false) {
        console.log(this.postContent)

        const updateData = {
          title: this.postTitle,
          body: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'document',
                  text: this.postContent,
                },
              ],
            },
          ],
        }

        const patched = await client
          .patch(this.$store.state.currentPost._id)
          .set(updateData)
          .commit()
        console.dir(patched)

        // document 업로드
        $nuxt.$emit('alert', {
          type: 'info',
          description: '수정이 완료되었습니다',
          title: '알림',
          // callback: () => this.$router.push(`/post/${response._id}`),
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.post-content {
  width: 70%;
  flex-shrink: 1;
  margin: 0 20px;
  > div {
    background-color: #fff;
    transition: background-color 0.5s;
    &.edit {
      background-color: $color_post_edit;
    }
  }

  &__meta-data {
    display: flex;
    font-size: $font_size_tiny;
    color: $color_dark_grey;
    margin-bottom: 15px;
    > span {
      display: flex;
      align-items: center;
      min-width: fit-content;
      margin-right: 10px;
      .icon {
        width: $font_size_small;
        margin-right: 5px;
      }
      &.post-edit {
        cursor: pointer;
      }
    }
  }
  &__title {
    width: 100%;
    margin: 0;
    padding: 20px 20px 0px;
    background: transparent;
    color: $color_dark_black;
    font-size: $font_size_grand;
    font-weight: 700;
    border: none;
    outline: none;
    white-space: wrap;
    box-sizing: border-box;
    &::placeholder {
      color: $color_bright_grey;
    }
  }
  &__description {
    padding: 20px;
    line-height: 1.4;
    box-sizing: border-box;
  }
}
</style>
