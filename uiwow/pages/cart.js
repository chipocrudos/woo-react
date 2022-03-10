import { Grid, Container, Header, Button, Icon } from "semantic-ui-react";
import { Footer, Header as CustomHeader, UserLayout } from "../layouts";
import { getHeaderFooter } from "../api/site";
import { CenterMessage, CartProducts } from "../components";

import { useClient } from "../hooks";
import { useState } from "react";

export default function Home(props) {
  const { headerFooter } = props;
  const { cart, setCart } = useClient();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <CustomHeader header={headerFooter?.header} />
      <UserLayout>
        {!!!cart ? (
          <CenterMessage
            color="yellow"
            header="Carrito de compras vacio"
            content="Busca entre nuestros productos"
          />
        ) : (
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
                  <Header as="h1">Carrito de compras</Header>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column>
                  <CartProducts
                    cart={cart}
                    setCart={setCart}
                    setLoading={setLoading}
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column>
                  <Header as="h2" floated="right">
                    <Button
                      color="blue"
                      basic={loading}
                      animated
                      loading={loading}
                    >
                      <Button.Content hidden>
                        <Icon name="payment" />
                        Proceder al pago
                      </Button.Content>
                      <Button.Content visible>
                        Continuar con la compra
                      </Button.Content>
                    </Button>
                  </Header>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        )}
      </UserLayout>
      <Footer footer={headerFooter?.footer} header={headerFooter?.header} />
    </>
  );
}

export async function getServerSideProps({ query }) {
  const { data: headerFooter } = await getHeaderFooter();
  const data = { headerFooter };

  return {
    props: data || {},
  };
}
