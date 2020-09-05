import { useState, useEffect, useContext } from "react";
import styled, { css, ThemeContext } from "styled-components";
import PropTypes from "prop-types";
import { UserContext } from "/context";
import { ButtonText, SubHeading } from "/atoms";
import { MediaItem } from "/molecules";
import { useViewportStatus } from "/utils";

const ChefBlock = ({ block, className }) => {
  const { title, topics } = block;
  const { isEntitled } = useContext(UserContext) || { isEntitled: false };
  const themeContext = useContext(ThemeContext);
  const { desktop } = themeContext.mediaQueries;
  const [isDesktop] = useViewportStatus(`(${desktop})`);
  const [truncated, setTruncated] = useState(true);
  const [limit, setLimit] = useState(9);
  const [chefs, setChefs] = useState(topics.slice(0, limit));

  const expand = (e) => {
    e.preventDefault();
    setLimit(topics.length);
    setTruncated(false);
  };

  useEffect(() => {
    if (truncated) {
      setLimit(isDesktop ? (isEntitled ? 11 : 9) : 5);
    }
  }, [isDesktop, truncated, isEntitled, setLimit]);

  useEffect(() => {
    setChefs(topics.slice(0, limit));
  }, [limit, setChefs]);

  return chefs && chefs.length > 0 ? (
    <Wrapper className={className} isEntitled={isEntitled}>
      <StyledSubHeading isEntitled={isEntitled}>{title}</StyledSubHeading>
      <UnorderedList isEntitled={isEntitled}>
        {chefs.map((chef, index) => (
          <StyledMediaItem
            index={index}
            item={chef}
            key={chef.name}
            isEntitled={isEntitled}
            responsive
          />
        ))}
        {truncated && (
          <CTAWrapper href="#" isEntitled={isEntitled} onClick={expand}>
            <CTA>
              <StyledButtonText>View More</StyledButtonText>
            </CTA>
          </CTAWrapper>
        )}
      </UnorderedList>
    </Wrapper>
  ) : null;
};

ChefBlock.propTypes = {
  block: PropTypes.object.isRequired,
  className: PropTypes.string,
};

ChefBlock.displayName = "ChefBlock";

const WRAPPER_ENTITLED = css`
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    max-width: calc(
      ${(p) => p.theme.page.maxWidth} - (${(p) => p.theme.margin.small} * 4)
    );
  }
  @media (min-width: calc(${(p) => p.theme.page.maxWidth} - (${(p) =>
      p.theme.margin.small} * 4))) {
    padding: ${(p) => p.theme.padding.none};
  }
`;

const WRAPPER_UNENTITLED = css`
  @media (${(p) => p.theme.mediaQueries.mediumDesktop}) {
    padding: ${(p) => p.theme.padding.none};
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  padding: ${(p) => p.theme.padding.none} calc(${(p) => p.theme.padding.small});
  margin: ${(p) => p.theme.margin.small} ${(p) => p.theme.margin.none};
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    max-width: ${(p) => p.theme.page.mediumWidth};
  }
  ${(p) => (p.isEntitled ? WRAPPER_ENTITLED : WRAPPER_UNENTITLED)}
`;

const UNORDERED_LIST_ENTITLED = css`
  @media (min-width: calc(${(p) => p.theme.page.maxWidth} - (${(p) =>
      p.theme.margin.small} * 4))) {
    margin: ${(p) => p.theme.margin.small} ${(p) => p.theme.margin.none};
  }
`;
const UNORDERED_LIST_UNENTITLED = css`
  @media (${(p) => p.theme.mediaQueries.mediumDesktop}) {
    margin: ${(p) => p.theme.margin.small} ${(p) => p.theme.margin.none};
  }
`;

const UnorderedList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: center;
  padding: ${(p) => p.theme.padding.medium} ${(p) => p.theme.padding.none}
    ${(p) => p.theme.padding.none} ${(p) => p.theme.padding.none};
  margin: ${(p) => p.theme.margin.none}
    calc(${(p) => p.theme.margin.small} * -1);
  width: 100vw;
  background-color: ${(p) => p.theme.colors.white};
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    border-radius: ${(p) => p.theme.borderRadius};
    width: 100%;
    margin: ${(p) => p.theme.margin.small};
  }
  ${(p) => (p.isEntitled ? UNORDERED_LIST_ENTITLED : UNORDERED_LIST_UNENTITLED)}
`;

const ITEM_ENTITLED = css`
  @media (${(p) => p.theme.mediaQueries.classLandingGrid}) {
    flex: 0 1 16.667%;
  }
`;

const COMMON_FLEX = css`
  flex: 1 1 33.3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: calc(${(p) => p.theme.margin.space} * 3);
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    flex: 0 1 20%;
  }
  ${(p) => p.isEntitled && ITEM_ENTITLED}
`;

const StyledMediaItem = styled(MediaItem)`
  ${COMMON_FLEX}
`;

const CTAWrapper = styled.a`
  ${COMMON_FLEX}
`;

const CTA = styled.div`
  border-radius: 50%;
  background-color: ${(p) => p.theme.colors.pink};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 96px;
  height: 96px;
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    width: 138px;
    height: 138px;
  }
`;

const StyledButtonText = styled(ButtonText)`
  color: ${(p) => p.theme.colors.white};
  text-transform: capitalize;
`;

const STYLED_SUB_HEADING_ENTITLED = css`
  @media (min-width: calc(${(p) => p.theme.page.maxWidth} - (${(p) =>
      p.theme.margin.small} * 4))) {
    padding: ${(p) => p.theme.margin.small} ${(p) => p.theme.padding.none};
  }
`;
const STYLED_SUB_HEADING_UNENTITLED = css`
  @media (${(p) => p.theme.mediaQueries.mediumDesktop}) {
    padding: ${(p) => p.theme.margin.small} ${(p) => p.theme.padding.none};
  }
`;

const StyledSubHeading = styled(SubHeading)`
  padding: ${(p) => p.theme.padding.small};
  flex: 1 1 100%;
  width: 100vw;
  ${(p) =>
    p.isEntitled ? STYLED_SUB_HEADING_ENTITLED : STYLED_SUB_HEADING_UNENTITLED}
`;

export default ChefBlock;
