import { ClientProvider, AuthProvider } from "../context";
import "semantic-ui-css/semantic.min.css";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ClientProvider>
        <Component {...pageProps} />
      </ClientProvider>
    </AuthProvider>
  );
}

export default MyApp;
