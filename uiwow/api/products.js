import { apiWoo } from "../config/woocommerce";
import { filterSearch } from "../helpers";

export const getProductsApi = async (query) => {
  const filterQuery = filterSearch({}, query);
  const { data, headers } = await apiWoo.get("products", {
    per_page: filterQuery?.perPage || 12,
    ...filterQuery,
  });
  // console.log(data, headers);

  const { "x-wp-total": xTotal, "x-wp-totalpages": xTotalPages } = headers;
  const response = { data, xTotal, xTotalPages };

  return response || {};
};

export const getProductApi = async ({ slug }) => {
  const { data: product } = await apiWoo.get("products", {
    per_page: 1,
    slug,
  });

  if (product?.length) return product[0];
  else return {};
};
