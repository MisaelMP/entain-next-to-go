import { setActivePinia, createPinia } from 'pinia'
import { useRaceStore } from '@/stores/raceStore'
import { fetchRaces } from '@/services/raceService'
import { describe, it, beforeEach, expect, vi } from 'vitest'

// Mock the fetchRaces function
vi.mock('@/services/raceService')

const mockRaces = {
  next_to_go_ids: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  race_summaries: {
    '1': {
      race_id: '1',
      category_id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61',
      advertised_start: { seconds: Math.floor(Date.now() / 1000) + 600 }
    },
    '2': {
      race_id: '2',
      category_id: '161d9be2-e909-4326-8c2c-35ed71fb460b',
      advertised_start: { seconds: Math.floor(Date.now() / 1000) + 1200 }
    },
    '3': {
      race_id: '3',
      category_id: '4a2788f8-e825-4d36-9894-efd4baf1cfae',
      advertised_start: { seconds: Math.floor(Date.now() / 1000) + 1800 }
    },
    '4': {
      race_id: '4',
      category_id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61',
      advertised_start: { seconds: Math.floor(Date.now() / 1000) + 2400 }
    },
    '5': {
      race_id: '5',
      category_id: '161d9be2-e909-4326-8c2c-35ed71fb460b',
      advertised_start: { seconds: Math.floor(Date.now() / 1000) + 3000 }
    },
    '6': {
      race_id: '6',
      category_id: '4a2788f8-e825-4d36-9894-efd4baf1cfae',
      advertised_start: { seconds: Math.floor(Date.now() / 1000) + 3600 }
    },
    '7': {
      race_id: '7',
      category_id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61',
      advertised_start: { seconds: Math.floor(Date.now() / 1000) + 4200 }
    },
    '8': {
      race_id: '8',
      category_id: '161d9be2-e909-4326-8c2c-35ed71fb460b',
      advertised_start: { seconds: Math.floor(Date.now() / 1000) + 4800 }
    },
    '9': {
      race_id: '9',
      category_id: '4a2788f8-e825-4d36-9894-efd4baf1cfae',
      advertised_start: { seconds: Math.floor(Date.now() / 1000) + 5400 }
    },
    '10': {
      race_id: '10',
      category_id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61',
      advertised_start: { seconds: Math.floor(Date.now() / 1000) + 6000 }
    }
  }
}

describe('Race Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.resetAllMocks()
  })

  it('loads and filters races correctly', async () => {
    ;(fetchRaces as typeof fetchRaces & { mockResolvedValue: Function }).mockResolvedValue(
      mockRaces
    )

    const store = useRaceStore()
    await store.loadRaces()

    expect(fetchRaces).toHaveBeenCalledTimes(1)
    expect(store.races.length).toBe(10)
  })

  it('ensures at least 5 races per category', async () => {
    ;(fetchRaces as typeof fetchRaces & { mockResolvedValue: Function }).mockResolvedValue(
      mockRaces
    )

    const store = useRaceStore()
    await store.ensureFiveRacesPerCategory()

    const greyhoundRaces = store.races.filter(
      (race) => race.category_id === '9daef0d7-bf3c-4f50-921d-8e818c60fe61'
    )
    const harnessRaces = store.races.filter(
      (race) => race.category_id === '161d9be2-e909-4326-8c2c-35ed71fb460b'
    )
    const horseRaces = store.races.filter(
      (race) => race.category_id === '4a2788f8-e825-4d36-9894-efd4baf1cfae'
    )

    expect(greyhoundRaces.length).toBeGreaterThanOrEqual(5)
    expect(harnessRaces.length).toBeGreaterThanOrEqual(5)
    expect(horseRaces.length).toBeGreaterThanOrEqual(5)
  })

  it('removes expired races', async () => {
    ;(fetchRaces as typeof fetchRaces & { mockResolvedValue: Function }).mockResolvedValue(
      mockRaces
    )

    const store = useRaceStore()
    await store.loadRaces()

    vi.useFakeTimers()
    vi.advanceTimersByTime(60001) // Advance time by 60 seconds and 1 ms

    await store.removeExpiredRaces()

    const now = Date.now()
    const validRaces = store.races.filter(
      (race) => new Date(race.advertised_start.seconds * 1000).getTime() > now - 60000
    )

    expect(store.races.length).toBe(validRaces.length)
  })
})
