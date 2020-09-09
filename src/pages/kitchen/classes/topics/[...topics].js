/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useContext, useState } from "react";
import styled, { css } from "styled-components";
import { useQuery, useInfiniteQuery, makeQueryCache } from "react-query";
import { dehydrate } from "react-query/hydration";
import Head from "next/head";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";
import { postGraphQLRequest, replaceAll, titleCase } from "/utils";
import { GET_ALL_TOPICS, GET_TOPIC_RESULTS } from "/data";
import { UserContext, PageContext } from "/context";
import config from "/config";
import { Heading } from "/atoms";
import { LoadingSpinner, ReusableContainer } from "/molecules";
import { ClassCard, LandingHeader } from "/organisms";
import { RightRail } from "/templates";

const {
  meta: {
    titles: { topicsPage: pageTitle },
    descriptions: { topicsPage: pageDescription },
  },
} = config;

const { id, cardImageSize } = config.classLandingPage;
const allTopicsKey = "getAllTopics";
const topicsResultsKey = "getTopicResults";

const getAllTopics = () => {
  return postGraphQLRequest(GET_ALL_TOPICS, "GET_ALL_TOPICS", { id });
};

export async function getStaticProps({ params }) {
  let filters = [];
  const { topics } = params;
  const sanitizedTopics = topics.map((topic) =>
    titleCase(replaceAll(topic, "_", " "))
  );
  const queryCache = makeQueryCache();
  const topicsData = await queryCache.prefetchQuery(allTopicsKey, getAllTopics);

  if (topicsData) {
    const { blocks } = topicsData.landingPage;
    const topicsBlock = blocks.filter(
      (block) => block.__typename === "TopicsBlock"
    )[0];
    const talentTopicsBlock = blocks.filter(
      (block) => block.__typename === "TalentTopicsBlock"
    )[0];
    const { topics: topicSet } = topicsBlock;
    const { topics: talentTopicSet } = talentTopicsBlock;
    const topicsMap =
      topicSet && talentTopicSet ? topicSet.concat(talentTopicSet) : [];
    filters = [].concat(
      ...topicsMap
        .filter((topic) => sanitizedTopics.includes(topic.name))
        .map((topic) => topic.filters)
    );
  }

  const next = "0";

  const getTopicResults = () => {
    return postGraphQLRequest(GET_TOPIC_RESULTS, "GET_TOPIC_RESULTS", {
      filters,
      cardImageSize,
      next,
    });
  };

  await queryCache.prefetchQuery(
    [topicsResultsKey, { filters, next }],
    getTopicResults,
    {
      infinite: true,
      getFetchMore: (lastGroup, allGroups) =>
        lastGroup?.search?.paging?.next ?? (0).toString(),
    }
  );

  return {
    props: {
      dehydratedState: dehydrate(queryCache),
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { topics: ["chicken"] } },
      { params: { topics: ["cookout"] } },
      { params: { topics: ["grilling"] } },
      { params: { topics: ["lunch"] } },
      { params: { topics: ["weeknight_dinners"] } },
    ],
    fallback: true,
  };
}

