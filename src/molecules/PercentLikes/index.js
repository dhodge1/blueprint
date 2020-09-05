import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { BodyText, ThumbsUp } from "/atoms";

const PercentLikes = ({ percentLikes, lead, className }) => {
  return percentLikes ? (
    <Wrapper className={className}>
      <ThumbsIcon lead={lead} />
      <Percentage color="white" as="p" lead={lead}>
        {percentLikes}%
      </Percentage>
    </Wrapper>
  ) : null;
};

PercentLikes.propTypes = {
  percentLikes: PropTypes.number,
  lead: PropTypes.bool,
  className: PropTypes.string,
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LEAD_THUMBS_ICON = css`
  width: 20px;
  height: 22px;
  .outer-thumb {
    fill: ${(p) => p.theme.colors.white};
  }
  .inner-thumb {
    fill: ${(p) => p.theme.colors.white};
    fill-opacity: 0.5;
  }
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    width: 28px;
    height: 32px;
  }
`;

const STANDARD_THUMBS_ICON = css`
  width: 13px;
  height: 13px;
  .outer-thumb {
    fill: ${(p) => p.theme.colors.black};
  }
  .inner-thumb {
    fill: transparent;
    fill-opacity: 1;
  }
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    width: 19px;
    height: 19px;
  }
`;

const ThumbsIcon = styled(ThumbsUp)`
  ${(p) => (p.lead ? LEAD_THUMBS_ICON : STANDARD_THUMBS_ICON)}
`;

const LEAD_PERCENTAGE = css`
  font-size: ${(p) => p.theme.fontStyles.sizes.small};
  margin-left: ${(p) => p.theme.margin.extraSmall};
  color: ${(p) => p.theme.colors.white};
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    font-size: ${(p) => p.theme.fontStyles.sizes.large};
    margin-left: ${(p) => p.theme.margin.space};
  }
`;

const STANDARD_PERCENTAGE = css`
  font-size: ${(p) => p.theme.fontStyles.sizes.tiny};
  margin-left: ${(p) => p.theme.margin.extraSmall};
  color: ${(p) => p.theme.colors.black};
  @media (${(p) => p.theme.mediaQueries.desktop}) {
    font-size: ${(p) => p.theme.fontStyles.sizes.small};
  }
`;

const Percentage = styled(BodyText)`
  position: relative;
  top: 3px;
  ${(p) => (p.lead ? LEAD_PERCENTAGE : STANDARD_PERCENTAGE)}
`;

export default PercentLikes;
