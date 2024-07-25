<template>
  <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    <RaceItem v-for="race in filteredRaces" :key="race.race_id" :race="race" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRaceStore } from '@/stores/raceStore'
import RaceItem from './RaceItem.vue'

const raceStore = useRaceStore()
const filteredRaces = computed(() => raceStore.filteredRaces)
</script>
