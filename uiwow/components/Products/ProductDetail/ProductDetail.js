import { Container, Grid, Header } from "semantic-ui-react";

import { Carousel } from "../Carousel";
import CartCard from "../CartCard/CartCard";

export function ProductDetail(props) {
  const { product } = props;

  return (
    <Container
      fluidstyle={{
        width: "90%",
        marginTop: "20px",
        left: "15%",
        rigth: "15%",
      }}
    >
      <Grid stackable>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Header as="h1">{product?.name}</Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={8} textAlign="center">
            <Carousel name={product?.name} images={product?.images} />
          </Grid.Column>
          <Grid.Column width={4}>general datra</Grid.Column>
          <Grid.Column width={4}>
            <CartCard product={product} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}
