<template>
  <div class="border p-4 mb-2 rounded-md shadow-md bg-white">
    <p class="font-bold text-lg">{{ race.meeting_name }} - Race {{ race.race_number }}</p>
    <p class="text-sm text-gray-600">
      Starts in: <span :class="{ 'text-red-500': countdown <= 60 }">{{ countdownText }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, computed } from 'vue'
import type { Race } from '@/services/raceService'
import { useRaceStore } from '@/stores/raceStore'

const props = defineProps<{ race: Race }>()
const raceStore = useRaceStore()

const countdown = ref(0)

const updateCountdown = () => {
  const currentTime = Math.floor(Date.now() / 1000)
  countdown.value = props.race.advertised_start.seconds - currentTime

  if (countdown.value <= -60) {
    raceStore.removeExpiredRaces()
  }
}

const countdownText = computed(() => {
  if (countdown.value <= 0) {
    return 'Race has started'
  }
  return `${countdown.value} seconds`
})

let interval: number

onMounted(() => {
  updateCountdown()
  interval = window.setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})

watch(() => props.race.advertised_start.seconds, updateCountdown)
</script>
