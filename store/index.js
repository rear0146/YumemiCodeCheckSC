export const state = () => ({
  prefs: [], // 都道府県一覧
  population: [], // 選択された都道府県と人口，都道府県固有の色
})

export const mutations = {
  setPref(state, data) {
    // 都道府県一覧のセット
    state.prefs = data
  },
  setPopulation(state, data) {
    // 選択された都道府県と人口，都道府県固有の色のセット
    const indexOfPopulation = data.result.data
      .map((el) => el.label)
      .indexOf('総人口')
    const boundaryYear = data.result.boundaryYear
    const RGB = this.$prefCodeToColor(data.pref.prefCode)
    const obj = {
      pref: data.pref,
      data: data.result.data[indexOfPopulation].data.filter((val) => {
        return val.year <= boundaryYear
      }),
      color: `rgba(${RGB[0]},${RGB[1]},${RGB[2]},1)`,
    }
    state.population.push(obj)
  },
  removePref(state, pref) {
    // populationから引数prefの要素を削除
    const indexOfPref = state.population.map((el) => el.pref).indexOf(pref)
    state.population.splice(indexOfPref, 1)
  },
}

export const getters = {
  getPref: (state) => {
    // 都道府県一覧
    return state.prefs
  },
  getLabels: (state) => {
    // チャートの横軸(年)
    if (state.population.length < 1) return []
    return state.population[0].data.map((obj) => obj.year)
  },
  getDatasets: (state) => {
    // チャートに表示するデータセット
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
    // LabelsとDatasetsをまとめたもの
    const chartData = {
      labels: getters.getLabels,
      datasets: getters.getDatasets,
    }
    return JSON.parse(JSON.stringify(chartData))
  },
}

export const actions = {
  async fetchPref({ commit }) {
    // 都道府県一覧を読み込む
    const url = '/api/v1/prefectures'
    const data = await this.$axios.$get(url)
    commit('setPref', data.result)
  },
  async fetchPopulation({ commit }, pref) {
    // 引数prefの都道府県の人口データを読み込む
    const url = '/api/v1/population/composition/perYear'
    const code = '?prefCode=' + `${pref.prefCode}`
    const data = await this.$axios.$get(url + code)
    if (data.result) {
      commit('setPopulation', { result: data.result, pref })
    }
  },
}
