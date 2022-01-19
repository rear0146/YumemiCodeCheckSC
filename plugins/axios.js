export default function ({ $axios, $config, error }, inject) {
  const api = $axios.create({
    headers: {
      common: {
        Accept: 'application/json',
      },
      'X-API-KEY': $config.RESAS_API_KEY,
      'Content-Type': 'application/json',
    },
    data: {},
  })
  $axios.onError((err) => {
    return Promise.resolve(err.response)
  })
  api.setBaseURL('https://opendata.resas-portal.go.jp')
  inject('axios', api)
}
