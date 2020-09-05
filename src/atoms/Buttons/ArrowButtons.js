import PropTypes from "prop-types";
import styled from "styled-components";
import { Image } from "/atoms/Image";
import config from "/config";

export const LeftButton = ({ offsetLeft, handleClick, isMobile }) => {
  if (!isMobile && offsetLeft > 0) {
    return (
      <ButtonWrapper onClick={() => handleClick("left")}>
        <ArrowImage src={`${config.publicFolderPath}/arrowLeft.svg`} />
      </ButtonWrapper>
    );
  }
  return null;
};

export const RightButton = ({ offsetRight, handleClick, isMobile }) => {
  if (!isMobile && offsetRight > 0) {
    return (
      <ButtonWrapper onClick={() => handleClick("right")}>
        <ArrowImage src={`${config.publicFolderPath}/arrowRight.svg`} />
      </ButtonWrapper>
    );
  }
  return null;
};

LeftButton.propTypes = {
  offsetLeft: PropTypes.number,
  handleClick: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
};

RightButton.propTypes = {
  offsetRight: PropTypes.number,
  handleClick: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
};

const ButtonWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 52px;
  height: 52px;
  box-shadow: 0 0 8px 0 #d5d5d5;
  background-color: ${(p) => p.theme.colors.white};
  border-radius: 50%;
  border: none;
  cursor: pointer;
`;

ButtonWrapper.displayName = "ButtonWrapper";

const ArrowImage = styled(Image)`
  display: block;
`;

ArrowImage.displayName = "ArrowImage";
