import axios from "axios";
import { WORDPRESS_URL, AUTH_KEY } from "../../../config/constants";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { code, email, new_password } = req.body;
      const response = await axios.put(
        `${WORDPRESS_URL}/wp-json/simple-jwt-login/v1/user/reset_password`,
        {
          code,
          email,
          new_password,
          AUTH_KEY,
        }
      );

      res.status(response.status).json({ data: response.data });
    } catch (error) {
      res.status(error.response.status).json({
        data: error.response.data,
      });
    }
  } else {
    res.status(404).json({});
  }
}
