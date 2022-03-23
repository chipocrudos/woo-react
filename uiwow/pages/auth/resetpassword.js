import { useState } from "react";
import { useRouter } from "next/router";
import { Footer, Header, UserLayout } from "../../layouts";
import { getHeaderFooter } from "../../api/site";
import { useAuth } from "../../hooks";
import { Grid, GridColumn } from "semantic-ui-react";
import { CenterMessage, ResetPasswordForm } from "../../components";

export default function Login(props) {
  const { headerFooter } = props;
  const { auth } = useAuth();
  const router = useRouter();
  const [resetPassword, setResetPassword] = useState(false);

  if (auth?.me)
    router.push({
      pathname: "/",
    });

  const onResetPassword = () => {
    setResetPassword(true);
    setTimeout(() => {
      router.push({
        pathname: "/",
      });
    }, 3000);
  };

  return (
    <>
      <Header header={headerFooter?.header} />
      <UserLayout>
        <Grid>
          <Grid.Row centered>
            <GridColumn textAlign="center" width={6}>
              {resetPassword ? (
                <CenterMessage
                  messagetype="positive"
                  header="Correo enviado"
                  icon="exclamation"
                  columns="1"
                  content="Se le ha enviado un correo electrónico para realizar el cambio."
                />
              ) : (
                <ResetPasswordForm onResetPassword={onResetPassword} />
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
