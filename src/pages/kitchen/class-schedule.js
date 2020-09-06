/* eslint-disable react/prop-types */
export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps() {
  const now = new Date().toGMTString();
  return {
    props: {
      now,
    },
    revalidate: 1,
  };
}

const ClassSchedule = ({ now }) => {
  return <p>Class Schedule {now}</p>;
};

export default ClassSchedule;
