<template>
  <div class="login">
    <h2 class="login-logo">Logo</h2>
    <form class="login__form" @submit.prevent>
      <!-- 아이디(이메일) -->
      <input
        ref="emailRef"
        v-model="userEmail"
        type="text"
        placeholder="아이디(이메일)"
        @input="removeFocus"
      />
      <input
        v-if="isJoin"
        ref="userNameRef"
        v-model="userName"
        type="text"
        placeholder="이름"
        @input="removeFocus"
      />
      <!-- 비밀번호 -->
      <input
        ref="userPasswordRef"
        v-model="userPassword"
        type="password"
        placeholder="비밀번호"
        @input="removeFocus"
      />
      <!-- 비밀번호 확인 -->
      <input
        v-if="isJoin"
        ref="userPasswordCheckRef"
        v-model="userPasswordCheck"
        type="password"
        placeholder="비밀번호 확인"
        @input="removeFocus"
      />

      <button
        v-if="!isJoin"
        class="login__form--login"
        :class="{ active: !isJoin }"
        @click.prevent="onLogin"
      >
        로그인
      </button>
      <button
        v-if="isJoin"
        class="login__form--join"
        :class="{ active: isJoin }"
        @click.prevent="onJoin"
      >
        회원가입
      </button>

      <div class="login__form--separator"></div>

      <button
        v-if="!isJoin"
        class="login__form--join"
        @click.prevent="changeForm"
      >
        회원가입
      </button>
      <button
        v-if="isJoin"
        class="login__form--login"
        @click.prevent="changeForm"
      >
        이메일 로그인
      </button>
    </form>
  </div>
</template>

<script>
import { client } from '@/api'

export default {
  data() {
    return {
      isJoin: false,
      userEmail: '',
      userName: '',
      userPassword: '',
      userPasswordCheck: '',
      passwordChecked: false,
    }
  },
  methods: {
    async onLogin() {
      let type = ''
      let description = ''

      if (this.userEmail !== '' && this.userPassword !== '') {
        type = 'info'
      } else type = 'warning'

      if (this.userEmail === '') {
        description = '아이디를 입력해주세요'
        this.onFocus('emailRef')
      } else if (this.userPassword === '') {
        description = '비밀번호를 입력해주세요'
        this.onFocus('userPasswordRef')
      } else if (this.userEmail && this.userPassword) {
        // 로그인 가능 여부 확인 (계정, 패스워드 체크)
        await this.$store.dispatch('checkUserAccount', {
          userEmail: this.userEmail,
          userPassword: this.userPassword,
        })

        const userId = this.$store.state.userInfo?._id

        if (userId) {
          description = '로그인 성공'
        } else {
          type = 'warning'
          description = '아이디, 비밀번호를 다시 확인해주세요'
          this.onFocus('userPasswordRef')
        }
      }
      this.onAlert(type, description)
    },

    async onJoin() {
      this.passwordChecked = this.userPassword === this.userPasswordCheck
      let type = ''
      if (
        this.userEmail !== '' &&
        this.userPassword !== '' &&
        this.userPasswordCheck !== '' &&
        this.passwordChecked === true
      ) {
        type = 'info'
      } else type = 'warning'

      let description = ''
      if (this.userEmail === '') {
        description = '아이디를 입력해주세요'
        this.onFocus('emailRef')
      } else if (this.userName === '') {
        description = '이름을 입력해주세요'
        this.onFocus('userNameRef')
      } else if (this.userPassword === '' || this.userPasswordCheck === '') {
        description = '비밀번호를 입력해주세요'
        if (this.userPassword === '') {
          this.onFocus('userPasswordRef')
        } else {
          this.onFocus('userPasswordCheckRef')
        }
      } else if (!this.passwordChecked) {
        description = '비밀번호가 다릅니다'
        this.onFocus('userPasswordRef')
      } else if (this.userEmail && this.userPassword && this.passwordChecked) {
        const isExistingEmail = await this.$store.dispatch('createUser', {
          email: this.userEmail,
          name: this.userName,
          password: this.userPassword,
        })

        if (isExistingEmail) {
          type = 'warning'
          description = '이미 존재하는 아이디입니다'
        } else {
          type = 'info'
          description = '회원가입이 완료되었습니다'
        }
      }
      this.onAlert(type, description)
    },
    onAlert(type, description, trigger) {
      $nuxt.$emit('alert', {
        type,
        description,
        title: '알림',
        trigger,
        callback: () => {
          if (type !== 'warning') this.$router.push(`/`)
        },
      })
    },
    changeForm() {
      this.isJoin = !this.isJoin
      this.userEmail = ''
      this.userName = ''
      this.userPassword = ''
      this.userPasswordCheck = ''
    },
    onFocus(target) {
      this.$refs[target].focus()
      this.$refs[target].classList.add('warning')
    },
    removeFocus(e) {
      e.target.classList.remove('warning')
    },
  },
  // async checkUserEmail() {
  //   await this.$store.dispatch('checkUserEmail', this.userEmail)
  // },
}
</script>

<style lang="scss" scoped>
.login {
  width: 90%;
  max-width: 320px;
  margin: 0 auto;
  margin-top: 60px;
  text-align: center;
  &-logo {
    font-size: 40px;
    margin: 0 0 20px 0;
  }
  &__form {
    display: flex;
    flex-direction: column;
    input,
    button {
      height: 40px;
      margin-bottom: 10px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-sizing: border-box;
      color: #777;
      outline: none;

      &.login__form--login {
        background-color: #f3f3f3;
        border-color: #eaeaea;
        cursor: pointer;
        &.active {
          margin-bottom: 0;
          box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.1);
        }
        &:focus {
          box-shadow: inset 0 -2px 6px rgba(0, 0, 0, 0.1);
        }
      }
      &.login__form--join {
        background-color: #fdf5f2;
        border: 1px solid #f8c5c3;
        cursor: pointer;
        color: #eb5757;
        &.active {
          margin-bottom: 0;
          box-shadow: inset 0 -1px 0 rgba(227, 88, 88, 0.3);
        }
        &:focus {
          box-shadow: inset 0 -2px 6px rgba(227, 88, 88, 0.2);
        }
      }

      &.warning:focus {
        border: 1px solid #eb5757;
      }
    }

    &--separator {
      border-bottom: 1px solid #ccc;
      margin: 20px 0;
    }
  }
}
</style>
