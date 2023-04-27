<template>
  <div class="post-anchors">
    <ul class="anchors">
      <li>first anchor</li>
      <li>second anchor</li>
      <li>third anchor</li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.post-anchors {
  width: 10%;
  min-width: 200px;
  .anchors {
    list-style: none;
    padding: 5px 15px;
    border-left: 1.5px solid $color_border_grey;
    position: sticky;
    top: 30%;
    > li {
      color: $color_dark_grey;
      font-size: $font_size_small;
      margin: 5px 0;
      transition: transform 0.1s, color 0.1s;
      &:hover {
        color: $color_dark_black;
        transform: scale(1.005);
        cursor: pointer;
      }
    }
  }
}
</style>
