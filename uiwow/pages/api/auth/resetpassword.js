import axios from "axios";
import { WORDPRESS_URL, AUTH_KEY } from "../../../config/constants";

export default async function handler(req, res) {
  const { email } = req.body;

  if (req.method === "POST") {
    try {
      const response = await axios.post(
        `${WORDPRESS_URL}/wp-json/simple-jwt-login/v1/user/reset_password`,
        {
          AUTH_KEY,
          email,
        }
      );

      res.status(response.status).json(response?.data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  } else {
    res.status(404).json({});
  }
}
