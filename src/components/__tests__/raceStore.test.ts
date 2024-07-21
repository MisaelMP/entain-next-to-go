import { setActivePinia, createPinia } from 'pinia'
import { useRaceStore } from '../../stores/raceStore'
import { fetchRaces, type Race } from '../../services/raceService'
import { vi, describe, beforeEach, it, expect } from 'vitest'

// Mock fetchRaces function
vi.mock('../src/services/raceService', () => ({
  fetchRaces: vi.fn()
}))

describe('raceStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('loads and sorts races', async () => {
    const mockRaces: Race[] = [
      {
        race_id: '1',
        meeting_name: 'Meeting 1',
        race_number: 1,
        advertised_start: { seconds: Math.floor(Date.now() / 1000) + 3600 },
        category_id: '4a2788f8-e825-4d36-9894-efd4baf1cfae'
      }
      // Add more mock races as needed
    ]

    ;(fetchRaces as any).mockResolvedValue(mockRaces)

    const raceStore = useRaceStore()
    await raceStore.loadRaces()

    expect(raceStore.races.length).toBe(mockRaces.length)
    expect(raceStore.races[0].race_id).toBe('1')
  })

  it('filters races by category', async () => {
    const mockRaces: Race[] = [
      {
        race_id: '1',
        meeting_name: 'Meeting 1',
        race_number: 1,
        advertised_start: { seconds: Math.floor(Date.now() / 1000) + 3600 },
        category_id: '4a2788f8-e825-4d36-9894-efd4baf1cfae'
      },
      {
        race_id: '2',
        meeting_name: 'Meeting 2',
        race_number: 2,
        advertised_start: { seconds: Math.floor(Date.now() / 1000) + 7200 },
        category_id: '161d9be2-e909-4326-8c2c-35ed71fb460b'
      }
    ]

    ;(fetchRaces as any).mockResolvedValue(mockRaces)

    const raceStore = useRaceStore()
    await raceStore.loadRaces()

    raceStore.selectCategory('4a2788f8-e825-4d36-9894-efd4baf1cfae')
    expect(raceStore.filterRaces().length).toBe(1)
    expect(raceStore.filterRaces()[0].race_id).toBe('1')
  })
})
