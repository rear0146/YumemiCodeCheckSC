import Vuex from 'vuex'
import { createLocalVue, mount } from '@vue/test-utils'
import DisplayPopulation from '@/components/DisplayPopulation.vue'
import * as index from '@/store'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('DisplayPopulation', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(DisplayPopulation, {
      store: index,
      localVue,
    })
  })
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  describe('都道府県を選択', () => {
    test('チェックボックスが存在', () => {
      expect(wrapper.contains('input[type="checkbox"]')).toBe(true)
    })
  })

  describe('selectedPrefの状態', () => {
    beforeEach(() => {
      wrapper.find('input[type="index"]').setValue('exPref')
    })

    test('dataに入力が反映されること', () => {
      expect(wrapper.vm.todoForm.title).toBe('exPref')
    })

    test('ボタンクリックでhandleAddTodoが呼ばれること', () => {
      const mock = jest.fn()
      wrapper.setMethods({ handleAddTodo: mock })
      wrapper.find('button').trigger('click')
      expect(mock).toBeCalled()
    })
  })
})
