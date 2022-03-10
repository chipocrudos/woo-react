import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Form, Table } from "semantic-ui-react";
import NumberInput from "semantic-ui-react-numberinput";
import imageWhite from "../../../public/white-image.png";
import Image from "next/image";
import { updateCartApi, deleteCartApi } from "../../../api/cart";
import style from "./CartProducts.module.css";

export function CartProducts(props) {
  const { cart, setCart, setLoading } = props;
  console.log(cart);

  const onUpdateCart = (key, qty) => {
    updateCartApi(key, qty, setLoading, setCart);
  };

  const onDeleteCart = (key) => {
    deleteCartApi(key, setLoading, setCart);
  };

  return (
    <Table basic="very">
      <Table.Header>
        <Table.Row textAlign="center">
          <Table.HeaderCell>Imagen</Table.HeaderCell>
          <Table.HeaderCell>Nombre</Table.HeaderCell>
          <Table.HeaderCell>Cantidad</Table.HeaderCell>
          <Table.HeaderCell>Precio</Table.HeaderCell>
          <Table.HeaderCell>Subtotal</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body></Table.Body>
      {cart?.cartItems.map((item) => (
        <CartItem
          key={item.product_id}
          item={item}
          onUpdateCart={onUpdateCart}
          onDeleteCart={onDeleteCart}
        />
      ))}
      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell colSpan="5" textAlign="right">
            {cart.totalPrice}
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
}

export function CartItem(props) {
  const { item, onUpdateCart, onDeleteCart } = props;
  const [srcImage, setSrcImage] = useState(imageWhite);
  const [qty, setQty] = useState(item.quantity);
  const timer = useRef(null);

  useEffect(() => {
    if (item.data?.images.length) setSrcImage(item.data?.images[0].src);
  }, []);

  useEffect(() => {
    clearTimeout(timer.current);

    if (item.quantity !== qty) {
      timer.current = setTimeout(onUpdateCart, 1200, item.key, qty);
    }
    console.log(timer.current);
  }, [qty]);

  return (
    <Table.Row>
      <Table.Cell textAlign="center">
        <Image src={srcImage} alt={item.data.name} height={35} width={35} />
      </Table.Cell>
      <Table.Cell>
        <Link href={`/product/${item.data?.slug}`}>{item.data.name}</Link>
      </Table.Cell>
      <Table.Cell textAlign="center">
        <Form>
          <Form.Group className={style.cartProductGroup}>
            <NumberInput
              value={qty}
              onChange={(value) => setQty(value)}
              minValue={1}
              maxValue={item.data.stock_quantity || 1000}
              className={style.inputQuantity}
            />
          </Form.Group>
          <Form.Group className={style.cartProductGroup}>
            <label
              textAlign="center"
              className={style.inputLabel}
              onClick={() => onDeleteCart(item.key)}
            >
              Eliminar
            </label>
          </Form.Group>
        </Form>
      </Table.Cell>
      <Table.Cell textAlign="right">{item.data.price}</Table.Cell>
      <Table.Cell textAlign="right">{item.line_total}</Table.Cell>
    </Table.Row>
  );
}
