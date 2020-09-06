/* eslint-disable no-unused-vars */
import { useContext } from "react";
import styled, { css } from "styled-components";
import { useQuery, makeQueryCache } from "react-query";
import { dehydrate } from "react-query/hydration";
import Head from "next/head";
import { postGraphQLRequest } from "/utils";
import { GET_LANDING_PAGE } from "/data";
import { UserContext, PageContext } from "/context";
import config from "/config";
import { SubHeading } from "/atoms";
import { ReusableContainer } from "/molecules";
import { LandingHeader, CategoryStrip } from "/organisms";
import { ChefBlock, ClassBlock, LiveClassesBlock, RightRail } from "/templates";

const {
  classLandingPage,
  meta: {
    titles: { classLanding: pageTitle },
    descriptions: { classLanding: pageDescription },
  },
} = config;

const getComponentFromBlock = (block, isEntitled, isMobile) => {
  const { __typename: blockType, title } = block;
  switch (blockType) {
    case "TalentTopicsBlock":
      return <ChefBlock key={title} block={block} />;
    case "LiveClassesBlock":
      return (
        <StyledLiveClassesBlock
          key={title}
          block={block}
          isMobile={isMobile}
          isEntitled={isEntitled}
        />
      );
    case "ProgrammableBlock":
    case "PreviouslyLiveBlock":
    case "JumpBackInBlock":
      return (
        <StyledClassBlock
          key={title}
          block={block}
          isMobile={isMobile}
          isEntitled={isEntitled}
        />
      );
    case "TopicsBlock":
    default:
      return null;
  }
};

// TODO: Add token to query key and pass it to post
const queryKey = "getClassLandingPage";

const getClassLandingPage = () => {
  return postGraphQLRequest(GET_LANDING_PAGE, "GET_LANDING_PAGE", {
    ...classLandingPage,
  });
};

export async function getStaticProps() {
  const queryCache = makeQueryCache();
  await queryCache.prefetchQuery(queryKey, getClassLandingPage);
  return {
    props: {
      dehydratedState: dehydrate(queryCache),
    },
    revalidate: 1,
  };
}

const ClassLandingPage = () => {
  const { isEntitled } = useContext(UserContext) || { isEntitled: false };
  const { isMobile } = useContext(PageContext) || { isMobile: true };
  const { isError, data, error } = useQuery(queryKey, getClassLandingPage);

  if (isError) {
    return (
      <ReusableContainer>
        <p>Error...{error.message}</p>
      </ReusableContainer>
    );
  }

  const { blocks } = data.landingPage;
  const useableBlocks = blocks.filter(
    (block) =>
      Object.keys(block).length &&
      (Object.prototype.hasOwnProperty.call(block, "items") ||
        Object.prototype.hasOwnProperty.call(block, "topics"))
  );
  const categoriesBlock = blocks.filter(
    (block) => block.__typename === "TopicsBlock"
  );
  const [categories] = categoriesBlock;

  return (
    <LandingPage>
      <Head>
        <title key="title">{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>
      <LandingHead>
        <LandingHeader pageType={"Classes"} isEntitled={isEntitled} />
        {categories?.topics && (
          <CategoryStripWrapper isEntitled={isEntitled}>
            <StyledSubHeading
              fontFamily={"primary"}
              weight={"semiBold"}
              isEntitled={isEntitled}
            >
              Browse Classes by Category
            </StyledSubHeading>
            <CategoryStrip
              items={categories.topics}
              isMobile={isMobile}
              isEntitled={isEntitled}
            />
          </CategoryStripWrapper>
        )}
      </LandingHead>
      <LandingBody>
        <LandingMain isEntitled={isEntitled}>
          {useableBlocks.map((block) =>
            getComponentFromBlock(block, isEntitled, isMobile)
          )}
        </LandingMain>
        {!isEntitled && <LandingRightRail></LandingRightRail>}
      </LandingBody>
    </LandingPage>
  );
};

const COMMON_FLEX = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const LANDING_RR_BASIS = "300px";
const LANDING_BODY_MOBILE_BASIS = "335px";

const LandingPage = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  background-color: ${(p) => p.theme.colors.lightGray};
  ${COMMON_FLEX}
  align-items: flex-start;
`;

const LandingHead = styled.header`
  flex: 1 1 100vw;
  max-width: 100%;
  ${COMMON_FLEX}
`;

const LandingBody = styled.div`
  flex: 1 1 100vw;
  max-width: 100%;
  min-width: calc(
    (${(p) => p.theme.padding.small} * 2) + ${LANDING_BODY_MOBILE_BASIS}
  );
  ${COMMON_FLEX}
  @media(${(p) => p.theme.mediaQueries.desktop}) {
    flex: 1 1 ${(p) => p.theme.page.maxWidth};
    max-width: ${(p) => p.theme.page.maxWidth};
  }
`;

const LANDING_MAIN_UNENTITLED = css`
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    flex: 1 1
      calc(
        (${(p) => p.theme.padding.small} * 2) +
          ${(p) => p.theme.page.mediumWidth}
      );
  }
