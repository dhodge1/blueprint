import { ThemeProvider } from 'styled-components';
import { FNKTheme } from '/styles/themes';
import GlobalStyle from '/styles/global';
import {
  ExternalStyle,
  Footer,
  Meta,
} from '/organisms';
import config from '/config';

const BasePage = ({ children }) => {
  const { footer } = config;

  return (
      <ThemeProvider theme={FNKTheme}>
        <GlobalStyle />
        <ExternalStyle />
        <Meta />
        {children}
        <Footer footer={footer}/>
      </ThemeProvider>
  );
};

export default BasePage;
