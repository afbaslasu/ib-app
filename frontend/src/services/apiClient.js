import axios from "axios";

/**
 * apiClient
 *  - A singleton Axios instance for all API calls.
 *  - baseURL pulled from environment variable (VITE_API_URL).
 *  - Returns JSON or throws an Error with a user‐friendly message.
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.data && err.response.data.message) {
      return Promise.reject(new Error(err.response.data.message));
    }
    return Promise.reject(err);
  }
);

export default apiClient;
