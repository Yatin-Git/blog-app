import axios from "axios";
import { getToken } from "../auth";
//for dev env
//export const BASE_URL = "http://localhost:9090/api/v1";
//for prod env
export const BASE_URL = "https://blog-app-apis-production-4e63.up.railway.app/api/v1";

export const myAxios = axios.create({
  baseURL: BASE_URL,
});

export const privateAxios = axios.create({
  baseURL: BASE_URL,
});

privateAxios.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // console.log(config);
    }

    return config;
  },
  (error) => Promise.reject(error)
);