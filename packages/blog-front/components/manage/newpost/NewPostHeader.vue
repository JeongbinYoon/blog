<template>
  <header class="newpost-header">
    <h1 class="newpost-header__logo"><nuxt-link to="/">logo</nuxt-link></h1>
    <nav class="newpost-header__nav">
      <ul></ul>
    </nav>
  </header>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.newpost-header {
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  &__logo {
    font-size: $font_size_large;
    a {
      color: $color_dark_black;
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
          color: $color_dark_black;
        }
      }
    }
  }
}
</style>
