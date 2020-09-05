import PropTypes from "prop-types";
import styled from "styled-components";
import { Image } from "/atoms";
import config from "/config";

const PremiumTag = ({ className, small }) => {
  return (
    <Tag className={className} small={small}>
      <StyledImage src={`${config.publicFolderPath}/lock.svg`} />
    </Tag>
  );
};

PremiumTag.propTypes = {
  className: PropTypes.string,
  small: PropTypes.bool,
};

const Tag = styled.div`
  width: auto;
  height: 40px;
  padding: 0 1.2em;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  background: ${(p) => p.theme.colors.premium};
  font-size: ${(p) => (p.small ? "9px" : "11px")};
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: ${(p) => p.theme.borderRadius};
  border-top-right-radius: ${(p) => p.theme.borderRadius};

  ::after {
    content: "premium";
    font-size: 1em;
    font-weight: bold;
    font-stretch: condensed;
    font-style: normal;
    line-height: 0.75;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    padding-left: 0.63em;
    margin-right: -0.25em;
    color: ${(p) => p.theme.colors.white};
    display: ${(p) => (p.small ? "none" : "inline")};
  }

  @media (${(p) => p.theme.mediaQueries.desktop}) {
    font-size: ${(p) => (p.small ? "11px" : "16px")};
    height: 60px;

    ::after {
      display: inline;
    }
  }
`;

const StyledImage = styled(Image)`
  width: 1.25em;
  height: auto;
`;

export default PremiumTag;

PremiumTag.displayName = "PremiumStrip";
