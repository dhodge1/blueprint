/* eslint-disable react/prop-types */
export async function getStaticProps() {
  return {
    props: {
      now: new Date().toGMTString(),
    },
    revalidate: 1,
  };
}

const ClassSchedule = ({ now }) => {
  return <p>Class Schedule {now}</p>;
};

export default ClassSchedule;
