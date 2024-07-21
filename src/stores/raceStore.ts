import { defineStore } from 'pinia'
import { fetchRaces } from '../services/raceService'
import type { Race } from '../services/raceService'

export interface Category {
  id: string
  name: string
}

interface RaceState {
  races: Race[]
  categories: Category[]
  selectedCategory: string | null
}

export const useRaceStore = defineStore('race', {
  state: (): RaceState => ({
    races: [],
    categories: [
      { id: 'all', name: 'All' },
      { id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61', name: 'Greyhound Racing' },
      { id: '161d9be2-e909-4326-8c2c-35ed71fb460b', name: 'Harness Racing' },
      { id: '4a2788f8-e825-4d36-9894-efd4baf1cfae', name: 'Horse Racing' }
    ],
    selectedCategory: 'all'
  }),
  actions: {
    async loadRaces(count = 10) {
      try {
        const { next_to_go_ids, race_summaries } = await fetchRaces(count)
        const races = next_to_go_ids.map((id: string) => race_summaries[id])

        this.races = races.filter(
          (race: Race) => new Date(race.advertised_start.seconds * 1000) > new Date()
        )
        this.sortRaces()
        await this.ensureFiveRacesPerCategory()
      } catch (error) {
        console.error('Error fetching races:', error)
      }
    },
    sortRaces() {
      this.races.sort(
        (a, b) =>
          new Date(a.advertised_start.seconds * 1000).getTime() -
          new Date(b.advertised_start.seconds * 1000).getTime()
      )
    },
    filterRaces() {
      const filteredRaces =
        this.selectedCategory && this.selectedCategory !== 'all'
          ? this.races.filter((race) => race.category_id === this.selectedCategory)
          : this.races
      return filteredRaces.slice(0, 5)
    },
    async removeExpiredRaces() {
      const now = new Date().getTime()
      this.races = this.races.filter(
        (race) => new Date(race.advertised_start.seconds * 1000).getTime() > now - 60000
      )
      await this.ensureFiveRacesPerCategory()
    },
    selectCategory(categoryId: string | null) {
      this.selectedCategory = categoryId
      this.ensureFiveRacesPerCategory()
    },
    async ensureFiveRacesPerCategory() {
      const neededCounts = this.categories.map((category) => {
        return {
          id: category.id,
          needed:
            5 -
            this.races.filter((race) => category.id === 'all' || race.category_id === category.id)
              .length
        }
      })

      for (const { id, needed } of neededCounts) {
        if (needed > 0) {
          await this.loadMoreRaces(needed)
        }
      }
    },
    async loadMoreRaces(count: number) {
      try {
        const { next_to_go_ids, race_summaries } = await fetchRaces(count)
        const newRaces = next_to_go_ids.map((id: string) => race_summaries[id])

        const validNewRaces = newRaces.filter(
          (race: Race) => new Date(race.advertised_start.seconds * 1000) > new Date()
        )

        this.races = [...this.races, ...validNewRaces]
        this.sortRaces()
      } catch (error) {
        console.error('Error fetching more races:', error)
      }
    }
  }
})