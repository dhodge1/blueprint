import PropTypes from "prop-types";
import styled from "styled-components";
import { ButtonText } from "/atoms";
import { Image } from "/atoms/Image";

const BaseButton = ({
  className,
  deactivated,
  desktopSize,
  icon,
  isCompressed,
  isCondensed,
  isMobile,
  mobileWording,
  onClick,
  padding,
  text,
  textColor,
  ...props
}) => {
  return (
    <StyledButton
      {...props}
      className={className}
      icon={icon}
      onClick={deactivated ? null : onClick}
      isCondensed={isCondensed}
      deactivated={deactivated}
      isCompressed={isCompressed}
      padding={padding}
    >
      {icon && <Image src={icon} />}
      {text && !isCondensed && (
        <ButtonText color={textColor} desktopSize={desktopSize}>
          {isMobile && mobileWording ? mobileWording : text}
        </ButtonText>
      )}
    </StyledButton>
  );
};

BaseButton.displayName = "BaseButton";

const colors = [
  "primary",
  "secondary",
  "premium",
  "white",
  "black",
  "pink",
  "lightGray",
  "mediumGray",
  "darkGray",
  "inactive",
  "primaryGradientStop1",
  "primaryGradientStop2",
  "secondaryGradientStop1",
  "secondaryGradientStop2",
  "link",
  "transparentBlack",
  "prevLiveClassLabel",
  "transparent",
  "gradient",
];
const paddings = [
  "none",
  "extraSmall",
  "space",
  "small",
  "medium",
  "large",
  "extraLarge",
];
const fontSizes = [
  "tiny",
  "extraSmall",
  "small",
  "medium",
  "mediumLarge",
  "large",
  "XL",
  "extraLarge",
  "XXL",
];

BaseButton.propTypes = {
  borderColor: PropTypes.oneOf(colors),
  buttonColor: PropTypes.oneOf(colors),
  className: PropTypes.string,
  deactivated: PropTypes.bool,
  desktopSize: PropTypes.oneOf(fontSizes),
  icon: PropTypes.any,
  isCompressed: PropTypes.bool,
  isCondensed: PropTypes.bool,
  isIconOnly: PropTypes.bool,
  isMobile: PropTypes.bool,
  mobileWording: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  padding: PropTypes.oneOf(paddings),
  text: PropTypes.string,
  textColor: PropTypes.oneOf(colors),
};

export default BaseButton;

export const StyledButton = styled.button`
  border: solid 1px
    ${(p) =>
      (p.deactivated && p.theme.colors.lightGray) ||
      p.theme.colors[p.borderColor] ||
      p.theme.colors[p.buttonColor] ||
      "transparent"};
  ${(p) =>
    p.buttonColor === "gradient"
      ? `background-image: linear-gradient(to right, ${p.theme.colors.primaryGradientStop2} 0%, ${p.theme.colors.primaryGradientStop1} 127%);`
      : `background: ${
          (p.deactivated && p.theme.colors.transparentBlack) ||
          p.theme.colors[p.buttonColor] ||
          "transparent"
        };`}
  cursor: ${(p) => p.pointerStyle || "pointer"};
  outline: none;
  width: ${(p) => (p.isIconOnly && "29px") || p.width || "auto"};
  height: ${(p) => (p.isIconOnly && "29px") || "30px"};
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${(p) => p.theme.margin.small};
  img,
  span {
    margin: ${(p) => (p.isIconOnly ? 0 : p.theme.margin.extraSmall)};
  }
  span {
    margin-top: 7px;
  }
  &:hover {
    opacity: 0.95;
  }

  @media (${(p) => p.theme.mediaQueries.mediumDesktop}) {
    width: ${(p) => (p.isIconOnly && "29px") || p.width || "auto"};
    height: ${(p) =>
      (p.isIconOnly && "29px") || (p.isCompressed && "30px") || "40px"};
    border-radius: 20px;
    padding: 0 ${(p) => p.theme.padding[p.padding] || p.theme.padding.medium};
  }
`;
