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
})

export const mutations = {
  setCurrentPost(state, post) {
    state.currentPost = post
  },
  setAllPosts(state, post) {
    state.allPosts = post
  },
}

export const actions = {
  async getCurrentPost({ commit }, postId) {
    const query = groq`*[_type == "post" && id == "${postId}"][0]`
    const data = await this.$sanity.fetch(query)
    commit('setCurrentPost', data)
    return data
  },
  async getAllPosts({ commit }) {
    const query = groq`*[_type == "post"]`
    const data = await this.$sanity.fetch(query)
    commit('setAllPosts', data)
  },
}
