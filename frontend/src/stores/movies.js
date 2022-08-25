import { defineStore } from "pinia";
import { shallowRef } from "vue";

const useMoviesStore = defineStore({
  id: "movies",
  state: () => ({
    movies: shallowRef([]),
    filterBy: "",
  }),
  getters: {
    /**
     * Return a list of filtered movies based on the search query.
     *
     * @param {Object} state Current state
     * @returns Array Array of filtered movies based on the search query
     */
    filteredMovies: (state) => {
      if (!state.filterBy.length) {
        return state.movies;
      }
      return state.movies.filter((movie) =>
        movie.title
          .toLocaleLowerCase()
          .includes(state.filterBy.toLocaleLowerCase())
      );
    },
  },
});

export { useMoviesStore };
