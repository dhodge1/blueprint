import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { useViewportStatus } from "/utils";
const PageContext = React.createContext();

const PageProvider = (props) => {
  const themeContext = useContext(ThemeContext);
  const { mobile } = themeContext.mediaQueries;
  const [isMobile] = useViewportStatus(`(${mobile})`);

  const context = {
    isMobile,
  };

  return (
    <PageContext.Provider value={context}>
      {props.children}
    </PageContext.Provider>
  );
};

export { PageProvider, PageContext };
