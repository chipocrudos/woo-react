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

export const resetPasswordApi = async (formData) => {
  const { email } = formData;
  try {
    const response = await axios.post("/api/auth/resetpassword", {
      email,
    });

    return {
      data: response.data,
      success: response.success,
    };
  } catch (error) {
    return {
      data: error.response.data,
      success: error.response.success,
    };
  }
};

export const createCustomerApi = async (formData) => {
  const { first_name, last_name, email, password } = formData;
  try {
    const response = await axiosInstance.post("/api/auth/signup", {
      first_name,
      last_name,
      email,
      password,
    });

    return {
      data: response.data,
      status: response.status,
      statusText: response.statuxText,
    };
  } catch (error) {
    return {
      data: error.response.data,
      status: error.response.status,
      statusText: error.response.statuxText,
    };
  }
};
