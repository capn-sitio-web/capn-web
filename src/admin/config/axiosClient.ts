import axios from "axios";
import { authStorage } from "../features/auth/data/auth.storage";

export const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/admin`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = authStorage.obtenerToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      authStorage.limpiarSesion();
    }

    return Promise.reject(error);
  }
);
