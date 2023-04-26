<template>
  <section class="latest-posts">
    <h2 class="heading-title">Latest Posts</h2>
    <ul class="latest-posts__list">
      <li class="post">
        <div class="post__bg">
          <a href="">
            <img
              src="https://tech.kakao.com/storage/2023/04/techmeet_cover.png"
              alt=""
            />
          </a>
        </div>
        <div class="post__content">
          <h3 class="post__title"><a href="">게시글 제목1</a></h3>
        </div>
        <div class="post__meta-data">
          <span class="post-author">작성자</span>
          <span class="post-date">2023.04.20</span>
        </div>
      </li>
      <li class="post">
        <div class="post__bg">
          <a href="">
            <img
              src="https://tech.kakao.com/storage/2023/04/techmeet_cover.png"
              alt=""
            />
          </a>
        </div>
        <div class="post__content">
          <h3 class="post__title"><a href="">게시글 제목</a></h3>
        </div>
        <div class="post__meta-data">
          <span class="post-author">작성자</span>
          <span class="post-date">2023.04.20</span>
        </div>
      </li>
      <li class="post">
        <div class="post__bg">
          <a href="">
            <img
              src="https://tech.kakao.com/storage/2023/04/techmeet_cover.png"
              alt=""
            />
          </a>
        </div>
        <div class="post__content">
          <h3 class="post__title"><a href="">게시글 제목</a></h3>
        </div>
        <div class="post__meta-data">
          <span class="post-author">작성자</span>
          <span class="post-date">2023.04.20</span>
        </div>
      </li>
      <li class="post">
        <div class="post__bg">
          <a href="">
            <img
              src="https://tech.kakao.com/storage/2023/04/techmeet_cover.png"
              alt=""
            />
          </a>
        </div>
        <div class="post__content">
          <h3 class="post__title"><a href="">게시글 제목</a></h3>
        </div>
        <div class="post__meta-data">
          <span class="post-author">작성자</span>
          <span class="post-date">2023.04.20</span>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.latest-posts {
  width: 80%;
  max-width: 1200px;
  margin-top: 60px;
  .heading-title {
    font-size: $font_size_huge;
    font-weight: 700;
    margin-bottom: 20px;
  }
  &__list {
    display: flex;
    justify-content: space-between;
  }
  .post {
    display: flex;
    flex-direction: column;
    width: 22%;
    height: 370px;
    transition: box-shadow 0.3s, transform 0.3s;
    box-shadow: 0 0 10px $color_shadow_grey;
    &:hover {
      transform: scale(1.005);
      box-shadow: 0 0 20px $color_shadow_grey;
    }
    &__bg img {
      width: 100%;
    }
    &__content {
      padding: 30px;
      .post__title {
        font-size: $font_size_large;
      }
    }
    &__meta-data {
      margin-top: auto;
      padding: 15px 30px;
      color: $color_light_grey;
      font-size: $font_size_tiny;
      border-top: 1px solid $color_border_grey;
      .post-date::before {
        content: ' · ';
      }
    }
  }
}
</style>
