import { defineStore } from "pinia";
import { ref } from "vue";

const useActorsStore = defineStore({
  id: "actors",
  state: () => ({
    actors: ref([]),
  }),
  actions: {
    /**
     * Look up an actor from the list of actors present in the store.
     *
     * @param {String} id Id of an actor to look up
     * @returns Object An actor object
     */
    get(id) {
      return this.actors.filter((actor) => actor.id === id)?.[0];
    },
  },
});

export { useActorsStore };
