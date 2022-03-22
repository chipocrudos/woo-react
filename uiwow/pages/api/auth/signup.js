import { apiWoo } from "../../../config/woocommerce";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { first_name, last_name, email, password } = req.body;
      const response = await apiWoo.post("customers", {
        first_name,
        last_name,
        email,
        password,
      });

      res
        .status(response.status)
        .json({ data: response.data, statusText: response.statusText });
    } catch (error) {
      res.status(error.response.status).json({
        data: error.response.data,
        statusText: error.response.statusText,
      });
    }
  } else {
    res.status(404).json({});
  }
}
