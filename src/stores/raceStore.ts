import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchRaces } from '../services/raceService'
import type { Race } from '../services/raceService'

export interface Category {
  id: string
  name: string
}

export const useRaceStore = defineStore('race', () => {
  const races = ref<Race[]>([])
  const categories = ref<Category[]>([
    { id: 'all', name: 'All' },
    { id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61', name: 'Greyhound Racing' },
    { id: '161d9be2-e909-4326-8c2c-35ed71fb460b', name: 'Harness Racing' },
    { id: '4a2788f8-e825-4d36-9894-efd4baf1cfae', name: 'Horse Racing' }
  ])
  const selectedCategory = ref<string | null>('all')

  const loadRaces = async () => {
    try {
      await ensureFiveRacesPerCategory()
    } catch (error) {
      console.error('Error fetching races:', error)
    }
  }

  const filterValidRaces = (races: Race[]) => {
    const now = new Date()
    return races.filter((race) => new Date(race.advertised_start.seconds * 1000) > now)
  }

  const sortRaces = () => {
    races.value.sort(
      (a, b) =>
        new Date(a.advertised_start.seconds * 1000).getTime() -
        new Date(b.advertised_start.seconds * 1000).getTime()
    )
  }

  const filteredRaces = computed(() => {
    return selectedCategory.value === 'all'
      ? races.value
      : races.value.filter((race) => race.category_id === selectedCategory.value).slice(0, 5)
  })

  const removeExpiredRaces = async () => {
    const now = new Date().getTime()
    races.value = races.value.filter(
      (race) => new Date(race.advertised_start.seconds * 1000).getTime() > now - 60000
    )
    await ensureFiveRacesPerCategory()
  }

  const selectCategory = (categoryId: string | null) => {
    selectedCategory.value = categoryId
    ensureFiveRacesPerCategory()
  }

  const ensureFiveRacesPerCategory = async () => {
    let totalNeeded = 0
    let fetchCount = 10
    const shouldContinue = true

    while (shouldContinue) {
      categories.value.forEach((category) => {
        const currentCount =
          category.id === 'all'
            ? races.value.length
            : races.value.filter((race) => race.category_id === category.id).length
        const needed = Math.max(5 - currentCount, 0)
        totalNeeded += needed
      })

      if (totalNeeded === 0) break

      await loadMoreRaces(fetchCount)
      fetchCount += 10 // Increment fetch count to get more races if needed

      totalNeeded = 0
    }
  }

  const loadMoreRaces = async (count: number) => {
    try {
      const { next_to_go_ids, race_summaries } = await fetchRaces(count)
      const newRaces = next_to_go_ids.map((id: string) => race_summaries[id])

      const validNewRaces = filterValidRaces(newRaces)

      races.value = [...races.value, ...validNewRaces]

      // Ensure no duplicate keys
      const uniqueRaces = races.value.reduce((acc, race) => {
        if (!acc.find((r) => r.race_id === race.race_id)) {
          acc.push(race)
        }
        return acc
      }, [] as Race[])

      races.value = uniqueRaces
      sortRaces()
    } catch (error) {
      console.error('Error fetching more races:', error)
    }
  }

  return {
    races,
    categories,
    selectedCategory,
    loadRaces,
    filteredRaces,
    selectCategory,
    removeExpiredRaces,
    ensureFiveRacesPerCategory
  }
})
