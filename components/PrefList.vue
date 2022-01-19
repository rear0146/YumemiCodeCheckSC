<template>
  <div>
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
</template>

<script>
export default {
  name: 'PrefList',
  data() {
    return {
      selectedPrefs: [],
    }
  },
  computed: {
    prefs() {
      return this.$store.getters.getPref
    },
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
        '--color': `rgba(${RGB[0]},${RGB[1]},${RGB[2]},1)`,
      }
    },
    togglePref(pref) {
      // 各都道府県が選択/選択解除されたときの処理
      if (this.selectedPrefs.includes(pref)) {
        this.$store.dispatch('fetchPopulation', pref)
      } else {
        this.$store.commit('removePref', pref)
      }
    },
  },
}
</script>

<style scoped>
.prefList {
  list-style-type: none;
}

.prefList li {
  display: inline-block;
  margin: 5px 3px;
}

.prefList li label {
  cursor: pointer;
}

.prefList li input[type='checkbox'] {
  filter: alpha(opacity=0);
  -moz-opacity: 0;
  opacity: 0;
  -webkit-appearance: none;
  appearance: none;
  position: absolute;
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

.prefList li input:focus ~ .prefName {
  border-radius: 20px;
  transition-duration: 0.2s;
  box-shadow: 5px 3px 5px rgba(0, 0, 0, 0.4);
}

.prefList li input:checked ~ .prefName {
  color: #ffffff;
  background-color: var(--color);
  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.3) inset;
}
</style>
