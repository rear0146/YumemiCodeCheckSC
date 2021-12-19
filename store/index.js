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
        const RGB = this.$prefCodeToColor(data.pref.prefCode)
        const obj = {
        pref: data.pref,
        data: data.result.data[indexOfPopulation].data,
        color: `rgba(${RGB[0]},${RGB[1]},${RGB[2]},1)`
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
    getLabels: (state) => {
        if (state.population.length < 1) return []
        return state.population[0].data.map((obj) => obj.year)
    },
    getDatasets: (state) => {
        const datasets = []

        state.population.forEach((item) => {
            const obj = {
                label: item.pref.prefName,
                data: item.data.map((obj) => obj.value),
                fill: false,
                backgroundColor: item.color,
                borderColor: item.color,
            }
            datasets.push(obj)
        })
        return datasets
    },
    getChartData: (state, getters) => {
        const chartData = {
        labels: getters.getLabels,
        datasets: getters.getDatasets
        }
        return JSON.parse(JSON.stringify(chartData))
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