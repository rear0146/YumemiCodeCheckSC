export const state = () => ({
    prefs: [],
    population: []
})
  
export const mutations = {
    setPref(state, data) {
        state.prefs = data
    },
    setPopulation(state, data) {
        const indexOfPopulation = data.result.data.map((el) => el.label).indexOf("総人口")
        const obj = {
        pref: data.pref,
        data: data.result.data[indexOfPopulation].data
        }
        state.population.push(obj)
    },
    removePref(state, pref) {
        const indexOfPref = state.population.map(el => el.pref).indexOf(pref)
        state.population.splice(indexOfPref,1)
    }
}
  
export const getters = {
    getPref: (state) => {
        return state.prefs
    },
    getDatasets: (state) => {
        const datasets = []

        state.population.forEach((item) => {
        const obj = {
            pref: item.pref,
            data: item.data.map((obj) => obj.value)
        }
        datasets.push(obj)
        })
        return datasets
    }
}

export const actions = {
    async fetchPref({ commit }) {
        const url = '/api/v1/prefectures'
        const data = await this.$axios.$get(url)
        commit('setPref', data.result)
    },
    async fetchPopulation({ commit }, pref) {
        const url = '/api/v1/population/composition/perYear'
        const code = '?prefCode=' +`${pref.prefCode}`
        const data = await this.$axios.$get(url+code)
        if (data.result) {
        commit('setPopulation', { result: data.result, pref })
        }
    }
}