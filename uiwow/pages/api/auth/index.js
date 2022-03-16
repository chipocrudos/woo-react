import axios from "axios";
import { AUTH_API_URL, AUTH_KEY } from "../../../config/constants";

export default async function handler(req, res) {
  const { email, password } = req.body;

  if (req.method === "POST") {
    try {
      const response = await axios.post(AUTH_API_URL, {
        AUTH_KEY,
        email,
        password,
      });

      res.status(response.status).json(response?.data);
    } catch (error) {
      res.status(200).json(error.response.data);
    }
  } else {
    res.status(404).json({});
  }
}
