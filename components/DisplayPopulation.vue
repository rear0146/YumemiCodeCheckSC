<template>
  <div>
    <div>
      <h2>都道府県を選択</h2>
        <ul>
        <li v-for="pref in prefs" :key="pref.prefCode">
          <label>
              <input
                :id="pref"
                v-model="selectedPrefs"
                type="checkbox"
                :value="pref"
                @change="togglePref(pref)"
              />
              {{ pref.prefName }}
          </label>
        </li>
      </ul>
    </div>
    <div>
      <h2>グラフ</h2>
        <LineChart :chart-data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script>
export default{
  name: 'DisplayPopulation',
  data () {
    return { 
      selectedPrefs: [],
      chartOptions: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                callback: (label, index, labels) =>
                  `${label.toLocaleString()}人`
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                callback: (label, index, labels) => `${label}年`
              }
            }
          ]
        }
      }
      }
  },
  computed: {
    prefs() {
      return this.$store.getters.getPref
    },
    chartData() {
      return this.$store.getters.getChartData
    }
  },
  mounted() {
    this.fetchPref()
  },
  methods: {
    fetchPref() {
      this.$store.dispatch('fetchPref')
    },
    togglePref(pref) {
      if (this.selectedPrefs.includes(pref)) {
        this.$store.dispatch('fetchPopulation', pref)
      } else {
        this.$store.commit('removePref', pref)
      }
    }
  }
}
</script>