/* eslint-disable react/prop-types */
import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { useQuery, makeQueryCache } from "react-query";
import { dehydrate } from "react-query/hydration";
import Head from "next/head";
import moment from "moment";
import {
  groupClassesByDate,
  useViewportStatus,
  postGraphQLRequest,
} from "/utils";
import { GET_UPCOMING_CLASSES } from "/data";
import { PageContext, UserContext } from "/context";
import config from "/config";
import { ReusableContainer } from "/molecules";
import { LandingHeader, LiveScheduleCard } from "/organisms";
import { LiveClassesDayBlock, PageContent } from "/templates";

const {
  meta: {
    titles: { classSchedule: pageTitle },
    descriptions: { classSchedule: pageDescription },
  },
} = config;

const queryKey = "getUpcomingClasses";

const getUpcomingClasses = () => {
  return postGraphQLRequest(GET_UPCOMING_CLASSES, "GET_UPCOMING_CLASSES", {
    imgWidth: 137,
  });
};

export async function getStaticProps() {
  const queryCache = makeQueryCache();
  await queryCache.prefetchQuery(queryKey, getUpcomingClasses);
  const now = new Date().toGMTString();
  return {
    props: {
      dehydratedState: dehydrate(queryCache),
      now,
    },
    revalidate: 1,
  };
}

const ClassSchedule = ({ now }) => {
  const { isEntitled } = useContext(UserContext) || {
    isEntitled: false,
    setIsEntitled: () => {},
  };
  const themeContext = useContext(ThemeContext);
  const { wideDesktop } = themeContext.mediaQueries;
  const [isWideDesktop] = useViewportStatus(`(${wideDesktop})`);
  const { isMobile } = useContext(PageContext);
  const { isError, error, data } = useQuery(queryKey, getUpcomingClasses);

  if (isError)
    return (
      <ReusableContainer>
        <p>Error...{error.message}</p>
      </ReusableContainer>
    );

  const dateMap = groupClassesByDate(data.upcomingClasses);
  const liveClassBlocks = [];
  let mapIndex = 0;
  let adInsert = 2;

  dateMap.forEach((value, key) => {
    liveClassBlocks.push(
      <LiveClassesDayBlock
        key={mapIndex}
        title={moment(key).format("dddd, MMMM Do")}
      >
        {value.map((classItem, index, array) => (
          <LiveScheduleCard
            index={index}
            dateIndex={mapIndex}
            isMobile={isMobile}
            item={classItem}
            key={index}
            lastInContainer={index === array.length - 1}
          />
        ))}
      </LiveClassesDayBlock>
    );

    mapIndex += 1;

    if (!isEntitled && !isWideDesktop && liveClassBlocks.length === adInsert) {
      adInsert += 5;
      mapIndex += 1;
    }
  });

  return (
    <PageContainer>
      <Head>
        <title key="title">{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>
      <LandingHeader
        hasBackArrow={true}
        hasLogo={false}
        isEntitled={isEntitled}
        mobileSize={"large"}
        pageType={"Live Class Schedule"}
        date={now}
      />
      <PageContent>{liveClassBlocks}</PageContent>
    </PageContainer>
  );
};

export default ClassSchedule;

const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
`;
