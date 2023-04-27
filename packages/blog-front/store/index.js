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
}

export const actions = {
  async getCurrentPost({ commit }, id) {
    const query = groq`*[_type == "post" && _id == "${id}"][0]`
    const data = await this.$sanity.fetch(query)
    commit('setCurrentPost', data)
    return data
  },

  async getAllPosts({ commit }) {
    const query = groq`*[_type == "post"]`
    const data = await this.$sanity.fetch(query)
    commit('setAllPosts', data)
  },
  async getRecentPosts({ commit }) {
    const query = groq`*[_type == "post"] | order(createdAt desc) [0...4]`
    const data = await this.$sanity.fetch(query)
    console.log(data)
    commit('setRecentPosts', data)
  },
}
