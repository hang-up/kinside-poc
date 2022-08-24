import axios from "axios";
import nProgress from "nprogress";
/**
 * Composable for Axios.
 * We'll only implement the HTTP methods we need in this project (GET).
 *
 */
const instance = axios.create({
  baseURL: " https://anjmihdde7.execute-api.us-east-1.amazonaws.com/kinside",
});

instance.interceptors.request.use((config) => {
  nProgress.start();
  return config;
});

instance.interceptors.response.use((config) => {
  nProgress.done();
  return config;
});

const useAxios = () => ({
  get: async (url) => instance.get(url),
});

export { useAxios };
