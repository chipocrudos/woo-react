import { Loader } from "semantic-ui-react";
import { getProductApi } from "../../api/products";
import { getHeaderFooter } from "../../api/site";
import { CenterMessage } from "../../components";
import { Footer, Header, UserLayout } from "../../layouts";
import { ProductDetail } from "../../components";

export default function ProductSlug(props) {
  const { headerFooter, product } = props;

  return (
    <>
      <Header header={headerFooter?.header} />
      <UserLayout>
        {!!product ? (
          <ProductDetail product={product} />
        ) : !!product?.name ? (
          <CenterMessage content="El artículo que busca no se encuentra" />
        ) : (
          <Loader inline />
        )}
      </UserLayout>
      <Footer footer={headerFooter?.footer} header={headerFooter?.header} />
    </>
  );
}

export async function getServerSideProps({ query }) {
  const { data: headerFooter } = await getHeaderFooter();
  const product = await getProductApi(query);

  const data = { headerFooter, product };

  return {
    props: data || {},
  };
}
