import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import * as index from '@/store'

const localVue = createLocalVue()
localVue.use(Vuex)

let action
const testedAction = (context = {}, payload = {}) => {
  return index.actions[action](context, payload)
}
let mockAxiosGetResult
jest.mock('axios', () => ({
  $get: jest.fn(() => Promise.resolve(mockAxiosGetResult)),
}))

describe('store/index.js', () => {
    let store
    beforeEach(() => {
      store = new Vuex.Store(index)
    })
    describe('getters', () => {
      test('prefの値を取得', () => {
        store.replaceState({
          pref: [{prefCode: 1, prefName: "北海道"}]
        })
        expect(store.getters['this.pref']).toBe([{prefCode: 1, prefName: "北海道"}])
      })
    })
    describe('actions', () => {
      let commit
      let state
      beforeEach(() => {
        commit = store.commit
        state = store.state
      })
      test('fetchPref', async done => {
        action = "fetchPref"
        await testedAction({ commit, state })
        expect(store.getters['this.pref']).toBe({prefCode: 1, prefName: "北海道"})
        done()
      })
    })
  })