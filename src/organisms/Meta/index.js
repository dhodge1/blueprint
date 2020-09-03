import Head from 'next/head';
import config from '/config';

const {
  meta: {
    titles: { classLanding: pageTitle }
  }
} = config;

const Meta = () => (
  <Head>
    <meta name="application-name" content="Food Network Kitchen" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />

    <link rel="apple-touch-icon" sizes="57x57" href={`${config.publicFolderPath}/favicons/apple-touch-icon-57x57.png`}></link>
    <link rel="apple-touch-icon" sizes="114x114" href={`${config.publicFolderPath}/favicons/apple-touch-icon-114x114.png`}></link>
    <link rel="apple-touch-icon" sizes="72x72" href={`${config.publicFolderPath}/favicons/apple-touch-icon-72x72.png`}></link>
    <link rel="apple-touch-icon" sizes="144x144" href={`${config.publicFolderPath}/favicons/apple-touch-icon-144x144.png`}></link>
    <link rel="apple-touch-icon" sizes="60x60" href={`${config.publicFolderPath}/favicons/apple-touch-icon-60x60.png`}></link>
    <link rel="apple-touch-icon" sizes="120x120" href={`${config.publicFolderPath}/favicons/apple-touch-icon-120x120.png`}></link>
    <link rel="apple-touch-icon" sizes="76x76" href={`${config.publicFolderPath}/favicons/apple-touch-icon-76x76.png`}></link>
    <link rel="apple-touch-icon" sizes="152x152" href={`${config.publicFolderPath}/favicons/apple-touch-icon-152x152.png`}></link>
    <link rel="apple-touch-icon" sizes="180x180" href={`${config.publicFolderPath}/favicons/apple-touch-icon-180x180.png`}></link>
    <link rel="icon" type="image/png" href={`${config.publicFolderPath}/favicons/favicon-192x192.png`} sizes="192x192"></link>
    <link rel="icon" type="image/png" href={`${config.publicFolderPath}/favicons/favicon-160x160.png`} sizes="160x160"></link>
    <link rel="icon" type="image/png" href={`${config.publicFolderPath}/favicons/favicon-96x96.png`} sizes="96x96"></link>
    <link rel="icon" type="image/png" href={`${config.publicFolderPath}/favicons/favicon-16x16.png`} sizes="16x16"></link>
    <link rel="icon" type="image/png" href={`${config.publicFolderPath}/favicons/favicon-32x32.png`} sizes="32x32"></link>

    <meta property="og:site_name" content={pageTitle} />
    <meta property="fb:app_id" content="582148248497951"/>

    <script async src={`${config?.scripts?.adobedtm}`}></script>
  </Head>
);

export default Meta;
