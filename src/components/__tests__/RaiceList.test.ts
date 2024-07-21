// src/components/__tests__/RaceList.test.ts
import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useRaceStore } from '@/stores/raceStore'
import RaceList from '@/components/RaceList.vue'
import RaceItem from '@/components/RaceItem.vue'

vi.mock('@/services/raceService', () => ({
  fetchRaces: vi.fn().mockResolvedValue({
    next_to_go_ids: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    race_summaries: {
      '1': {
        race_id: '1',
        category_id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61',
        advertised_start: { seconds: Math.floor(Date.now() / 1000) + 600 },
        meeting_name: 'Meeting 1',
        race_number: 1
      },
      '2': {
        race_id: '2',
        category_id: '161d9be2-e909-4326-8c2c-35ed71fb460b',
        advertised_start: { seconds: Math.floor(Date.now() / 1000) + 1200 },
        meeting_name: 'Meeting 2',
        race_number: 2
      },
      '3': {
        race_id: '3',
        category_id: '4a2788f8-e825-4d36-9894-efd4baf1cfae',
        advertised_start: { seconds: Math.floor(Date.now() / 1000) + 1800 },
        meeting_name: 'Meeting 3',
        race_number: 3
      },
      '4': {
        race_id: '4',
        category_id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61',
        advertised_start: { seconds: Math.floor(Date.now() / 1000) + 2400 },
        meeting_name: 'Meeting 4',
        race_number: 4
      },
      '5': {
        race_id: '5',
        category_id: '161d9be2-e909-4326-8c2c-35ed71fb460b',
        advertised_start: { seconds: Math.floor(Date.now() / 1000) + 3000 },
        meeting_name: 'Meeting 5',
        race_number: 5
      },
      '6': {
        race_id: '6',
        category_id: '4a2788f8-e825-4d36-9894-efd4baf1cfae',
        advertised_start: { seconds: Math.floor(Date.now() / 1000) + 3600 },
        meeting_name: 'Meeting 6',
        race_number: 6
      },
      '7': {
        race_id: '7',
        category_id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61',
        advertised_start: { seconds: Math.floor(Date.now() / 1000) + 4200 },
        meeting_name: 'Meeting 7',
        race_number: 7
      },
      '8': {
        race_id: '8',
        category_id: '161d9be2-e909-4326-8c2c-35ed71fb460b',
        advertised_start: { seconds: Math.floor(Date.now() / 1000) + 4800 },
        meeting_name: 'Meeting 8',
        race_number: 8
      },
      '9': {
        race_id: '9',
        category_id: '4a2788f8-e825-4d36-9894-efd4baf1cfae',
        advertised_start: { seconds: Math.floor(Date.now() / 1000) + 5400 },
        meeting_name: 'Meeting 9',
        race_number: 9
      },
      '10': {
        race_id: '10',
        category_id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61',
        advertised_start: { seconds: Math.floor(Date.now() / 1000) + 6000 },
        meeting_name: 'Meeting 10',
        race_number: 10
      }
    }
  })
}))

describe('RaceList', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders the race items correctly', async () => {
    const raceStore = useRaceStore()
    await raceStore.loadRaces()

    const wrapper = mount(RaceList, {
      global: {
        plugins: [createPinia()],
        components: {
          RaceItem
        }
      }
    })

    // Check if the correct number of RaceItem components are rendered
    const raceItems = wrapper.findAllComponents(RaceItem)
    expect(raceItems.length).toBe(5)

    // Check if the content of RaceItem is correct
    for (let i = 0; i < raceItems.length; i++) {
      expect(raceItems[i].props().race.race_id).toBe((i + 1).toString())
    }
  })
})
