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
        {{ datasets }}
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
    },
    datasets() {
      return this.$store.getters.getDataset
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