import '/styles/globals.css';
import { ReactQueryCacheProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { ReactQueryDevtools } from 'react-query-devtools';
import { BasePage } from '/templates';

function MyApp({ Component, pageProps }) {
  return (
    <ReactQueryCacheProvider>
      <Hydrate state={pageProps.dehydratedState}>
        <BasePage>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </BasePage>
      </Hydrate>
    </ReactQueryCacheProvider>
  );
}

export default MyApp;
