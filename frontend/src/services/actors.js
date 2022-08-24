import { useAxios } from "@/composable/use-axios";
const { get } = useAxios();

/**
 * Movies Service.
 * Endpoint: /actors.
 *
 */
const ActorsService = {
  async getAll() {
    return (await get("/actors"))?.data;
  },

  async get(id) {
    return (await get(`/actors/${id}`))?.data;
  },
};

export { ActorsService };
