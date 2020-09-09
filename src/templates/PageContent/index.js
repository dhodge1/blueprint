import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import PropTypes from "prop-types";
import { useViewportStatus } from "/utils";
import { UserContext } from "/context";

const PageContent = ({ children, className }) => {
  const themeContext = useContext(ThemeContext);
  const { isEntitled } = useContext(UserContext) || { isEntitled: false };
  const { wideDesktop } = themeContext.mediaQueries;
  const [isWideDesktop] = useViewportStatus(`(${wideDesktop})`);

  return (
    <ContentContainer className={className}>
      <InnerContainer>
        <ContentColumn>{children}</ContentColumn>
        {isWideDesktop && !isEntitled ? (
          <AdColumn data-slot-type="dfp_bigbox">
            <img src="https://via.placeholder.com/300x250" alt="..." />
          </AdColumn>
        ) : null}
      </InnerContainer>
    </ContentContainer>
  );
};

PageContent.propTypes = {
  className: PropTypes.string,
};

const ContentContainer = styled.section`
  background-color: ${(p) => p.theme.colors.lightGray};
  margin-top: -15px;
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;

  @media (${(p) => p.theme.mediaQueries.desktop}) {
    padding: 0 ${(p) => p.theme.padding.small};
  }

  @media (${(p) => p.theme.mediaQueries.classLandingGrid}) {
    display: flex;
    justify-content: center;
    padding: 0;
  }
  @media print {
    background-color: ${(p) => p.theme.colors.white};
    min-height: 0;
  }
`;

ContentContainer.displayName = "ContentContainer";

const InnerContainer = styled.div`
  width: 100%;

  @media (${(p) => p.theme.mediaQueries.classLandingGrid}) {
    max-width: ${(p) => p.theme.page.mediumWidth};
  }

  @media (${(p) => p.theme.mediaQueries.wideDesktop}) {
    display: flex;
    justify-content: space-between;
    max-width: ${(p) => p.theme.page.wideWidth};
  }
`;

InnerContainer.displayName = "InnerContainer";

const ContentColumn = styled.div`
  border: 0;
  width: 100%;
`;

ContentColumn.displayName = "ContentColumn";

const AdColumn = styled.div`
  align-items: flex-start;
  margin-left: ${(p) => p.theme.margin.medium};
  padding-top: 65px;
  @media print {
    display: none;
  }
`;

AdColumn.displayName = "AdColumn";

export default PageContent;
