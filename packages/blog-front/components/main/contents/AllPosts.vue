<template>
  <section class="all-posts">
    <button @click="removePostsAll">전체 삭제</button>
    <h2 class="heading-title">All Posts</h2>
    <ul class="all-posts__list">
      <li v-for="post in $store.state.allPosts" :key="post._id" class="post">
        <h3 class="post__title">
          <nuxt-link :to="`/post/${post._id}`">
            {{ post.title }}
          </nuxt-link>
        </h3>
        <div class="post__meta-data">
          <span class="post-author">{{ post.author }}</span>
          <span class="post-date">{{ post._createdAt.slice(0, 10) }}</span>
        </div>
        <div class="post__description">
          <p v-html="post.body[0].children[0].text"></p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapActions } from 'Vuex'
import { client } from '@/api'
export default {
  async mounted() {
    await this.getAllPosts()
    console.log(this.$store.state.allPosts, '<< All Posts')
  },
  methods: {
    ...mapActions({
      getAllPosts: 'getAllPosts',
    }),
    removePostsAll() {
      this.$nuxt.$emit('alert', {
        type: 'confirm',
        description: '정말 삭제하시겠습니까?',
        title: '삭제',
      })
      this.$nuxt.$on('alert-confirm', (answer) => {
        console.log(answer)
        if (answer) {
          client
            .delete({ query: '*[_type == "post"]' })
            .then(() => this.getAllPosts())
            .catch((e) => console.log(e))
        }
      })
    },
  },
}
</script>

<style lang="scss">
.all-posts {
  width: 80%;
  margin-top: 60px;
  max-width: 900px;
  .heading-title {
    font-size: $font_size_huge;
    font-weight: 700;
    margin-bottom: 20px;
  }
  &__list {
    list-style: none;
    .post {
      margin-bottom: 50px;
      &__title {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        margin: 0;
        font-size: $font_size_large;
        cursor: pointer;
      }
      &__meta-data {
        margin-top: auto;
        padding: 15px 0 10px 0;
        color: $color_light_grey;
        font-size: $font_size_tiny;
      }
      &__description p {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        margin: 0;
        color: $color_dark_grey;
        * {
          display: inline;
          margin: 0;
          padding: 0;
          color: $color_dark_black;
          font-size: $font_size_small;
          font-weight: 400;
          text-decoration: none;
          list-style: none;
        }
      }
    }
  }
}
</style>
