<template>
  <div id="app" class="min-h-screen bg-gray-100">
    <Navigation />
    <div class="container mx-auto p-4 mt-20">
      <RaceList />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Navigation from './components/Navigation.vue'
import RaceList from './components/RaceList.vue'
import { useRaceStore } from '@/stores/raceStore'

const raceStore = useRaceStore()

onMounted(() => {
  raceStore.loadRaces()
  setInterval(() => {
    raceStore.removeExpiredRaces()
  }, 30000) // Clean races every 30 seconds
})
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
</style>
