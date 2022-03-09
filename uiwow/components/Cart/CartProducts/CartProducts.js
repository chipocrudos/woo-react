import { useState, useEffect } from "react";
import { Button, Form, Tab, Table, TableCell } from "semantic-ui-react";
import imageWhite from "../../../public/white-image.png";
import Image from "next/image";

export function CartProducts(props) {
  const { cart } = props;
  console.log(cart);

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
        <CartItem key={item.product_id} item={item} />
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
  const { item } = props;
  const [srcImage, setSrcImage] = useState(imageWhite);

  useEffect(() => {
    if (item.data?.images.length) setSrcImage(item.data?.images[0].src);
  }, []);

  return (
    <Table.Row>
      <Table.Cell textAlign="center">
        <Image src={srcImage} alt={item.data.name} height={35} width={35} />
      </Table.Cell>
      <Table.Cell>{item.data.name}</Table.Cell>
      <Table.Cell textAlign="center">
        <Form>
          <Form.Group>
            <Form.Field>
              <input max={5} value={item.quantity} textAlign="center" />
              <label onClick={() => console.log("click")}>Eliminar</label>
            </Form.Field>
          </Form.Group>
        </Form>
      </Table.Cell>
      <Table.Cell textAlign="right">{item.data.price}</Table.Cell>
      <Table.Cell textAlign="right">{item.line_total}</Table.Cell>
    </Table.Row>
  );
}
