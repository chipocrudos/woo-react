import { Grid, GridColumn, Loader } from "semantic-ui-react";
import { ProductCard } from "..";

export function ProductsList(props) {
  const { products } = props;

  return (
    <Grid columns={3} container doubling stackable>
      {products.length ? (
        products.map((product) => (
          <GridColumn key={product.id}>
            <ProductCard product={product} />
          </GridColumn>
        ))
      ) : (
        <Loader size="large"> Cargando ...</Loader>
      )}
    </Grid>
  );
}
