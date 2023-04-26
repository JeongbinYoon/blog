<template>
  <div class="post-participants">
    <span>공동 작업자</span>
    <ul class="participants">
      <li>aaaaaa</li>
      <li>bbbbbb</li>
      <li>cccccc</li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.post-participants {
  flex-shrink: 0;
  width: 10%;
  max-width: 200px;
  min-width: 150px;
  height: fit-content;
  padding: 10px 15px;
  box-sizing: content-box;
  position: sticky;
  top: 30%;
  border-left: 1px solid $color_border_grey;
  > span {
    font-size: $font_size_small;
  }
  .participants {
    padding: 10px 0 10px 15px;
    li {
      margin: 5px 0;
      color: $color_dark_grey;
      font-size: $font_size_small;
      &::before {
        content: '';
      }
    }
  }
}
</style>
