import { useEffect, useState, createContext } from "react";
import { viewCartApi } from "../api/cart";

export const ClientContext = createContext({
  cart: null,
});

export function ClientProvider(props) {
  const { children } = props;
  const [cart, setCart] = useState(null);

  useEffect(() => {
    if (process.browser) {
      let cartData = localStorage.getItem("next-cart");
      cartData = null !== cartData ? JSON.parse(cartData) : "";
      setCart(cartData);

      if (!cart?.length) {
        viewCartApi(setCart);
      }

      viewCartApi(setCart);
    }
  }, []);

  useEffect(() => {
    if (process.browser) {
      localStorage.setItem("next-cart", JSON.stringify(cart));
    }
  }, [cart]);

  const valueContext = {
    cart,
    setCart,
  };

  return (
    <ClientContext.Provider value={valueContext}>
      {children}
    </ClientContext.Provider>
  );
}
