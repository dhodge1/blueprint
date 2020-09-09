import PropTypes from "prop-types";
import styled from "styled-components";
import { SubHeading } from "/atoms";

const LiveClassesDayBlock = ({ children, title }) => {
  return (
    <Wrapper>
      <SubHeadingWrapper>
        <SubHeading
          lineHeight={"large"}
          mobileSize={"mediumLarge"}
          desktopSize={"XL"}
        >
          {title}
        </SubHeading>
      </SubHeadingWrapper>
      {children}
    </Wrapper>
  );
};

LiveClassesDayBlock.propTypes = {
  title: PropTypes.string.isRequired,
};

const Wrapper = styled.section`
  margin-bottom: ${(p) => p.theme.margin.large};
  width: 100%;

  @media (${(p) => p.theme.mediaQueries.classLandingGrid}) {
    margin-bottom: ${(p) => p.theme.margin.extraLarge};
  }
`;

const SubHeadingWrapper = styled.div`
  margin: ${({
    theme: {
      margin: { large, space },
    },
  }) => `${large} 0 ${space} 0`};
  padding: ${({
    theme: {
      padding: { small },
    },
  }) => `0 ${small}`};

  @media (${(p) => p.theme.mediaQueries.desktop}) {
    margin: ${({
      theme: {
        margin: { large, small },
      },
    }) => `${large} 0 ${small} 0`};
    padding: 0;
  }
`;

export default LiveClassesDayBlock;
