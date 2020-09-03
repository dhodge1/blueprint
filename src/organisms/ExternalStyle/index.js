import Head from 'next/head';
import config from '/config';

const { videoStylesheet } = config?.playerUrls;

const ExternalStyle = () => (
  <Head>
    <link
      rel="stylesheet"
      href="https://use.typekit.net/ebr6csz.css"
    />
    <link
      rel="stylesheet"
      href={videoStylesheet}
    />
  </Head>
);

export default ExternalStyle;
