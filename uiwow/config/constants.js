export const TOKEN = "Bearer";
export const AUTH_KEY = process.env.AUTH_KEY;

export const NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
export const WORDPRESS_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL || "http://localhost:8080";

export const HEADER_FOOTER_ENDPOINT = `${WORDPRESS_URL}/wp-json/rae/v1/header-footer?header_location_id=hcms-menu-header&footer_location_id=hcms-menu-footer`;
export const CART_API_URL = `${WORDPRESS_URL}/wp-json/rae/v1/cart/items/`;
export const AUTH_API_URL = `${WORDPRESS_URL}/wp-json/simple-jwt-login/v1/auth`;
