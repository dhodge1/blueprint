import styled from "styled-components";
import PropTypes from "prop-types";

const RightRail = ({ className }) => (
  <Wrapper className={className}>
    <div data-slot-type="dfp_bigbox">
      <img src="https://via.placeholder.com/300x250" alt="..." />
    </div>
  </Wrapper>
);

RightRail.propTypes = {
  className: PropTypes.string,
};

const Wrapper = styled.div`
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default RightRail;
