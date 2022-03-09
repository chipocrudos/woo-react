export const filterSearch = (
  query,
  {
    page,
    perPage,
    search,
    offset,
    order,
    orderBy,
    slug,
    attribute,
    min_price,
    max_price,
  }
) => {
  if (page) query.page = page;
  if (perPage) query.perPage = perPage;
  if (search) query.search = search;
  if (offset) query.offset = offset;
  if (order) query.order = order;
  if (orderBy) query.orderBy = orderBy;
  if (slug) query.slug = slug;
  if (attribute) query.attribute = attribute;
  if (min_price) query.min_price = min_price;
  if (max_price) query.max_price = max_price;

  return query;
};
