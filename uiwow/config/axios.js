import axios from "axios";
import { TOKEN, NEXT_PUBLIC_SITE_URL as baseURL } from "./constants";
import { getToken } from "../api/token";
import { refreshTokenApi } from "../api/auth";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: getToken() ? `${TOKEN} ${getToken()}` : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalConfig = error.config;

    if (originalConfig.url !== "/api/auth" && error.response) {
      if (
        error.response.status === 400 &&
        !originalConfig._retry &&
        error.response.data.data.errorCode === 14
      ) {
        originalConfig._retry = true;
        await refreshTokenApi();
        originalConfig.headers.Authorization = getToken()
          ? `${TOKEN} ${getToken()}`
          : null;
        return axiosInstance(originalConfig);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
