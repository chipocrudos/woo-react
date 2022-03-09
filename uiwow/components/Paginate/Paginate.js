import { Grid, Pagination } from "semantic-ui-react";

export function Paginate(props) {
  const { xTotalPages, page, pageHandler } = props;

  if (xTotalPages === "1") return null;

  return (
    <Grid
      columns={3}
      container
      doubling
      stackable
      textAlign="center"
      style={{ marginTop: "40px", marginBottom: "30px" }}
    >
      <Pagination
        defaultActivePage={page}
        totalPages={xTotalPages}
        boundaryRange={0}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        siblingRange={3}
        onPageChange={(_, data) => pageHandler(data)}
      />
    </Grid>
  );
}
