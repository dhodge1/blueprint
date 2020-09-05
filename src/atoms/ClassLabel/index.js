import styled from "styled-components";
import PropTypes from "prop-types";

export const ClassLabel = ({ isLive }) => {
  return (
    <StyledSVG
      width={isLive ? "100" : "269"}
      height="41"
      viewBox={isLive ? "0 0 100 41" : "0 0 269 41"}
      isLive={isLive}
    >
      <text x="24" y="28">
        {!isLive && "PREVIOUSLY "}LIVE
      </text>
    </StyledSVG>
  );
};

ClassLabel.displayName = "ClassLabel";

ClassLabel.propTypes = {
  isLive: PropTypes.bool,
};

const StyledSVG = styled.svg`
  background: ${(p) =>
    p.isLive ? p.theme.colors.primary : p.theme.colors.prevLiveClassLabel};
  pointer-events: none;
  position: absolute;
  z-index: 3;
  width: ${(p) => (p.isLive ? "10%" : "18%")};
  height: auto;
  top: 5%;
  left: 4%;
  font-size: 23px;
  font-weight: bold;
  letter-spacing: 2px;
  text-align: center;
  text-transform: uppercase;

  text {
    fill: ${(p) => p.theme.colors.white};
  }

  @media (max-width: 767px) {
    width: ${(p) => (p.isLive ? "25%" : "40%")};
    top: 7%;
    left: 4%;
  }
`;
