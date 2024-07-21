<template>
  <nav class="bg-gray-800 p-4 fixed w-full top-0 z-10">
    <div class="container mx-auto flex justify-center space-x-4">
      <button
        v-for="category in categories"
        :key="category.id"
        @click="selectCategory(category.id)"
        :class="[
          'px-4 py-2 mx-2 rounded focus:outline-none',
          category.id === selectedCategory ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
        ]"
      >
        {{ category.name }}
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRaceStore } from '@/stores/raceStore'

const raceStore = useRaceStore()

const categories = computed(() => raceStore.categories)
const selectedCategory = computed(() => raceStore.selectedCategory)

const selectCategory = (categoryId: string | null) => {
  raceStore.selectCategory(categoryId)
  raceStore.ensureFiveRacesPerCategory()
}
</script>

<style scoped>
button {
  transition: background-color 0.3s ease;
}
button:hover {
  background-color: #3b82f6;
  color: white;
}
</style>
