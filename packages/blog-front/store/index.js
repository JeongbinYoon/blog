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
  userInfo: null,
  currentPostHeadings: [],
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
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  setCurrentPostHeadings(state, headings) {
    state.currentPostHeadings = headings
  },
}

export const getters = {
  GET_CURRENT_POST_HEADING: (state) => state.currentPostHeadings,
}

export const actions = {
  async nuxtServerInit({ dispatch }, { req }) {
    const cookies = req?.headers?.cookie
    // console.log(cookies)
    // console.log(req?.headers, 'req?.headers')
    if (cookies) {
      const cookieObj = req.headers.cookie?.split(';').reduce((acc, cur) => {
        const cookie = cur.split('=').map((item) => item.trim())
        return cookie?.length ? { ...acc, [cookie[0]]: cookie[1] } : { ...acc }
      }, {})
      if (cookieObj) {
        // console.log(cookieObj, 'cookieObj')
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
    console.dir(data)
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

  // SANITY
  // async checkUserEmail({ commit }, userEmail) {
  //   const query = groq`*[_type == "users" && userEmail == "${userEmail}"][0]`
  //   const data = await this.$sanity.fetch(query)
  //   const answer = !!data
  //   commit('setCheckUserEmail', answer)
  // },

  // 계정 생성
  async createUser(_, newUser) {
    try {
      const result = await this.$axios.post('/users/signup', newUser)
      console.log(result)
      if (result.data === false) {
        console.error('User already exists.')
        return false
      } else return true
    } catch (e) {
      console.error(e)
    }
  },

  // SANITY
  async checkUserAccount({ dispatch }, { userEmail, userPassword }) {
    const query = groq`*[_type == "users" && userEmail == "${userEmail}"][0]`
    const data = await this.$sanity.fetch(query)

    // 요청한 Email에 대한 계정이 있는 경우 비밀번호 확인
    if (data) {
      // 유저 정보 조회
      // email, password OK
      if (userPassword === data.userPassword) {
        await dispatch('login', data._id)
      }
    }
  },

  // async checkUserAccount({ dispatch }, { userEmail, userPassword }) {
  //   const result = await this.$axios.get(
  //     '/users/login',
  //     userEmail,
  //     userPassword
  //   )
  //   console.log(result, '<<<< User')

  //   let isLoginAllowed = false

  //   // 요청한 Email에 대한 계정이 있는 경우 비밀번호 확인
  //   if (result.data === false) {
  //     console.log('User not found!')
  //     return false
  //   } else {
  //     // email, password OK
  //     await dispatch('login', data._id)
  //   }
  // },

  // async login({ dispatch }, userId) {
  // },
  logout({ commit }) {
    // commit('setUserId', null)
    commit('setUserInfo', null)
    Cookie.remove('userId')
  },
  async login({ dispatch }, userId) {
    await dispatch('getUserInfo', userId)
  },
  async getUserInfo({ commit }, userId) {
    const query = groq`*[_type == "users" && _id == "${userId}"][0]`
    try {
      const data = await this.$sanity.fetch(query)
      // console.log('User', data)
      if (data) {
        commit('setUserInfo', data)
        Cookie.set('userId', userId)
        // commit('setUserId', userId)
      } else {
        throw new Error('user not found.')
      }
    } catch (err) {
      console.error(err, 'ERROR')
      Cookie.remove('userId')
    }
  },
  setPostHeadings({ commit }, headings) {
    commit('setCurrentPostHeadings', headings)
  },
}
