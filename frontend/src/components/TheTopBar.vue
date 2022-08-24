<template>
  <div id="topbar">
    <img src="/src/assets/logo.png" alt="Cinematch" />
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
}

.authentication {
  align-items: center;
  display: flex;

  .username {
    color: var(--color-heading);
    margin-right: 0.5rem;
  }
  img {
    border-radius: 100%;
  }
}
</style>
