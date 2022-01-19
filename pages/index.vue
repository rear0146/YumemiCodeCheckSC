<template>
  <div>
    <DisplayPopulation />
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>

<style>
html {
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  padding: 0;
}

/* ---- 共通 ---- */
.container {
  width: 96%;
  max-width: 760px;
  min-height: 750px;
  margin: 10px auto;
  padding: 10px 0 5px 0;
  border-radius: 20px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.4);
}

.section {
  margin-bottom: 5px;
}

h2 {
  margin: 3px 10px;
  color: #464ec5;
  font-size: 20px;
  border-bottom: solid 3px #464ec5;
}
</style>
