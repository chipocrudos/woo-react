import { useState } from "react";
import { Card, Form, Header } from "semantic-ui-react";
import { AddToCart } from "../../Cart";

export default function CartCard(props) {
  const { product } = props;
  const [qty, setQty] = useState(1);

  return (
    <Card>
      <Card.Content>
        <Header as="h3">
          <div dangerouslySetInnerHTML={{ __html: product?.price_html }} />
          <Header.Subheader>Stock: {product?.stock_status}</Header.Subheader>
        </Header>
        {"simple" === product?.type && (
          <>
            <Form.Input
              className="cartcard-input-qty"
              type="number"
              min={1}
              name="quantity"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />

            <div className="ui two buttons">
              <AddToCart product={product} qty={qty} />
            </div>
          </>
        )}
      </Card.Content>
    </Card>
  );
}
