import { useAxios } from "@/composable/use-axios";
const { get } = useAxios();

/**
 * Movies Service.
 * Endpoint: /movies.
 *
 */
const MoviesService = {
  async getAll() {
    return (await get("/movies"))?.data;
  },
};

export { MoviesService };
