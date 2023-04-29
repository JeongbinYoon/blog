<template>
  <Transition name="slide-open" :duration="3000">
    <!-- Info -->
    <div v-if="isOpen && alertData.type === 'info'" class="alert info">
      <p class="alert--content">
        {{ alertData.description }}
      </p>
    </div>

    <!-- Warning -->
    <div
      v-else-if="isOpen && alertData.type === 'warning'"
      class="alert warning"
    >
      <p class="alert--content">
        {{ alertData.description }}
      </p>
    </div>

    <!-- Confirm  -->
    <div v-else-if="isOpen && alertData.type === 'confirm'" class="alert">
      <p class="alert--content">
        {{ alertData.description }}
      </p>
      <div class="alert__buttons">
        <button class="alert__buttons-cancel" @click="confirm(false)">
          취소
        </button>
        <button class="alert__buttons-delete" @click="confirm(true)">
          삭제
        </button>
      </div>
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
      if (type === 'info' || type === 'warning') {
        setTimeout(() => {
          // callback && callback()
          this.isOpen = false
        }, 3000)
      }
    })
  },
  methods: {
    confirm(answer) {
      this.$nuxt.$emit('alert-confirm', answer)
      this.isOpen = false
    },
  },
}
</script>

<style lang="scss" scoped>
.alert {
  width: 85%;
  max-width: 250px;
  height: fit-content;
  padding: 20px;
  position: fixed;
  top: 5%;
  left: 50%;
  transition: top 0.3s ease-in-out;
  transform: translateX(-50%);
  background: #fff;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.2);
  &.info {
    color: #47ac51;
    background-color: #e3fde1;
    box-shadow: 0px 3px 4px rgba(108, 170, 92, 0.3);
  }
  &.warning {
    color: #eb5757;
    background-color: #fdf5f2;
    box-shadow: 0px 3px 4px rgba(227, 88, 88, 0.3);
  }
  .alert--content {
    margin: 0;
    font-size: $font_size_tiny;
  }
  border-radius: 5px;
  &__buttons {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-top: 20px;
    > button {
      font-size: 12px;
      margin-left: 5px;
      padding: 5px 15px;
      background: none;
      outline: none;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      &.alert__buttons-delete {
        background-color: rgb(87, 140, 255);
        color: #fff;
      }
      &.alert__buttons-cancel {
        background-color: #fff;
        border: 1px solid #ddd;
        color: rgb(87, 140, 255);
      }
    }
  }
}
.slide-open-enter-active,
.slide-open-leave-active {
  transition: top 0.3s ease-out;
}
.slide-open-enter,
.slide-open-leave-to {
  top: -150px;
}
</style>
