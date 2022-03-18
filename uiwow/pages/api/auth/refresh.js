import axios from "axios";
import { AUTH_KEY, WORDPRESS_URL } from "../../../config/constants";

export default async function handler(req, res) {
  const { authorization } = req.headers;

  if (req.method === "POST" && authorization) {
    try {
      const response = await axios.post(
        `${WORDPRESS_URL}/wp-json/simple-jwt-login/v1/auth/refresh`,
        { AUTH_KEY },
        { headers: { authorization } }
      );

      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  } else {
    res.status(400).json({});
  }
}
