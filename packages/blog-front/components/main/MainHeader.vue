<template>
  <header class="main-header">
    <h1 class="main-header__logo"><nuxt-link to="/">logo</nuxt-link></h1>
    <nav class="main-header__nav">
      <ul>
        <li><a href="">Post</a></li>
        <li><nuxt-link to="/manage/newpost">글쓰기</nuxt-link></li>
        <!-- <li><a href="">로그인</a></li> -->
      </ul>
    </nav>
  </header>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.main-header {
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background: $color_header_black;
  &__logo {
    font-size: $font_size_large;
    a {
      color: $color_header_white;
    }
  }
  &__nav {
    > ul {
      display: flex;
      list-style: none;
      > li {
        margin: 0 20px;
        font-size: $font_size_small;
        a {
          color: $color_header_white;
        }
      }
    }
  }
}
</style>
