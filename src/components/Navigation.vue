<template>
  <nav ref="navRef" class="bg-gray-800 text-white p-4 fixed w-full top-0 z-10 shadow-md">
    <div class="container mx-auto flex flex-col md:flex-row justify-between items-center">
      <h1 class="text-xl font-bold mb-4 md:mb-0">Next to go races</h1>
      <div class="flex flex-col md:flex-row gap-4">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="selectCategory(category.id)"
          :class="[
            'px-4 py-2 rounded focus:outline-none transition duration-300 ease-in-out',
            category.id === selectedCategory
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          ]"
        >
          {{ category.name }}
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRaceStore } from '@/stores/raceStore'

const raceStore = useRaceStore()
const navRef = ref<HTMLElement | null>(null)
const navHeight = ref(0)

const categories = computed(() => raceStore.categories)
const selectedCategory = computed(() => raceStore.selectedCategory)

const selectCategory = (categoryId: string | null) => {
  raceStore.selectCategory(categoryId)
  raceStore.ensureFiveRacesPerCategory()
}

const updateNavHeight = () => {
  if (navRef.value) {
    navHeight.value = navRef.value.offsetHeight
    document.documentElement.style.setProperty('--nav-height', `${navHeight.value}px`)
  }
}

onMounted(() => {
  updateNavHeight()
  window.addEventListener('resize', updateNavHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateNavHeight)
})
</script>
