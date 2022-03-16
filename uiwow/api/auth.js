import axios from "axios";
import {
  AUTH_API_URL,
  TOKEN,
  WORDPRESS_URL,
  NEXT_PUBLIC_SITE_URL,
} from "../config/constants";

export const loginApi = async ({ email, password }) => {
  const response = await axios.post(`${NEXT_PUBLIC_SITE_URL}/api/auth`, {
    email,
    password,
  });

  return response;
};

export const validateApi = async (token) => {
  const response = await axios.post(
    `${NEXT_PUBLIC_SITE_URL}/api/auth/validate`,
    {},
    {
      headers: {
        Authorization: `${TOKEN} ${token}`,
      },
    }
  );

  // return response;
  return response.status === 200;
};

export const meApi = async (token) => {
  const response = await axios.get(
    `${NEXT_PUBLIC_SITE_URL}/api/auth/me`,

    {
      headers: {
        Authorization: `${TOKEN} ${token}`,
      },
    }
  );

  return response;
};
