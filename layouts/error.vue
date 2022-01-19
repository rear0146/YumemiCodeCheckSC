<template>
  <div class="container">
    <h1>{{ error.statusCode }}</h1>
    <h1>{{ errorMessage }}</h1>
    <NuxtLink to="/" class="TopPageLink">トップページへ戻る</NuxtLink>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    errorMessage() {
      if (this.error.statusCode === 404) {
        return 'ページが存在しません'
      }
      if (this.error.message) {
        return this.error.message
      }
      if (this.error.statusCode === 429) {
        return 'APIへのリクエスト回数が多く、 1秒あたりのリクエスト平均数・リクエスト数/日のうち、どちらかの制限を超えました。リトライしてください'
      }
      return 'エラーが発生しました'
    },
  },
}
</script>

<style scoped>
h1 {
  text-align: center;
}

.TopPageLink {
  color: #464ec5;
  display: block;
  text-align: center;
  margin: 30px auto;
}
</style>
