import { useRouter } from "next/router";
import { Footer, Header, UserLayout } from "../layouts";
import { getHeaderFooter } from "../api/site";
import { getProductsApi } from "../api/products";
import { ProductsList, Paginate, CenterMessage } from "../components";
import { filterSearch } from "../helpers";

export default function Home(props) {
  const { headerFooter, products, xTotal, xTotalPages } = props;
  const { query } = useRouter();
  const router = useRouter();

  const pageHandler = (d) => {
    router.push({
      pathname: router.pathname,
      query: filterSearch(query, { page: d.activePage }),
    });
  };

  return (
    <>
      <Header header={headerFooter?.header} />
      <UserLayout>
        {xTotal === "0" ? (
          <CenterMessage
            color="orange"
            header="Resultados"
            content="No se encontraron resultados"
          />
        ) : (
          <>
            <ProductsList products={products} />
            <Paginate
              xTotalPages={xTotalPages}
              page={query?.page || 1}
              pageHandler={pageHandler}
            />
          </>
        )}
      </UserLayout>
      <Footer footer={headerFooter?.footer} header={headerFooter?.header} />
    </>
  );
}

export async function getServerSideProps({ query }) {
  const { data: headerFooter } = await getHeaderFooter();
  const { data: products, xTotal, xTotalPages } = await getProductsApi(query);

  const data = { headerFooter, products, xTotal, xTotalPages };

  return {
    props: data || {},
  };
}
