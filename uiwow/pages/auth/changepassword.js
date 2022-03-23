import { useState } from "react";
import { useRouter } from "next/router";
import { Footer, Header, UserLayout } from "../../layouts";
import { getHeaderFooter } from "../../api/site";
import { useAuth } from "../../hooks";
import { Grid, GridColumn } from "semantic-ui-react";
import { CenterMessage, ChangePasswordForm } from "../../components";

export default function ChangePassword(props) {
  const { headerFooter } = props;
  const { auth } = useAuth();
  const router = useRouter();
  const [change, setChange] = useState(false);

  if (auth?.me)
    router.push({
      pathname: "/",
    });

  const onChangePassword = () => {
    setChange(true);
    setTimeout(() => {
      router.push({
        pathname: "/auth/login",
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
              {change ? (
                <CenterMessage
                  messageType="positive"
                  header="Cambio de contraseña"
                  icon="check"
                  columns="1"
                  content="Contraseña actualizada correctamente, ya puede ingresar con su cuenta."
                />
              ) : (
                <ChangePasswordForm onChangePassword={onChangePassword} />
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
