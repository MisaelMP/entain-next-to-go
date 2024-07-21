<template>
  <div class="flex justify-center mb-4">
    <button
      v-for="category in categories"
      :key="category.id"
      @click="selectCategory(category.id)"
      :class="[
        'px-4 py-2 mx-2 rounded',
        category.id === selectedCategory ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
      ]"
    >
      {{ category.name }}
    </button>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useRaceStore } from '../stores/raceStore'

export default {
  setup() {
    const raceStore = useRaceStore()

    const categories = computed(() => raceStore.categories)
    const selectedCategory = computed(() => raceStore.selectedCategory)

    const selectCategory = (categoryId: string) => {
      raceStore.selectCategory(categoryId)
    }

    return { categories, selectedCategory, selectCategory }
  }
}
</script>

<style scoped>
button {
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
}
button.active {
  background-color: #007bff;
  color: white;
}
</style>