const Topics = () => {
  const [isChef, setIsChef] = useState(0);
  const { isEntitled } = useContext(UserContext) || {
    isEntitled: false,
    setIsEntitled: () => {},
  };

  const router = useRouter();
  const topics = router.query.topics || [];
  const sanitizedTopics = topics.map((topic) =>
    titleCase(replaceAll(topic, "_", " "))
  );
  let filters =
    (router.query.filters && JSON.parse(router.query.filters)) || [];

  const { data: topicsData } = useQuery(allTopicsKey, getAllTopics, {
    enabled: !filters.length,
  });

  if (topicsData) {
    const { blocks } = topicsData.landingPage;
    const topicsBlock = blocks.filter(
      (block) => block.__typename === "TopicsBlock"
    )[0];
    const talentTopicsBlock = blocks.filter(
      (block) => block.__typename === "TalentTopicsBlock"
    )[0];
    const { topics: topicSet } = topicsBlock;
    const { topics: talentTopicSet } = talentTopicsBlock;
    const topicsMap =
      topicSet && talentTopicSet ? topicSet.concat(talentTopicSet) : [];
    filters = [].concat(
      ...topicsMap
        .filter((topic) => sanitizedTopics.includes(topic.name))
        .map((topic) => topic.filters)
    );
  }

  useEffect(() => {
    if (isChef === 0 && filters) {
      let chefCheck = filters.filter((s) => s.includes("TALENT_FACET"));
      chefCheck = chefCheck.length > 0;
      setIsChef(chefCheck);
    }
  }, [isChef]);

  const {
    isLoading,
    isFetching,
    isFetchingMore,
    error,
    data = [],
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery(
    [topicsResultsKey],
    (key, next = (0).toString()) => {
      return postGraphQLRequest(GET_TOPIC_RESULTS, "GET_TOPIC_RESULTS", {
        filters,
        cardImageSize,
        next,
      });
    },
    {
      enabled: filters.length,
      getFetchMore: (lastGroup, allGroups) =>
        lastGroup?.search?.paging?.next ?? (0).toString(),
    }
  );

  const { search: { total } = { total: 0 } } = data?.[0] || {};

  const { isMobile } = useContext(PageContext);
  const isDesktop = !isMobile;

  let desktopAdIndex = 1;

  const [page, setPage] = useState(0);
  const [pageBottom, inView] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (!error && !isLoading && !isFetchingMore && inView) {
      setPage(page + 1);
    }
  }, [inView]);

  useEffect(() => {
    if (!isFetchingMore && page > 0 && canFetchMore) {
      fetchMore();
      if (isDesktop) {
        ++desktopAdIndex;
      }
    }
  }, [page]);

  if (router.isFallback || (isLoading && !isFetchingMore))
    return (
      <ReusableContainer>
        <StyledHeading>
          <LoadingSpinner />
        </StyledHeading>
      </ReusableContainer>
    );
  if (error)
    return (
      <ReusableContainer>
        <p>Error...{error.message}</p>
      </ReusableContainer>
    );

  return (
    <LandingPage>
      <Head>
        <title key="title">{`${sanitizedTopics} ${pageTitle}`}</title>
        <meta
          name="description"
          content={pageDescription(
            sanitizedTopics.join(", ").toLowerCase(),
            isChef
          )}
        />
      </Head>
      <LandingHead>
        <LandingHeader
          pageType={`All ${sanitizedTopics.join(
            ", "
          )} Classes (${total} results)`}
          isEntitled={isEntitled}
          hasLogo={false}
          hasBackArrow={true}
          mobileSize={"large"}
          desktopSize={"extraLarge"}
        />
      </LandingHead>
      <LandingBody>
        <LandingMain isEntitled={isEntitled}>
          {data?.map((group, i) => (
            <React.Fragment key={`group-${i}`}>
              {group?.search?.items?.length > 0 ? (
                group.search.items.map((item, index) => (
                  <React.Fragment key={item?.id ?? index}>
                    <ClassCard
                      index={index}
                      classData={item}
                      blockTitle="topic class"
                    />
                  </React.Fragment>
                ))
              ) : (
                <NoResults>No results found.</NoResults>
              )}
            </React.Fragment>
          ))}
          {isFetchingMore && (
            <LoadMore>
              <StyledHeading>
                <LoadingSpinner />
              </StyledHeading>
            </LoadMore>
          )}
        </LandingMain>
        {!isEntitled && <LandingRightRail></LandingRightRail>}
      </LandingBody>
      <div
        style={{ width: "100vw", border: "1px solid transparent" }}
        ref={pageBottom}
      />
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
  margin-top: ${(p) => p.theme.margin.medium};
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    flex: 1 1
      calc(
        ${(p) => p.theme.page.maxWidth} - (${(p) => p.theme.margin.small} * 3)
      );
    max-width: calc(
      ${(p) => p.theme.page.maxWidth} - (${(p) => p.theme.margin.small} * 3)
    );
  }
`;

const LANDING_MAIN_UNENTITLED = css`
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    flex: 0 1
      calc(
        (${(p) => p.theme.padding.small} * 2) +
          ${(p) => p.theme.page.mediumWidth}
      );
  }
`;

const LandingMain = styled.main`
  flex: 1 1 100%;
  ${COMMON_FLEX}
  justify-content: flex-start;
  ${(p) => !p.isEntitled && LANDING_MAIN_UNENTITLED}
`;

const NoResults = styled.h3`
  text-align: center;
  width: 100%;
`;

const LandingRightRail = styled(RightRail)`
  display: none;
  flex: 1 0 100%;
  padding-top: ${(p) => p.theme.padding.none};
  margin-top: ${(p) => p.theme.margin.small};
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    display: flex;
    flex: 1 0 ${LANDING_RR_BASIS};
    justify-content: space-between;
  }
`;

const StyledHeading = styled(Heading)`
  text-align: center;
  margin: ${(p) => p.theme.margin.large};
`;

const LoadMore = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export default Topics;
