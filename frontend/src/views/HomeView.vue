<script>
import MoviesGrid from "@/components/MoviesGrid.vue";
import { ref, onMounted } from "vue";
import { MoviesService } from "@/services/movies.js";
import { useMoviesStore } from "@/stores/movies.js";

export default {
  setup() {
    const hasErrors = ref(false);
    const store = useMoviesStore();

    onMounted(async () => {
      store.movies = await MoviesService.getAll().catch((e) => {
        console.error("HomeView@onMounted: Error while fetching movies.", e);
        hasErrors.value = true;
      });
    });

    return { hasErrors, store };
  },

  components: {
    MoviesGrid,
  },
};
</script>

<template>
  <main>
    <div v-if="hasErrors" class="text-white text-center font-bold">
      Error loading movies
    </div>
    <MoviesGrid v-else :movies="store.filteredMovies" />
  </main>
</template>

<style lang="scss" scoped>
main {
  max-width: 90vw;
  margin: 0 auto;
}

@media (max-width: 1024px) {
  main {
    max-width: 95vw;
  }
}
</style>
