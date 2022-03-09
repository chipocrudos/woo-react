import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { WORDPRESS_URL } from "./constants";

export const apiWoo = new WooCommerceRestApi({
  url: WORDPRESS_URL,
  consumerKey: process.env.WC_CLIENT_KEY,
  consumerSecret: process.env.WC_CLIENT_SECRET,
  version: "wc/v3",
});
