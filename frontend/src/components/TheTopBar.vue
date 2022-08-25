<template>
  <div id="topbar">
    <img src="/src/assets/logo.png" alt="Cinematch" id="logo" />
    <input
      type="text"
      name="filter"
      id="filter"
      @input="handleFilter"
      placeholder="Find your match..."
    />
    <div class="authentication">
      <p class="font-bold">
        Logged in as <span class="username font-bold">Puglife</span>
      </p>
      <img src="https://picsum.photos/30" alt="Profile pic" />
    </div>
  </div>
</template>

<script>
import debounce from "debounce";
import { useMoviesStore } from "@/stores/movies";

export default {
  setup() {
    const store = useMoviesStore();

    const handleFilter = debounce((e) => {
      store.filterBy = e.target.value;
    }, 500);

    return { handleFilter };
  },
};
</script>

<style lang="scss" scoped>
#topbar {
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 0 5vw;

  & #logo {
    @media screen and (max-width: $screen-md) {
      & {
        display: none;
      }
    }
  }

  & #filter {
    @media screen and (max-width: $screen-md) {
      & {
        width: 90%;
      }
    }
  }

  & .authentication {
    align-items: center;
    display: flex;

    @media screen and (max-width: $screen-md) {
      & > p {
        display: none;
      }
    }

    .username {
      color: var(--color-heading);
      margin-right: 0.5rem;
      @media screen and (max-width: $screen-md) {
        & {
          display: none;
        }
      }
    }
    img {
      border-radius: 100%;
    }
  }
}
</style>
