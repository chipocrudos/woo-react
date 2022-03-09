import { useState } from "react";
import { Button } from "semantic-ui-react";
import { addToCartApi } from "../../../api/cart";
import { useClient } from "../../../hooks/useClient";

export function AddToCart(props) {
  const { product, qty = 1 } = props;
  const { setCart } = useClient();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Button
        basic
        icon="cart"
        color={loading ? "orange" : "blue"}
        loading={loading}
        onClick={() => {
          addToCartApi(product?.id ?? 0, qty, setLoading, setCart);
        }}
      />
    </>
  );
}
