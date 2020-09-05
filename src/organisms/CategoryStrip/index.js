import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { CardHeading, Image, LeftButton, RightButton } from "/atoms";
import { replaceAll, safeString } from "/utils";

const Category = ({ item, index }) => {
  const { primaryImage, name, filters } = item;
  const imageUrl = primaryImage?.url ?? "#";
  const sanitizedName = replaceAll(name, "\\s", "_").toLowerCase();

  const handleClick = () => {
    const topicName = safeString(name);
    console.log(topicName, index);
  };

  return (
    <Link
      href={{
        pathname: "/kitchen/classes/topics/[...topics]",
        query: { filters: JSON.stringify(filters) },
      }}
      as={`/kitchen/classes/topics/${sanitizedName}`}
    >
      <a onClick={handleClick}>
        <MediaBlock>
          <StyledImageWrapper>
            <StyledImage src={imageUrl} />
          </StyledImageWrapper>
          <CardHeading size={"extraSmall"}>{name}</CardHeading>
        </MediaBlock>
      </a>
    </Link>
  );
};

Category.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

Category.displayName = "Category";

const CategoryStrip = ({ items, isMobile, isEntitled }) => {
  const scrollElement = useRef(null);
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [offsetRight, setOffsetRight] = useState(0);

  const getScrollOffsetRight = () =>
    setOffsetRight(
      scrollElement.current.scrollWidth -
        (scrollElement.current.offsetWidth + scrollElement.current.scrollLeft)
    );

  useEffect(() => {
    getScrollOffsetRight();
  });

  const scroll = (direction) => {
    const { current } = scrollElement;
    const scrollLeft =
      direction === "left"
        ? current.scrollLeft - current.offsetWidth
        : current.scrollLeft + current.offsetWidth;

    current.scrollTo({
      top: 0,
      left: scrollLeft,
      behavior: "smooth",
    });
    setOffsetLeft(scrollLeft);
  };

  const handleScroll = () => {
    setOffsetLeft(scrollElement.current.scrollLeft);
  };

  return items?.length > 0 ? (
    <FlexContainer isEntitled={isEntitled}>
      <FlexWrapper onScroll={handleScroll} isEntitled={isEntitled}>
        <ScrollElement ref={scrollElement}>
          {items.map((item, index) => (
            <Category key={item.name} index={index} item={item} />
          ))}
        </ScrollElement>
      </FlexWrapper>
      <LeftButtonWrapper>
        <LeftButton
          offsetLeft={offsetLeft}
          handleClick={scroll}
          isMobile={isMobile}
        />
      </LeftButtonWrapper>
      <RightButtonWrapper>
        <RightButton
          offsetRight={offsetRight}
          handleClick={scroll}
          isMobile={isMobile}
        />
      </RightButtonWrapper>
    </FlexContainer>
  ) : null;
};

CategoryStrip.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  isMobile: PropTypes.bool,
  isEntitled: PropTypes.bool,
};

const FLEX_CONTAINER_ENTITLED = css`
  @media (${(p) => p.theme.mediaQueries.classLandingGrid}) {
    flex: 1 1 ${(p) => p.theme.page.maxWidth};
    max-width: calc(
      ${(p) => p.theme.page.maxWidth} - (${(p) => p.theme.margin.small} * 4)
    );
  }
`;

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: ${(p) => p.theme.margin.none} auto;
  position: relative;

  @media (${(p) => p.theme.mediaQueries.classLandingGrid}) {
    flex: 0 0 ${(p) => p.theme.page.mediumWidth};
    max-width: ${(p) => p.theme.page.mediumWidth};
  }

  @media (${(p) => p.theme.mediaQueries.wideDesktop}) {
    flex: 1 1 ${(p) => p.theme.page.maxWidth};
    max-width: calc(
      ${(p) => p.theme.page.maxWidth} - (${(p) => p.theme.margin.small} * 4)
    );
  }

  ${(p) => p.isEntitled && FLEX_CONTAINER_ENTITLED}
`;

const FLEX_WRAPPER_ENTITLED = css`
  @media (${(p) => p.theme.mediaQueries.classLandingGrid}) {
    flex: 1 1 ${(p) => p.theme.page.maxWidth};
  }
`;

const FlexWrapper = styled.div`
  background-color: ${(p) => p.theme.colors.white};
  border-radius: ${(p) => p.theme.borderRadius};
  overflow-y: hidden;
  overflow-x: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(p) => p.theme.padding.medium} 0;

  @media (${(p) => p.theme.mediaQueries.desktop}) {
    overflow: hidden;
  }

  @media (${(p) => p.theme.mediaQueries.classLandingGrid}) {
    flex: 0 0 ${(p) => p.theme.page.mediumWidth};
  }

  @media (${(p) => p.theme.mediaQueries.wideDesktop}) {
    flex: 1 1 ${(p) => p.theme.page.maxWidth};
    max-width: calc(
      ${(p) => p.theme.page.maxWidth} - (${(p) => p.theme.margin.small} * 4)
    );
    padding: ${(p) => p.theme.padding.large} ${(p) => p.theme.padding.none}
      ${(p) => p.theme.padding.medium};
  }

  ${(p) => p.isEntitled && FLEX_WRAPPER_ENTITLED}
`;

const ScrollElement = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  scrollbar-width: none;

  @media (${(p) => p.theme.mediaQueries.desktop}) {
    overflow-y: scroll;
  }

  & ::-webkit-scrollbar {
    background: transparent;
  }
`;

const MediaBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  text-align: center;
  margin-right: ${(p) => p.theme.margin.none};
  width: 102px;
`;

MediaBlock.displayName = "MediaBlock";

const StyledImageWrapper = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${(p) => p.theme.margin.medium};
`;

const StyledImage = styled(Image)`
  height: 60px;
  display: block;
  width: 60px;
`;

StyledImage.displayName = "StyledImage";

const ARROW_BUTTON_STYLES = css`
  position: absolute;
  top: 35%;
`;

const LeftButtonWrapper = styled.div`
  ${ARROW_BUTTON_STYLES}
  left: -26px;
`;

const RightButtonWrapper = styled.div`
  ${ARROW_BUTTON_STYLES}
  right: -26px;
`;

export default CategoryStrip;
