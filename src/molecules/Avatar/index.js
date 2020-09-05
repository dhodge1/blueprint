import { useState } from "react";
import { PropTypes } from "prop-types";
import styled from "styled-components";
import { Image } from "/atoms";
import config from "/config";

const DEFAULT_AVATAR = `${config.publicFolderPath}/profileAvatar.svg`;

const Avatar = ({ src, size, hasBorder, className }) => {
  const [imageUrl, setImageUrl] = useState(src || DEFAULT_AVATAR);
  const handleError = () => {
    setImageUrl(DEFAULT_AVATAR);
  };
  return (
    <Wrapper hasBorder={hasBorder} size={size} className={className}>
      <StyledImage src={imageUrl} onError={handleError} />
    </Wrapper>
  );
};

export default Avatar;

Avatar.displayName = "Avatar";

Avatar.propTypes = {
  src: PropTypes.string,
  size: PropTypes.oneOf([
    "extraSmall",
    "small",
    "medium",
    "large",
    "extraLarge",
  ]),
  hasBorder: PropTypes.bool,
  className: PropTypes.string,
};

const StyledImage = styled(Image)`
  width: 100%;
  border-radius: 50%;
  display: block;
`;

StyledImage.displayName = "StyledImage";

const Wrapper = styled.div`
  border-radius: 50%;
  width: ${(p) =>
    p.theme.avatarSizes[p.size] || p.theme.avatarSizes.small || "35px"};
  height: ${(p) =>
    p.theme.avatarSizes[p.size] || p.theme.avatarSizes.small || "35px"};
  background-color: ${(p) => p.theme.colors.primary || " none"};
  ${(p) => p.hasBorder && `border: 2px solid ${p.theme.colors.white};`}
  display: flex;
  justify-content: center;
  align-self: center;
  flex-shrink: 0;
`;
