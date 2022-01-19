<template>
  <div>
    <!-- 選択された都道府県の人口をチャートで表示 -->
    <LineChart
      v-if="$store.state.population.length"
      :chart-data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script>
export default {
  name: 'DisplayPopulationLineChart',
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