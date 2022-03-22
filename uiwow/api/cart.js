import axios from "axios";
import { CART_API_URL } from "../config/constants";
import { getSession, revokeSession, storeSession } from "./session";
import { sumBy } from "lodash";

export const getAddOrViewCartConfig = () => {
  const config = {
    headers: {
      "X-Headless-CMS": true,
    },
  };

  const storedSession = getSession();

  if (storedSession) {
    config.headers["x-wc-session"] = storedSession;
  }

  return config;
};

export const addToCartApi = async (productId, qty = 1, setLoading, setCart) => {
  setLoading(true);
  const storedSession = getSession();

  const response = await axios.post(
    CART_API_URL,
    {
      product_id: productId,
      quantity: qty,
    },
    getAddOrViewCartConfig()
  );

  if (!storedSession) {
    storeSession(response?.headers?.["x-wc-session"]);
  }
  viewCartApi(setCart);
  setLoading(false);
};

export const updateCartApi = async (key, qty, setLoading, setCart) => {
  setLoading(true);

  await axios.patch(
    `${CART_API_URL}${key}`,
    {
      quantity: qty,
    },
    getAddOrViewCartConfig()
  );

  viewCartApi(setCart);
  setLoading(false);
};

export const deleteCartApi = async (key, setLoading, setCart) => {
  setLoading(true);

  await axios.delete(`${CART_API_URL}${key}`, getAddOrViewCartConfig());

  viewCartApi(setCart);
  setLoading(false);
};

export const viewCartApi = async (setCart) => {
  const response = await axios.get(CART_API_URL, getAddOrViewCartConfig());
  const formattedCartData = getFormattedCartData(response?.data ?? []);
  setCart(formattedCartData);
  // if (formattedCartData)
  // else revokeSession();
};

const getFormattedCartData = (cartData) => {
  if (!cartData.length) {
    revokeSession();
    return null;
  }
  const cartTotal = {
    totalQty: 0,
    totalPrice: 0,
  };

  cartTotal.totalQty = sumBy(cartData, "quantity");
  cartTotal.totalPrice = sumBy(cartData, "line_total");
  return {
    cartItems: cartData || [],
    ...cartTotal,
  };
};
