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
              />
              {{ pref.prefName }}
          </label>
        </li>
      </ul>
    </div>
    <div>
      <h2>グラフ</h2>
        {{ selectedPrefs }}
    </div>
  </div>
</template>

<script>
export default{
  name: 'DisplayPopulation',
  data () {
    return { 
      selectedPrefs: []
      }
  },
  computed: {
    prefs() {
      return this.$store.getters.getPref
    }
  },
  mounted() {
    this.fetchPref()
  },
  methods: {
    fetchPref() {
      this.$store.dispatch('fetchPref')
    }
  }
}
</script>