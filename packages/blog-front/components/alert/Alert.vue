<template>
  <Transition name="slide-open" :duration="3000">
    <div v-if="isOpen" class="alert">
      <p class="alert--content">
        {{ alertData.description }}
      </p>
    </div>
  </Transition>
</template>

<script>
export default {
  data() {
    return {
      alertData: {
        type: '',
        title: '',
        description: '',
      },
      isOpen: false,
      states: [{ type: 'create-post', content: '글 생성이 완료되었습니다' }],
    }
  },
  mounted() {
    // 토스트 얼럿 이용방법
    // 1. 타입을명시합니다. ex) info, warning, error
    // 2. 내용을 명시합니다. (key: description)
    // 3. 선택적으로 타이틀을 추가할 수 있습니다. (key: title)
    // ex )
    /**
     * {
     *  type : "info",
     *  description: "안녕하세요?",
     *  title: "알림"
     * }
     */
    // API -> application program interface
    //

    this.$nuxt.$on('alert', ({ type, description, title, callback }) => {
      this.isOpen = true
      this.alertData.type = type
      this.alertData.description = description
      this.alertData.title = title
      setTimeout(() => {
        callback && callback()
        // this.isOpen = false
      }, 6000)
    })
  },
}
</script>

<style lang="scss" scoped>
.alert {
  width: 85%;
  max-width: 250px;
  height: fit-content;
  padding: 10px 20px;
  position: fixed;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.2);
  .alert--content {
    font-size: 0.5em;
  }
  border-radius: 5px;
}
.slide-open-enter-active,
.slide-open-leave-active {
  transition: top 0.5s ease-in-out;
}
.slide-open-enter,
.slide-open-leave-to {
  top: -20%;
}
</style>
