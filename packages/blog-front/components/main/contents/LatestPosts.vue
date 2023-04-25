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

<style scoped>
.latest-posts {
  width: 80%;
  max-width: 1200px;
  margin-top: 60px;
}
.heading-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
}

.latest-posts__list {
  display: flex;
  justify-content: space-between;
}

.post {
  display: flex;
  flex-direction: column;
  width: 22%;
  height: 370px;
  transition: all 0.3s;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
}

.post:hover {
  transform: scale(1.005);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.post__bg img {
  width: 100%;
}

.post__content {
  padding: 30px;
}

.post__title {
  font-size: 22px;
}

.post__meta-data {
  margin-top: auto;
  padding: 15px 30px;
  color: #adadad;
  font-size: 12px;
  border-top: 1px solid #eaeaea;
}

.post-date::before {
  content: ' · ';
}
</style>
