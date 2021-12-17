export const state = () => ({
    prefs: [],
    population: []
})
  
export const mutations = {
    setPref(state, data) {
        state.prefs = data
    }
}
  
export const getters = {
    getPref: (state) => {
        return state.prefs
    }
}
  
export const actions = {
    async fetchPref({ commit }) {
        const data = await this.$axios.$get('/api/v1/prefectures')
        commit('setPref', data.result)
    }
}