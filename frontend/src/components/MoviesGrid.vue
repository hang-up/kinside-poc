<script>
import MoviesGridItem from "./MoviesGridItem.vue";
export default {
  props: ["movies"],
  components: {
    // NOTE: A static import is needed since we are transitioning against it.
    MoviesGridItem,
  },
};
</script>

<template>
  <div class="movies-grid">
    <TransitionGroup name="list" tag="moviesgriditem">
      <MoviesGridItem
        v-for="(movie, index) in movies"
        :key="index"
        :movie="movie"
        class="movies-grid-item"
      />
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped>
.movies-grid {
  moviesgriditem {
    display: flex;
    flex-wrap: wrap;
  }

  &-item {
    height: 400px;
    margin: 0.5rem;
    flex: 0 0 calc(25% - 1rem);
    @media screen and (max-width: $screen-lg) {
      & {
        flex: 0 0 calc(33% - 1rem);
      }
    }

    @media screen and (max-width: $screen-md) {
      & {
        flex: 0 0 calc(50% - 1rem);
      }
    }
    @media screen and (max-width: $screen-sm) {
      & {
        flex: 0 0 calc(100% - 1rem);
      }
    }
  }
}
</style>
