<template>
  <div class="container">
    <div class="section">
      <h2>都道府県を選択</h2>
      <PrefList class="prefList" />
    </div>
    <div class="section">
      <h2>グラフ</h2>
      <!-- 選択された都道府県の人口をチャートで表示 -->
      <DisplayPopulationLineChart class="chart" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DisplayPopulation',
}
</script>

<style scoped>
/* ----- 都道府県一覧 ----- */
.prefList {
  width: 96%;
  margin: 0 auto;
  padding: 0;
}

/* ----- チャート ----- */
.chart {
  width: 96%;
  margin: 0 auto;
}
</style>
