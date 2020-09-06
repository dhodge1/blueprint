/* eslint-disable react/prop-types */
export async function getStaticProps() {
  const now = new Date().toGMTString();
  return {
    props: {
      now,
    },
    revalidate: 10,
  };
}

function ClassSchedule({ now }) {
  return <p>Class Schedule {now}</p>;
}

export default ClassSchedule;
