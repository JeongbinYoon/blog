import { groq } from '@nuxtjs/sanity'

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
  isLoginAllowed: false,
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
  setIsLoginAllowed(state, answer) {
    state.isLoginAllowed = answer
  },
}

export const actions = {
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
    const query = groq`*[_type == "post"] | order(_createdAt desc) [0...4]`
    const data = await this.$sanity.fetch(query)
    console.log(data)
    commit('setRecentPosts', data)
  },

  async checkUserEmail({ commit }, userEmail) {
    const query = groq`*[_type == "users" && userEmail == "${userEmail}"][0]`
    const data = await this.$sanity.fetch(query)
    const answer = !!data
    commit('setCheckUserEmail', answer)
  },
  async checkUserAccount({ commit }, { userEmail, userPassword }) {
    const query = groq`*[_type == "users" && userEmail == "${userEmail}"][0]`
    const data = await this.$sanity.fetch(query)
    let answer = false
    if (data) {
      userPassword === data.userPassword ? (answer = true) : (answer = false)
    } else {
      console.log('계정없음')
    }
    commit('setIsLoginAllowed', answer)
  },
}
