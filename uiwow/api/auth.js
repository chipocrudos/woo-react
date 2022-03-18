import axios from "axios";
import axiosInstance from "../config/axios";
import { removeToken, setToken } from "./token";

export const loginApi = async ({ email, password }) => {
  const response = await axiosInstance.post("/api/auth", {
    email,
    password,
  });

  return response;
};

export const validateTokenApi = async () => {
  const response = await axios.post("/api/auth/validate");
  return response.status === 200;
};

export const refreshTokenApi = async () => {
  const { data } = await axiosInstance.post("/api/auth/refresh");

  if (data.success) setToken(data.data.jwt);
  else removeToken();
};

export const meApi = async () => {
  const response = await axiosInstance.get("/api/auth/me");

  return response;
};
