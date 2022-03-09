import Head from "next/head";
import { TopMenu } from "../components";

export function Header(props) {
  const { header } = props;

  return (
    <>
      <Head>
        <title>{header.siteTitle}</title>
        {!!header?.favicon && <link rel="icon" href={header.favicon} />}
      </Head>

      <TopMenu
        siteLogoUrl={header.siteLogoUrl}
        headerMenuItems={header.headerMenuItems}
        siteTitle={header.siteTitle}
        siteDescription={header.siteDescription}
      />
    </>
  );
}
