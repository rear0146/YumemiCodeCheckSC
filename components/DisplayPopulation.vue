<template>
  <div class="container">
    <div class="section">
      <h2>都道府県を選択</h2>
      <PrefList class="prefList" />
    </div>
    <div class="section">
      <h2>グラフ</h2>
      <!-- 選択された都道府県の人口をチャートで表示 -->
      <LineChart
        v-if="$store.state.population.length"
        :chart-data="chartData"
        :options="chartOptions"
        class="chart"
      />
    </div>
  </div>
</template>

<script>
import PrefList from './PrefList.vue';
export default {
  name: 'DisplayPopulation',
  components: {
    PrefList
  },
  data() {
    return {
      chartOptions: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                callback: (label) => `${label.toLocaleString()}人`,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                callback: (label) => `${label}年`,
              },
            },
          ],
        },
      },
    }
  },
  computed: {
    chartData() {
      return this.$store.getters.getChartData
    },
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

/* ----- チャート ----- */
.chart {
  width: 96%;
  margin: 0 auto;
}
</style>
