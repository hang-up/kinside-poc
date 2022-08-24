<script>
import debounce from "debounce";
import { ActorsService } from "@/services/actors";
import { useActorsStore } from "@/stores/actors";
import { ref } from "vue";

/**
 * An explanation on what to focus on in this component.
 *
 * From what I've seen, there are 584 actors across all movies (4 per movies).
 * The initial payload to /actors is 43kb heavy, taking over 200ms on an average internet connection.
 * An optimization can be achieved here by leveraging the /actors/{actorId} endpoint; we'll query
 * the details of each actor only when the user hovers on a thumbnail.
 */
export default {
  props: ["movie"],

  setup(props) {
    const store = useActorsStore();
    const actorsToFetch = ref([]);

    /**
     * Truncate a string.
     *
     * @param {String} str String to truncate.
     * @param {Number} max Max number of words before truncating
     * @returns String The truncated string.
     */
    const truncate = (str, max) => {
      if (str.split(" ").length <= max) {
        return str;
      }
      return str.split(" ").slice(0, max).join(" ").concat(" ...");
    };

    /**
     * Handle the hover effect on an item.
     * TODO: Admittedly, this could be moved into its own composable.
     *
     * @returns void.
     */
    const handleHover = debounce(async () => {
      if (store.actors.length) {
        actorsToFetch.value = props.movie.actorIds.filter(
          (id) => !store.actors.some((actor) => actor.id === id)
        );
      } else {
        actorsToFetch.value = props.movie.actorIds;
      }
      if (actorsToFetch.value.length) {
        await Promise.all(
          actorsToFetch.value.map(async (actor) => {
            const details = await ActorsService.get(actor);
            store.actors.push(details);
          })
        );
      }
    }, 500);

    /**
     * Handles redirection to external url.
     *
     *  @returns void.
     */
    const handleClick = () => {
      window.open(props.movie.pageUrl, "_blank").focus();
    };

    /**
     * Get the full name of an actor.
     *
     * @param {String} id Id of an actor to retrieve.
     * @returns String Full name of an actor.
     */
    const getActorDetails = (id) => {
      const details = store.get(id);
      return `${details?.first_name ? details.first_name : ""} ${
        details?.last_name ? details.last_name : ""
      }`;
    };

    return { truncate, handleClick, handleHover, store, getActorDetails };
  },
};
</script>

<template>
  <article
    class="movies-grid-item"
    @mouseenter="handleHover"
    @click="handleClick"
  >
    <div
      :style="{ backgroundImage: `url(${movie.posterUrl})` }"
      class="poster"
    ></div>

    <div class="preview">
      <header class="font-bold">{{ movie.title }}</header>
      <p class="rating">
        <span class="font-bold text-white">{{ movie.rating }}</span> / 10
      </p>
      <div class="details">
        <ul class="actors">
          <li
            v-for="(actor, index) in movie.actorIds"
            :key="index"
            :class="{ 'is-empty': getActorDetails(actor).length === 1 }"
            class="font-bold"
          >
            {{ getActorDetails(actor) }}
          </li>
        </ul>
        <p>{{ truncate(movie.plot, 20) }}</p>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.movies-grid-item {
  border-radius: 15px;
  transition: all 0.2s linear;
  overflow: hidden;

  &:hover {
    box-shadow: -4px 4px 2px 2px var(--color-heading);
    cursor: pointer;
    & .preview {
      transition: all 0.2s linear;
      transform: translateY(150px);
    }
    & .preview .details {
      transition: all 0.2s linear;
      margin-top: 0;
      padding-bottom: 3rem;
    }
  }
  .poster {
    background-size: cover;
    border-radius: 15px;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
  }

  .preview {
    background: rgba(0, 0, 0, 0.85);
    padding: 1rem 2rem;
    transform: translateY(
      270px
    ); // This value works because of each item's fixed height of 300px.

    header {
      color: var(--color-heading);
      font-size: var(--heading-size);
    }

    .rating {
      font-size: 1.25rem;
      color: var(--vt-c-gray);
    }

    .details {
      margin-top: 3rem;
    }

    .actors {
      display: inline-block;
      padding: 0;

      &::before {
        content: "Starring: ";
        font-weight: 800;
        color: var(--vt-c-white);
        white-space: pre;
      }

      li {
        display: inline-block;
        &.is-empty {
          background-color: gray;
          width: 2rem;
          height: 1rem;
          margin-right: 1rem;
          &:not(:last-child)::after {
            content: " ";
          }
        }
        &:not(:last-child)::after {
          content: ", ";
          white-space: pre;
        }
      }
    }
  }
}
</style>
