<template>
  <header class="main-header">
    <h1 class="main-header__logo"><nuxt-link to="/">logo</nuxt-link></h1>
    <nav class="main-header__nav">
      <ul>
        <li @click="goToNewPost">글쓰기</li>
        <li v-if="!userId">
          <nuxt-link to="/login">로그인</nuxt-link>
        </li>
        <li v-else @click="onLogout">로그아웃</li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    userId() {
      return this.$store.state.userId
    },
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logout')
    },
    goToNewPost() {
      this.userId
        ? this.$router.push('/manage/newpost')
        : this.$router.push('/login')
    },
  },
}
</script>

<style lang="scss" scoped>
.main-header {
  display: flex;
  height: $size_header_height;
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
        color: $color_header_white;
        cursor: pointer;

        a {
          color: $color_header_white;
        }
      }
    }
  }
}
</style>
