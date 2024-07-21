import { mount } from '@vue/test-utils'
import RaceList from '@/components/RaceList.vue'
import { setActivePinia, createPinia } from 'pinia'
import { useRaceStore } from '@/stores/raceStore'
import { describe, beforeEach, it, expect } from 'vitest'

describe('RaceList', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders race list', async () => {
    const raceStore = useRaceStore()
    raceStore.races = [
      {
        race_id: '1',
        meeting_name: 'Meeting 1',
        race_number: 1,
        advertised_start: { seconds: Math.floor(Date.now() / 1000) + 3600 },
        category_id: '4a2788f8-e825-4d36-9894-efd4baf1cfae'
      }
      // Add more races as needed
    ]

    const wrapper = mount(RaceList)

    expect(wrapper.findAll('li').length).toBe(1)
    expect(wrapper.text()).toContain('Meeting 1 - Race 1')
  })
})
