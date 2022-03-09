import { ClientProvider } from "../context/ClientContext";
import "semantic-ui-css/semantic.min.css";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <ClientProvider>
      <Component {...pageProps} />
    </ClientProvider>
  );
}

export default MyApp;
