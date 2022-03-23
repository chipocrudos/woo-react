import { useState } from "react";
import { useRouter } from "next/router";
import { Footer, Header, UserLayout } from "../../layouts";
import { getHeaderFooter } from "../../api/site";
import { useAuth } from "../../hooks";
import { Grid, GridColumn } from "semantic-ui-react";
import { CenterMessage, RegisterForm } from "../../components";

export default function Signup(props) {
  const { headerFooter } = props;
  const { auth } = useAuth();
  const router = useRouter();
  const [create, setCreate] = useState(false);

  if (auth?.me)
    router.push({
      pathname: "/",
    });

  const onUserCreate = () => {
    setCreate(true);
    setTimeout(() => {
      router.push({
        pathname: "/login",
      });
    }, 3000);
  };

  return (
    <>
      <Header header={headerFooter?.header} />
      <UserLayout>
        <Grid>
          <Grid.Row centered>
            <GridColumn textAlign="center" width={8}>
              {create ? (
                <CenterMessage
                  messageType="positive"
                  header="Usuario creado"
                  icon="check"
                  columns="1"
                  content="Su usuario se ha creado correctamente, ya puede ingresar con su cuenta."
                />
              ) : (
                <RegisterForm onUserCreate={onUserCreate} />
              )}
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
