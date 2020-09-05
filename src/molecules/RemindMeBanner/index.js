import PropTypes from "prop-types";
import styled from "styled-components";
import moment from "moment";
import { momentOptions } from "/constants";
import { SubHeading } from "/atoms";

const RemindMeBanner = ({ className, startTime }) => {
  const { CALENDAR_FORMAT } = momentOptions;

  const formattedDateTime = moment(startTime).calendar(CALENDAR_FORMAT);

  return (
    <Wrapper className={className}>
      <div>
        <SubHeading color="white">{formattedDateTime}</SubHeading>
      </div>
    </Wrapper>
  );
};

export default RemindMeBanner;

RemindMeBanner.displayName = "RemindMeBanner";

RemindMeBanner.propTypes = {
  className: PropTypes.string,
  startTime: PropTypes.string.isRequired,
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(p) => p.theme.padding.medium};
  width: 100%;
  height: 40px;
  border-top-left-radius: ${(p) => p.theme.borderRadius};
  border-top-right-radius: ${(p) => p.theme.borderRadius};
  ${(p) =>
    `background-image: linear-gradient(278deg, ${p.theme.colors.primaryGradientStop1} -34%, ${p.theme.colors.primaryGradientStop2});`};
  padding-left: calc(${(p) => p.theme.padding.extraSmall} * 4);
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    height: 60px;
    padding-left: calc(${(p) => p.theme.padding.extraSmall} * 6);
  }
`;
