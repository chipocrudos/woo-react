import { useRouter } from "next/router";
import { Footer, Header, UserLayout } from "../layouts";
import { getHeaderFooter } from "../api/site";
import { useAuth } from "../hooks";
import { Grid, GridColumn } from "semantic-ui-react";
import { RegisterForm } from "../components";

export default function Signup(props) {
  const { headerFooter } = props;
  const { auth } = useAuth();
  const router = useRouter();

  if (auth?.me)
    router.push({
      pathname: "/",
    });

  return (
    <>
      <Header header={headerFooter?.header} />
      <UserLayout>
        <Grid>
          <Grid.Row centered>
            <GridColumn textAlign="center" width={4}>
              <RegisterForm />
            </GridColumn>
          </Grid.Row>
        </Grid>
      </UserLayout>
      <Footer footer={headerFooter?.footer} header={headerFooter?.header} />
    </>
  );
}

export async function getServerSideProps() {
  const { data: headerFooter } = await getHeaderFooter();

  const data = { headerFooter };

  return {
    props: data || {},
  };
}
