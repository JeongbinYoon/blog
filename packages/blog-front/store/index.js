import { groq } from '@nuxtjs/sanity'

export const state = () => ({
  currentPost: {
    body: [
      {
        children: [{ text: '' }],
      },
    ],
  },
})

export const mutations = {
  setCurrentPost(state, post) {
    state.currentPost = post
  },
}

export const actions = {
  async getCurrentPost({ commit }) {
    const query = groq`*[_type == "post"][0]`
    const data = await this.$sanity.fetch(query)
    commit('setCurrentPost', data)
  },
}
