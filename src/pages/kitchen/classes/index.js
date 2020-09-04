import { useQuery, makeQueryCache } from "react-query";
import { dehydrate } from "react-query/hydration";
import { postGraphQLRequest } from "/utils";
import { GET_LANDING_PAGE } from "/data";
import config from "/config";

const {
  classLandingPage,
  meta: {
    titles: { classLanding: pageTitle },
    descriptions: { classLanding: pageDescription },
  },
} = config;

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
  };
}

const ClassLandingPage = () => {
  const { isError, data, error } = useQuery(queryKey, getClassLandingPage);

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  console.log("data: ", data);

  return <p>test</p>;
};

export default ClassLandingPage;
