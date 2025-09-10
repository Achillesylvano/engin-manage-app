import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from "./env";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false,
});

// Add request interceptor to dynamically add auth token
axiosInstance.interceptors.request.use(
  async (config) => {
    // get token from secure storage if needed
    const token = await SecureStore.getItemAsync("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;
