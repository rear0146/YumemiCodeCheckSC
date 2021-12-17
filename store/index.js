export const state = () => ({
    pref: [],
    population: []
})
  
export const mutations = {
    setPref(state, data) {
        state.pref = data
    }
}
  
export const getters = {
    getPref: (state) => {
        return state.pref
    }
}
  
export const actions = {
    async fetchPref({ commit }) {
        const data = await this.$axios.$get('/api/v1/prefectures')
        commit('setPref', data.result)
    }
}