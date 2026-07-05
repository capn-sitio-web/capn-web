import axios from "axios";

export const publicAxiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/public`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
