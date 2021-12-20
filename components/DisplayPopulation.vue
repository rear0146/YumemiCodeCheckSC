<template>
  <div class="container">
    <div class="section">
      <h2>都道府県を選択</h2>
      <ul class="prefList">
        <!-- 都道府県の一覧 -->
        <li v-for="pref in prefs" :key="pref.prefCode">
          <label>
              <input
                :id="pref"
                v-model="selectedPrefs"
                type="checkbox"
                :value="pref"
                @change="togglePref(pref)"
              />
              <div :style="prefNameStyle(pref.prefCode)" class="prefName">
              {{ pref.prefName }}
              </div>
          </label>
        </li>
      </ul>
    </div>
    <div class="section">
      <h2>グラフ</h2>
      <!-- 選択された都道府県の人口をチャートで表示 -->
        <LineChart 
        v-if="selectedPrefs.length"
        :chart-data="chartData" 
        :options="chartOptions"
        class="chart" />
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
                callback: (label) =>`${label.toLocaleString()}人`
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                callback: (label) => `${label}年`
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
      // 都道府県の読み込み
      this.$store.dispatch('fetchPref')
    },
    prefNameStyle(prefCode) { 
      // 各都道府県固有の色
      const RGB = this.$prefCodeToColor(prefCode)
      return {
        '--color' : `rgba(${RGB[0]},${RGB[1]},${RGB[2]},1)`
      }
    },
    togglePref(pref) { 
      // 各都道府県が選択/選択解除されたときの処理
      if (this.selectedPrefs.includes(pref)) {
        this.$store.dispatch('fetchPopulation', pref)
      } else {
        this.$store.commit('removePref', pref)
      }
    }
  }
}
</script>

<style scoped>
/* ----- 都道府県一覧 ----- */
.prefList {
  width: 96%;
  list-style-type: none;
  margin: 0 auto;
  padding: 0;
}

.prefList li {
  display: inline-block;
  margin: 5px 3px;
}

.prefList li input {
display: none;
}

/* ----- 一覧の各都道府県 ----- */
.prefName {
  padding: 2px 10px;
  border: 1px solid var(--color);
  color: var(--color);
  border-radius: 20px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
}

.prefName:hover {
  border-radius: 20px;
  transition-duration: 0.2s;
  box-shadow: 5px 3px 5px rgba(0, 0, 0, 0.4);
}

.prefList li input:checked ~ .prefName {
  color: #FFFFFF;
  background-color: var(--color);
  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.3) inset;
}

/* ----- チャート ----- */
.chart {
  width: 96%;
  margin: 0 auto;
}

</style>