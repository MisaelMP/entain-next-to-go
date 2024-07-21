import { mount } from '@vue/test-utils'
import CategoryToggle from '@/components/CategoryToggle.vue'
import { setActivePinia, createPinia } from 'pinia'
import { useRaceStore } from '@/stores/raceStore' // Update the path to the 'raceStore' module if necessary

// Make sure the useRaceStore function is exported in the raceStore.ts file
export { useRaceStore }
import { describe, beforeEach, it, expect } from 'vitest'

describe('CategoryToggle', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders category buttons', () => {
    const raceStore = useRaceStore()
    const wrapper = mount(CategoryToggle)

    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(raceStore.categories.length)

    buttons.forEach((button, index) => {
      expect(button.text()).toBe(raceStore.categories[index].name)
    })
  })

  it('selects category on button click', async () => {
    const raceStore = useRaceStore()
    const wrapper = mount(CategoryToggle)

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(raceStore.selectedCategory).toBe(raceStore.categories[0].id)
  })
})
