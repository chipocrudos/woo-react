import { Card, Header, Image as rImage } from "semantic-ui-react";
import Image from "next/image";
import Link from "next/link";
import { AddToCart } from "../../Cart/AddToCart/AddToCart";

export function ProductCard(props) {
  const { product } = props;

  return (
    <Card style={{ width: "100%" }}>
      {!!product.images.length && (
        <Link href={product?.permalink}>
          <Image
            className="product-card-cursor"
            src={product.images[0].src}
            alt={product?.name}
            width={300}
            height={320}
          />
        </Link>
      )}
      <Card.Content>
        <Card.Header>
          <Link href={product?.permalink}>
            <Header as="h4" className="product-card-cursor">
              {product.name}
            </Header>
          </Link>
        </Card.Header>
        <Card.Meta>
          <div dangerouslySetInnerHTML={{ __html: product?.price_html }} />
        </Card.Meta>
      </Card.Content>

      {"simple" === product?.type && (
        <Card.Content extra>
          <div className="ui two buttons">
            <AddToCart product={product} />
          </div>
        </Card.Content>
      )}
    </Card>
  );
}
