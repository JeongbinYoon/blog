import { groq } from '@nuxtjs/sanity'
import Cookie from 'js-cookie'
export const state = () => ({
  currentPost: {
    body: [
      {
        children: [{ text: '' }],
      },
    ],
  },
  allPosts: [],
  createdDocId: '',
  recentPosts: [],
  isExistingEmail: false,
  userId: null,
  userInfo: null,
})

export const mutations = {
  setAllPosts(state, posts) {
    state.allPosts = posts
  },
  setRecentPosts(state, posts) {
    state.recentPosts = posts
  },
  setCurrentPost(state, post) {
    state.currentPost = post
  },
  setCheckUserEmail(state, answer) {
    state.isExistingEmail = answer
  },
  setUserId(state, userId) {
    state.userId = userId
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
}

export const actions = {
  async nuxtServerInit({ dispatch }, { req }) {
    const cookies = req.headers.cookie
    if (cookies) {
      const cookieObj = req.headers.cookie?.split(';').reduce((acc, cur) => {
        const cookie = cur.split('=').map((item) => item.trim())
        return cookie?.length ? { ...acc, [cookie[0]]: cookie[1] } : { ...acc }
      }, {})
      if (cookieObj) {
        const userId = cookieObj?.userId
        if (userId) {
          await dispatch('login', userId)
        }
      }
    }
  },
  async getCurrentPost({ commit }, id) {
    const query = groq`*[_type == "post" && _id == "${id}"][0]`
    const data = await this.$sanity.fetch(query)
    commit('setCurrentPost', data)
    return data
  },

  async getAllPosts({ commit }) {
    const query = groq`*[_type == "post"] | order(_createdAt desc)`
    const data = await this.$sanity.fetch(query)
    commit('setAllPosts', data)
  },

  async getRecentPosts({ commit }) {
    const query = groq`*[_type == "post"] | order(_createdAt desc) [0...3]`
    const data = await this.$sanity.fetch(query)
    commit('setRecentPosts', data)
  },

  async checkUserEmail({ commit }, userEmail) {
    const query = groq`*[_type == "users" && userEmail == "${userEmail}"][0]`
    const data = await this.$sanity.fetch(query)
    const answer = !!data
    commit('setCheckUserEmail', answer)
  },
  async checkUserAccount({ dispatch }, { userEmail, userPassword }) {
    const query = groq`*[_type == "users" && userEmail == "${userEmail}"][0]`
    const data = await this.$sanity.fetch(query)
    console.log(data, '<<<<<data')
    let isLoginAllowed = false

    // 요청한 Email에 대한 계정이 있는 경우 비밀번호 확인
    if (data) {
      userPassword === data.userPassword
        ? (isLoginAllowed = true)
        : (isLoginAllowed = false)
    }

    // email, password OK
    if (isLoginAllowed) {
      await dispatch('login', data._id)
    }
  },
  async login({ dispatch }, userId) {
    await dispatch('getUserInfo', userId)
  },
  logout({ commit }) {
    Cookie.remove('userId')
    commit('setUserId', null)
    commit('setUserInfo', null)
  },
  async getUserInfo({ commit }, userId) {
    const query = groq`*[_type == "users" && _id == "${userId}"][0]`
    try {
      const data = await this.$sanity.fetch(query)
      if (data) {
        commit('setUserInfo', data)
        commit('setUserId', userId)
        Cookie.set('userId', userId)
      } else {
        throw new Error('user not found.')
      }
    } catch (err) {
      console.error(err, 'ERROR')
      Cookie.remove('userId')
    }
  },
}
