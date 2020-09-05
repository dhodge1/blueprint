import "/styles/globals.css";
import { ReactQueryCacheProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ReactQueryDevtools } from "react-query-devtools";
import { BasePage } from "/templates";
import { UserProvider } from "/context";

function MyApp({ Component, pageProps }) {
  return (
    <ReactQueryCacheProvider>
      <Hydrate state={pageProps.dehydratedState}>
        <UserProvider>
          <BasePage>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </BasePage>
        </UserProvider>
      </Hydrate>
    </ReactQueryCacheProvider>
  );
}

export default MyApp;
