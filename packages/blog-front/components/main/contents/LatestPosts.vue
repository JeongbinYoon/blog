<template>
  <section class="latest-posts">
    <h2 class="heading-title">Latest Posts</h2>
    <ul class="latest-posts__list">
      <li v-for="post in $store.state.recentPosts" :key="post._id" class="post">
        <div class="post__bg">
          <nuxt-link :to="`post/${post._id}`">
            <img v-if="post.mainImage" :src="post.mainImage" alt="" />
            <div v-else class="noImage">이미지 없음</div>
          </nuxt-link>
        </div>
        <div class="post__content">
          <h3 class="post__title">
            <nuxt-link :to="`post/${post._id}`">
              {{ post.title }}
            </nuxt-link>
          </h3>
        </div>
        <div class="post__meta-data">
          <span class="post-author">{{ post.author_name }}</span>
          <span class="post-date">{{ post._createdAt.slice(0, 10) }}</span>
        </div>
      </li>
    </ul>
  </section>
</template>

<script></script>

<style lang="scss" scoped>
.latest-posts {
  width: 80%;
  max-width: 900px;
  margin-top: 60px;
  .heading-title {
    font-size: $font_size_huge;
    font-weight: 700;
    margin-bottom: 20px;
  }
  &__list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .post {
    display: flex;
    flex-direction: column;
    transition: box-shadow 0.2s;
    box-shadow: 0 0 10px $color_shadow_grey;
    &:last-child {
      margin-right: 0;
    }
    &:hover {
      box-shadow: 0 0 15px $color_shadow_grey;
    }
    &__bg {
      height: 124px;
      min-height: 180px;
      overflow: hidden;
      a {
        min-height: fit-content;
      }
      img {
        width: 100%;
      }
      .noImage {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        background-color: #eee;
        color: $color_dark_grey;
      }
    }
    &__content {
      padding: 20px;
      .post__title {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        margin: 0;
        font-size: $font_size_medium;
      }
    }
    &__meta-data {
      margin-top: auto;
      padding: 15px 20px;
      color: $color_light_grey;
      font-size: $font_size_tiny;
      border-top: 1px solid $color_border_grey;
      .post-date::before {
        content: ' · ';
      }
    }
  }
}
@media (min-width: 1024px) {
  .post {
    width: 32%;
    margin-right: 2%;
  }
}
@media (min-width: 768px) and (max-width: 1023px) {
  .post {
    width: 48%;
    margin: 0 2% 20px 0;
  }
}
@media (max-width: 767px) {
  .latest-posts {
    width: 100%;
    .post {
      width: 100%;
      margin-bottom: 20px;
    }
  }
}
</style>
