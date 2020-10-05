export async function getStaticProps() {
  const now = new Date().toGMTString();
  return {
    props: {
      dehydratedState: dehydrate(queryCache),
      now,
    },
    revalidate: 1,
  };
}

const Now = ({ now }) => {
  return <p>Current datetime: {now}</p>;
};

export default Now;