`;

const LandingMain = styled.main`
  flex: 1 1 100%;
  ${COMMON_FLEX}
  ${(p) => !p.isEntitled && LANDING_MAIN_UNENTITLED}
`;

const LandingRightRail = styled(RightRail)`
  flex: 1 0 100%;
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    flex: 1 0 ${LANDING_RR_BASIS};
  }
`;

const CLASS_BLOCK_UNENTITLED = css`
  @media (${(p) => p.theme.mediaQueries.classLandingGrid}) {
    flex: 0 0
      calc(
        (${(p) => p.theme.padding.small} * 4) +
          ${(p) => p.theme.page.mediumWidth}
      );
  }
`;

const StyledClassBlock = styled(ClassBlock)`
  flex: 1 1 100%;
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    justify-content: flex-start;
  }
  ${(p) => !p.isEntitled && CLASS_BLOCK_UNENTITLED}
`;

const LIVE_CLASSES_BLOCK_UNENTITLED = css`
  @media (${(p) => p.theme.mediaQueries.classLandingGrid}) {
    flex: 0 0
      calc(
        (${(p) => p.theme.padding.small} * 4) +
          ${(p) => p.theme.page.mediumWidth}
      );
  }
`;

const StyledLiveClassesBlock = styled(LiveClassesBlock)`
  ${(p) => !p.isEntitled && LIVE_CLASSES_BLOCK_UNENTITLED}
`;

const CategoryStripWrapper = styled.div`
  padding: ${(p) => p.theme.padding.small} ${(p) => p.theme.padding.none};
  padding-left: calc(${(p) => p.theme.padding.small});
  width: 100%;

  &:after,
  &:before {
    content: "";
    display: table;
    clear: both;
  }

  @media (${(p) => p.theme.mediaQueries.desktop}) {
    padding-right: calc(${(p) => p.theme.padding.small} * 2);
  }

  @media (${(p) => p.theme.mediaQueries.wideDesktop}) {
    padding: ${(p) => p.theme.padding.small};
  }
`;

const STYLED_SUBHEADING_ENTITLED = css`
  @media (${(p) => p.theme.mediaQueries.classLandingGrid}) {
    margin: 0 0 calc(${(p) => p.theme.margin.small} * 2);
  }
  @media (${(p) => p.theme.mediaQueries.wideDesktop}) {
    margin: 0 auto calc(${(p) => p.theme.margin.small} * 2);
  }
`;

const StyledSubHeading = styled(SubHeading)`
  display: flex;
  margin: 0 auto calc(${(p) => p.theme.margin.small} * 2);
  width: 100%;

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
  ${(p) => p.isEntitled && STYLED_SUBHEADING_ENTITLED}
`;

export default ClassLandingPage;
