<template>
  <ul class="participants">
    <li>참가자1</li>
    <li>참가자2</li>
    <li>참가자3</li>
  </ul>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.participants {
  flex-shrink: 0;
  width: 10%;
  min-width: 200px;
  height: fit-content;
  margin: 0 20px 0 50px;
  padding: 20px;
  border-bottom: 1px solid $color_border_grey;
  box-sizing: content-box;
  li {
    margin: 5px 0;
  }
}
</style>
