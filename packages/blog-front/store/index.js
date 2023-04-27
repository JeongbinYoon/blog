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
})

export const mutations = {
  setCurrentPost(state, post) {
    state.currentPost = post
  },
  setAllPosts(state, post) {
    state.allPosts = post
  },
  setCurrentCreatedDocId(state, id) {
    state.createdDocId = id
    console.log(`Document was created, ID ${id}`)
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
}
