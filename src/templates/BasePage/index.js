import { ThemeProvider } from "styled-components";
import { FNKTheme } from "/styles/themes";
import GlobalStyle from "/styles/global";
import { ExternalStyle, Footer, Meta } from "/organisms";
import { PageProvider } from "/context";
import config from "/config";

const BasePage = ({ children }) => {
  const { footer } = config;

  return (
    <ThemeProvider theme={FNKTheme}>
      <PageProvider>
        <GlobalStyle />
        <ExternalStyle />
        <Meta />
        {children}
        <Footer footer={footer} />
      </PageProvider>
    </ThemeProvider>
  );
};

export default BasePage;
